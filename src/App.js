import React, { useState, useContext, lazy, Suspense } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import theme from "./theme";
import "./App.css";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const DiaryEntry = lazy(() => import("./components/DiaryEntry"));
const DiaryList = lazy(() => import("./components/DiaryList"));
const SearchBar = lazy(() => import("./components/SearchBar"));
const TagFilter = lazy(() => import("./components/TagFilter"));
const MoodTracker = lazy(() => import("./components/MoodTracker"));

const AppContent = ({ entries, addEntry, setEntries }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="container">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h2">Personal Diary</Typography>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            className="icon-button"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <div className="grid-container">
          <Paper className="paper">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <TagFilter />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <MoodTracker entries={entries} />
            </Suspense>
          </Paper>
          <Paper className="paper">
            <Suspense fallback={<div>Loading...</div>}>
              <DiaryEntry addEntry={addEntry} />
            </Suspense>
          </Paper>
          <Paper className="paper">
            <Suspense fallback={<div>Loading...</div>}>
              <DiaryList entries={entries} setEntries={setEntries} />
            </Suspense>
          </Paper>
        </div>
      </Container>
    </MuiThemeProvider>
  );
};

const App = () => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  return (
    <ThemeProvider>
      <AppContent
        entries={entries}
        addEntry={addEntry}
        setEntries={setEntries}
      />
    </ThemeProvider>
  );
};

export default App;
