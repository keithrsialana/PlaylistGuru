import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";

export default function MoodForm() {
  const [moodText, setText] = useState("");
  const { setPlaylistMood } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mood submitted:", moodText);
    setPlaylistMood(moodText); // Update the shared state
  };

  return (
    <div>
      <p>So, what kind of playlist are ya vibin' with today?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={moodText}
          placeholder="Enter your mood here"
          onChange={(e) => setText(e.target.value)}
        />

        <div>
          <button type="submit">Create Playlist</button>
        </div>
      </form>
    </div>
  );
}
