import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const MoodChart = ({ entries }) => {
  const moodCounts = {
    Happy: 0,
    Sad: 0,
    Neutral: 0,
    Good: 0,
    Okay: 0,
  };

  entries.forEach((entry) => {
    if (moodCounts.hasOwnProperty(entry.mood)) {
      moodCounts[entry.mood]++;
    }
  });

  return (
    <Box className="mood-chart">
      <Typography variant="h6" mb={2}>Mood Tracker</Typography>
      {Object.keys(moodCounts).length > 0 ? (
        Object.keys(moodCounts).map((mood) => (
          <Box key={mood} display="flex" alignItems="center" mb={1}>
            <Typography variant="body1" style={{ minWidth: 100 }}>{mood}:</Typography>
            <CircularProgress variant="determinate" value={(moodCounts[mood] / entries.length) * 100} size={24} sx={{ mr: 2 }} />
            <Typography variant="body2">{moodCounts[mood]}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No mood entries recorded yet.</Typography>
      )}
    </Box>
  );
};

export default MoodChart;
