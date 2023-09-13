import React, { createContext, useContext } from "react";

const DataContext = createContext<any>(null);

export function DataProvider({ children, data }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (ctx !== null) {
    ctx.read();
  }

  return fakeData;
}
