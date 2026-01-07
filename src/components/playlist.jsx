import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";

export default function Playlist() {
  const { playlistMood } = useContext(AppContext);
  const [playlist, setPlaylist] = useState(""); // State to store the generated playlist
  let playlistList = Array.isArray(playlist) ? playlist : [];

  useEffect(() => {
    if (playlistMood && playlistMood !== "None") {
      getPlaylist(); // Call getPlaylist when playlistMood changes
    }
  }, [playlistMood]); // Dependency array - runs when playlistMood changes

  async function getPlaylist() {
    try {
      setPlaylist("Generating playlist...");

      const res = await fetch("/.netlify/functions/getPlaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: playlistMood }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setPlaylist(data.playlist);
    } catch (error) {
      console.error("Error generating playlist:", error);
      setPlaylist("Error generating playlist. Please try again.");
    }
  }

  return (
    <div className="playlist">
      <h1>
        {playlistMood != "None"
          ? `Your '` + playlistMood + `' playlist:`
          : "Set your playlist!"}
      </h1>
      <div>
        {playlistList.length > 0 ? (
          <ol>
            {playlistList.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ol>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
