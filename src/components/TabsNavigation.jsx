import React from "react";
import { Tabs, Tab, Button } from "@mui/material";

const TabsNavigation = ({ tabs, activeTab, setActiveTab, addNewTab, removeTab }) => (
  <>
    <Tabs
      value={activeTab}
      onChange={(_, newIndex) => setActiveTab(newIndex)}
      sx={{ backgroundColor: "white", borderRadius: "5px" }}
    >
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
  </>
);

export default TabsNavigation;
