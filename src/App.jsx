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
