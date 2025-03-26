import { useState } from "react";
import { queries } from "../data/queries";

export const useTabs = () => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: "Tab 1",
      selectedQuery: Object.keys(queries)[0],
      query: queries[Object.keys(queries)[0]],
      isCustom: false,
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const addNewTab = () => {
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        id: prevTabs.length + 1,
        name: `Tab ${prevTabs.length + 1}`,
        selectedQuery: Object.keys(queries)[0],
        query: queries[Object.keys(queries)[0]],
        isCustom: false,
      },
    ]);
    setActiveTab(tabs.length);
  };

  const removeTab = (index) => {
    if (tabs.length === 1) return;
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((_, i) => i !== index);
      setActiveTab((prev) => (prev >= newTabs.length ? newTabs.length - 1 : prev));
      return newTabs;
    });
  };

  return { tabs, activeTab, setActiveTab, addNewTab, removeTab, setTabs };
};
