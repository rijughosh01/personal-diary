import React, { useState } from "react";
import DOMPurify from "dompurify";
import { IconButton, Button, TextField, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function DiaryList({ entries, setEntries }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedEntry, setEditedEntry] = useState({
    entry: "",
    tags: [],
    mood: "",
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedEntry(entries[index]);
  };

  const handleSave = () => {
    const newEntries = [...entries];
    newEntries[editIndex] = editedEntry;
    setEntries(newEntries);
    setEditIndex(null);
    setEditedEntry({ entry: "", tags: [], mood: "" });
  };

  const handleChange = (field, value) => {
    setEditedEntry({ ...editedEntry, [field]: value });
  };

  return (
    <div>
      <Typography variant="h5" mb={2}>
        Diary Entries
      </Typography>
      {entries.map((entry, index) => (
        <motion.div
          key={index}
          className="entry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {editIndex === index ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <ReactQuill
                value={editedEntry.entry}
                onChange={(value) => handleChange("entry", value)}
                placeholder="Edit your entry"
                style={{ marginBottom: "20px" }}
              />
              <TextField
                fullWidth
                value={editedEntry.mood}
                onChange={(e) => handleChange("mood", e.target.value)}
                placeholder="Edit mood"
                variant="outlined"
                margin="normal"
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                value={editedEntry.tags.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
                placeholder="Edit tags"
                variant="outlined"
                margin="normal"
                style={{ marginBottom: "10px" }}
              />
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(entry.entry),
                }}
              ></Typography>
              <Typography variant="body2">
                Tags: {entry.tags.join(", ")}
              </Typography>
              <Typography variant="body2">Mood: {entry.mood}</Typography>
              <IconButton onClick={() => handleEdit(index)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default DiaryList;
