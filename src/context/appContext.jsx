// context/appContext.js
import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [sharedData, setSharedData] = useState('Initial Value');

  return (
    <AppContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </AppContext.Provider>
  );
}
