import React from "react";
import { TextField } from "@mui/material";
import '../App.css'

const QueryEditor = ({ query, setQuery }) => {
  return (
    <div>
      <label style={{ color: 'white' }}>SQL Query</label>
      <TextField
        multiline
        fullWidth
        rows={4}
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
        className="resizable-textarea"
      />
    </div>
  );
};

export default QueryEditor;
