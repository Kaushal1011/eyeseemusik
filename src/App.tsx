import React from 'react';
import logo from './logo.svg';
import './App.css';
import MusicPlayer, { track } from './components/player'

const tracks: Array<track> = [
  {
    title: 'Summer',
    src: process.env.PUBLIC_URL + 'audio/summer.mp3',
    album_art: 'not yet',
    artist: 'Some Ben'
  },
  {
    title: 'Ukulele',
    src: process.env.PUBLIC_URL + 'audio/ukulele.mp3',
    album_art: 'not yet',
    artist: 'Some Ben'
  }
]
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>

      <MusicPlayer tracks={tracks} />
    </div>
  );
}

export default App;
