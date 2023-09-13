import React, { createContext, useContext } from "react";

const DataContext = createContext<any>(null);

export let data;
export function DataProvider({ children, data }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (ctx !== null) {
    data = ctx.read();
  } else {
    // if (!window.globalCache) {
    //   throw new Promise((resolve) => setTimeout(resolve, 5000));
    // }
    data = window.globalCache;
  }

  return data;
}
