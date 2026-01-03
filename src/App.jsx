import "./App.css";
import { useState } from "react";
import Replicate from "replicate";
import { AppProvider } from "./context/appContext";
import Playlist from "./components/playlist";
import MoodForm from "./components/MoodForm";


const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
});

function App() {
  return (
    <>
      <AppProvider>
        <h1>Playlist Guru AI</h1>
        <p>
          Hey there! 🎵 Welcome to Playlist Guru AI – your new go-to buddy for
          building the perfect playlists. Whether you need pump-up jams for the
          gym, road trip bangers, or some chill vibes to unwind, I've got you
          covered. Just tell me what you're in the mood for, and I'll whip up
          something amazing. Let's make some magic happen! 🎶
        </p>

        <MoodForm />

        <div id="playlist-section" className="playlist-section" hidden={false}>
          <Playlist />
        </div>
      </AppProvider>
    </>
  );
}

export default App;
