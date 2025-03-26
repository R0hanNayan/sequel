import React from "react";
import QuerySelector from "./components/QuerySelector";
import QueryEditor from "./components/QueryEditor";
import QueryResultTable from "./components/QueryResultTable";
import TabsNavigation from "./components/TabsNavigation";
import { queries } from "./data/queries";
import { mockData } from "./data/mockData";
import { generateDummyData } from "./utils/dataUtils";
import { useTabs } from "./hooks/useTabs";
import { Container, Typography, Box } from "@mui/material";
import { Analytics } from '@vercel/analytics/react';

function App() {
  const { tabs, activeTab, setActiveTab, addNewTab, removeTab, setTabs } = useTabs();

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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "white" }}>
        SQL Query Viewer
      </Typography>

      <TabsNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        addNewTab={addNewTab}
        removeTab={removeTab}
      />

      <Box my={3}>
        <QuerySelector
          selectedQuery={tabs[activeTab]?.selectedQuery}
          setSelectedQuery={(queryKey) => updateSelectedQuery(activeTab, queryKey)}
        />
      </Box>

      <Box my={3}>
        <QueryEditor query={tabs[activeTab]?.query} setQuery={(query) => updateQuery(activeTab, query)} />
      </Box>

      <QueryResultTable
        data={tabs[activeTab]?.isCustom ? generateDummyData() : mockData[tabs[activeTab]?.selectedQuery]}
      />
      <Analytics />
    </Container>
  );
}

export default App;
