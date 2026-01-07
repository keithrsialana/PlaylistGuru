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
      document.getElementById("loadingText").hidden = false;

      
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
      document.getElementById("loadingText").hidden = true;
    } catch (error) {
      document.getElementById("loadingText").hidden = true;
      console.error("Error generating playlist:", error);
    }
  }

  return (
    <div className="playlist">
      <h1>
        {playlistMood != "None"
          ? `Your '` + playlistMood + `' playlist:`
          : "Set your playlist!"}
      </h1>
      <h3 id="loadingText" hidden>Generating your playlist... Hang on!</h3>
      <div id="songsText">
        {playlistList.length < 1 ? "Create your playlist!":
        (
          <ol className="playlistList">
            {playlistList.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
