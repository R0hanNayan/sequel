import React, { useState } from "react";
import QuerySelector from "./components/QuerySelector";
import QueryEditor from "./components/QueryEditor";
import QueryResultTable from "./components/QueryResultTable";
import { queries } from "./data/queries";
import { mockData } from "./data/mockData";
import { Container, Typography, Box } from "@mui/material";
import './App.css'

function App() {
  const [selectedQuery, setSelectedQuery] = useState(Object.keys(queries)[0]);
  const [customQuery, setCustomQuery] = useState(queries[selectedQuery]);
  const [isCustom, setIsCustom] = useState(false);

  const generateDummyData = () => {
    return [
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
    ];
  };

  const data = isCustom ? generateDummyData() : mockData[selectedQuery];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white' }}>
        SQL Query Viewer
      </Typography>

      {/* Query Selector Dropdown */}
      <QuerySelector
        selectedQuery={selectedQuery}
        setSelectedQuery={(query) => {
          setSelectedQuery(query);
          setCustomQuery(queries[query]); // Update editor
          setIsCustom(false); // Not a custom query
        }}
      />

      <Box my={3}>
        <QueryEditor
          query={customQuery}
          setQuery={(query) => {
            setCustomQuery(query);
            setIsCustom(!Object.values(queries).includes(query));
          }}
        />
      </Box>

      <QueryResultTable data={data} />
    </Container>
  );
}

export default App;
