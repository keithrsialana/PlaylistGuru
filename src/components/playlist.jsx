import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { OpenRouter } from "@openrouter/sdk";

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
      const openRouter = new OpenRouter({
        apiKey: import.meta.env.VITE_OPENROUTER_API_TOKEN,
        defaultHeaders: {
          "X-Title": "Playlist Guru AI",
        },
      });

      const result = await openRouter.callModel({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        input:
          "Your task is to create a playlist based on the following mood: " +
          playlistMood +
          ". Respond with a random list of 49 song titles and their respective artists that fit this mood, separated by semicolons. Format the response as 'Song Title - Artist Name'. Do not include any additional text or explanations.",
      });
      document.getElementById('loadingText').removeAttribute("hidden");
      setPlaylist([]);
      const text = await result.getText();
      
      // Convert semicolon-separated string into an array
      let playlistList = text.split(";").map((song) => song.trim());
      setPlaylist(playlistList);
      document.getElementById('loadingText').setAttribute("hidden","true");
      console.log('song list updated')
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
