import { AppProvider } from "./context/appContext";
import Playlist from "./components/playlist";
import MoodForm from "./components/MoodForm";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <div className="appContainer">
        <AppProvider>
          <h1 className="sectionTitle">Playlist Guru AI</h1>
          <p>
            Hey there! 🎵 Welcome to Playlist Guru AI – your new go-to buddy for
            building the perfect playlists. Whether you need pump-up jams for
            the gym, road trip bangers, or some chill vibes to unwind, I've got
            you covered. Just tell me what you're in the mood for, and I'll whip
            up something amazing. Let's make some magic happen! 🎶
          </p>
          
          <h2>Notice</h2>
          <p>There was a plan to integrate creating a playlist using Spotify, but as of 2024, Spotify has disabled any use of their API unless you're a business that makes money and has a lot of streams, so I'm sorry to the users. You're going to just have to copy and paste this list somewhere else and manually make the playlist on Spotify 😔</p>
          <br />
          <br />
          <MoodForm />

          <div hidden={false}>
            <Playlist />
          </div>
        </AppProvider>
      </div>
      <Footer />
    </>
  );
}

export default App;
