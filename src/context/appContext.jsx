// context/appContext.js
import { createContext, useState } from "react";

export const AppContext = createContext({});

export function AppProvider({ children }) {
  const [playlistMood, setPlaylistMood] = useState('None');

  return (
    <AppContext.Provider value={{ playlistMood, setPlaylistMood }}>
      {children}
    </AppContext.Provider>
  );
}
