import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddIcon from "@mui/icons-material/Add";

function DiaryEntry({ addEntry }) {
  const [entry, setEntry] = useState("");
  const [tags, setTags] = useState([]);
  const [mood, setMood] = useState("");

  const handleTagChange = (e, index) => {
    const newTags = [...tags];
    newTags[index] = e.target.value;
    setTags(newTags);
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({ entry, tags, mood });
    setEntry("");
    setTags([]);
    setMood("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, p: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h5" mb={2}>
          Write a New Entry
        </Typography>
        <ReactQuill
          value={entry}
          onChange={setEntry}
          placeholder="Write your entry here..."
          style={{ marginBottom: "20px" }}
        />
        {tags.map((tag, index) => (
          <TextField
            key={index}
            fullWidth
            value={tag}
            onChange={(e) => handleTagChange(e, index)}
            placeholder="Tag"
            variant="outlined"
            margin="normal"
            style={{ marginBottom: "10px" }}
          />
        ))}
        <TextField
          fullWidth
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Mood"
          variant="outlined"
          margin="normal"
          style={{ marginBottom: "10px" }}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={addTag}
            startIcon={<AddIcon />}
            sx={{ mr: 1 }}
          >
            Add Tag
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Entry
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}

export default DiaryEntry;
