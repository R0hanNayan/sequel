import React, { useState } from "react";
import QuerySelector from "./components/QuerySelector";
import QueryEditor from "./components/QueryEditor";
import QueryResultTable from "./components/QueryResultTable";
import { queries } from "./data/queries";
import { mockData } from "./data/mockData";
import { Container, Typography, Box, Tabs, Tab, Button } from "@mui/material";

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, name: "Tab 1", selectedQuery: Object.keys(queries)[0], query: queries[Object.keys(queries)[0]], isCustom: false },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const generateDummyData = () => {
    return [
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
      { id: Math.floor(Math.random() * 1000), name: `User ${Math.floor(Math.random() * 100)}`, city: `City ${Math.floor(Math.random() * 10)}` },
    ];
  };

  const updateQuery = (index, newQuery) => {
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[index].query = newQuery;
      newTabs[index].isCustom = !Object.values(queries).includes(newQuery);
      return newTabs;
    });
  };

  const updateSelectedQuery = (index, newQueryKey) => {
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[index].selectedQuery = newQueryKey;
      newTabs[index].query = queries[newQueryKey];
      newTabs[index].isCustom = false;
      return newTabs;
    });
  };

  const addNewTab = () => {
    const newTab = {
      id: tabs.length + 1,
      name: `Tab ${tabs.length + 1}`,
      selectedQuery: Object.keys(queries)[0],
      query: queries[Object.keys(queries)[0]],
      isCustom: false,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(tabs.length); // Switch to new tab
  };

  const removeTab = (index) => {
    if (tabs.length === 1) return; // Prevent closing the last tab

    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((_, i) => i !== index);
      
      // Ensure correct active tab selection
      if (activeTab >= newTabs.length) {
        setActiveTab(newTabs.length - 1); // Move to last tab if needed
      }
      
      return newTabs;
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "white" }}>
        SQL Query Viewer
      </Typography>

      {/* Tabs for Multi-Query Execution */}
      <Tabs value={activeTab} onChange={(_, newIndex) => setActiveTab(newIndex)} sx={{ backgroundColor: "white", borderRadius: "5px" }}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <span>
                {tab.name} {index > 0 && <span onClick={(e) => { e.stopPropagation(); removeTab(index); }}>❌</span>}
              </span>
            }
          />
        ))}
      </Tabs>

      <Button onClick={addNewTab} sx={{ mt: 2, backgroundColor: "white", color: "black" }}>
        ➕ New Tab
      </Button>

      {/* Query Selector for the Active Tab */}
      <Box my={3}>
        <QuerySelector
          selectedQuery={tabs[activeTab]?.selectedQuery}
          setSelectedQuery={(queryKey) => updateSelectedQuery(activeTab, queryKey)}
        />
      </Box>

      {/* Query Editor */}
      <Box my={3}>
        <QueryEditor query={tabs[activeTab]?.query} setQuery={(query) => updateQuery(activeTab, query)} />
      </Box>

      {/* Query Results */}
      <QueryResultTable data={tabs[activeTab]?.isCustom ? generateDummyData() : mockData[tabs[activeTab]?.selectedQuery]} />
    </Container>
  );
}

export default App;
