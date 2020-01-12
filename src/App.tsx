import React from 'react';
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

    <MusicPlayer tracks={tracks} />
  );
}

export default App;
