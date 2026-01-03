import { useContext } from "react";
import { AppContext } from "../context/appContext";

export default function Playlist() {
  const { playlistMood } = useContext(AppContext);

  return (
    <div className="playlist">
      <h1>Your {playlistMood} playlist:</h1>
      <br />
      {playlistMood}
      <br />
    </div>
  );
}
