import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { queries } from "../data/queries";

const QuerySelector = ({ selectedQuery, setSelectedQuery}) => {
  return (
    <div>
      <label style={{ color: 'white' }}>Select a Query</label>
      <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '5px', }}>
        <Select
          value={selectedQuery}
          onChange={(e) => setSelectedQuery(e.target.value)}
        >
          {Object.keys(queries).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default QuerySelector;
