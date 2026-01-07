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
      <h2>Notice</h2>
      <p>There was a plan to integrate creating a playlist using Spotify, but as of 2024, Spotify has disabled any use of their API unless you're a business that makes money and has a lot of streams, so I'm sorry to the users. You're going to just have to copy and paste this list somewhere else and manually make the playlist on Spotify :(</p>
    </div>
  );
}
