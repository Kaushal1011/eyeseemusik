import React from 'react';
import './App.css';
import { track } from './components/player'
import Cardlist from './components/cardlist'

import summerimg from './images/summer.jpg'
import ukuleneimg from './images/ukulele.jpg'
import creativemindsimg from './images/creativeminds.jpg'
import littleideaimg from './images/littleidea.jpg'
import anewbeginningimg from './images/anewbeginning.jpg'

const tracks: Array<track> = [
  {
    title: 'Summer',
    src: process.env.PUBLIC_URL + 'audio/bensound-summer.mp3',
    album_art: summerimg,
    artist: 'Some Ben'
  },
  {
    title: 'Ukulele',
    src: process.env.PUBLIC_URL + 'audio/bensound-ukulele.mp3',
    album_art: ukuleneimg,
    artist: 'Some Ben'
  },
  {
    title: 'Creative Minds',
    src: process.env.PUBLIC_URL + 'audio/bensound-creativeminds.mp3',
    album_art: creativemindsimg,
    artist: 'Some Ben'
  },
  {
    title: 'Little Idea',
    src: process.env.PUBLIC_URL + 'audio/bensound-littleidea.mp3',
    album_art: littleideaimg,
    artist: 'Some Ben'
  },
  {
    title: 'A New Beginnig',
    src: process.env.PUBLIC_URL + 'audio/bensound-anewbeginning.mp3',
    album_art: anewbeginningimg,
    artist: 'Some Ben'
  }
]
const App: React.FC = () => {
  return (
    <>
    <Cardlist tracks={tracks}/>
    </>
  );
}

export default App;
