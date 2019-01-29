import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App.jsx';


/***** Songs array *****/
//Index 0 is reserved for stopped state.
let songs = [
  {id: 0,   songTitle: "",                        artist: "",                 duration: 0,	url: "#"},
  {id: 1,   songTitle: "A Kind Of Magic",         artist: "Queen",            duration: 0,	url: "http://hcmaslov.d-real.sci-nnov.ru/public/mp3/Queen/Queen%20'A%20Kind%20Of%20Magic'.mp3"},
  {id: 2,   songTitle: "Dynamite",                artist: "Scorpions",        duration: 0,	url: "http://hcmaslov.d-real.sci-nnov.ru/public/mp3/Scorpions/Scorpions%20'Dynamite'.mp3"},
  {id: 3,   songTitle: "Got My Mind Set On You",  artist: "George Harrison",  duration: 0,	url: "http://dora-robo.com/muzyka/70's-80's-90's%20/George%20Harrison%20-%20Got%20My%20Mind%20Set%20On%20You%20%5bJanuary%201988%5d.mp3"},
  {id: 4,   songTitle: "Bohemian Rhapsody",       artist: "Queen",            duration: 0,	url: "http://hcmaslov.d-real.sci-nnov.ru/public/mp3/Queen/Queen%20'Bohemian%20Rhapsody'.mp3"},
  {id: 5,   songTitle: "Mastermind",              artist: "Mike Oldfield",    duration: 0,	url: "http://www.replicaradio.ro/audio/oldfield/millenium/07.Mike%20Oldfield-Mastermind.mp3"},
  {id: 6,   songTitle: "Heart Of Glass",          artist: "Blondie",          duration: 0,	url: "http://dora-robo.com/muzyka/70's-80's-90's%20/Blondie%20-%20Heart%20of%20Glass.mp3"},
  {id: 7,   songTitle: "End Game",                artist: "Taylor Swift",     duration: 0,	url: "http://s1.mmdl.xyz/1396/08/18/Taylor%20Swift%20-%20Reputation/2%20End%20Game.mp3"},
  {id: 8,   songTitle: "Ma Baker",                artist: "Boney M",          duration: 0,	url: "http://dora-robo.com/muzyka/70's-80's-90's%20/Boney%20M.%20-%20Ma%20Baker.mp3"},
  {id: 9,   songTitle: "Cocaine",                 artist: "Eric Clapton",     duration: 0,	url: "http://195.122.253.112/public/mp3/Eric%20Clapton/Eric%20Clapton%20'Cocaine'.mp3"},
  {id: 10,  songTitle: "All That She Wants",      artist: "Ace Of Base",      duration: 0,	url: "http://dora-robo.com/muzyka/70's-80's-90's%20/All%20That%20She%20Wants.mp3"},
];

// Function for setting duration for all songs on the playlist.
function setDurations(songsArray) {
  for (let i = 1; i < songsArray.length; i++) {
    const tempAudio = new Audio();
    tempAudio.src = songs[i].url;
    tempAudio.load();
    tempAudio.onloadedmetadata = () => {
      songsArray[i].duration = Math.floor(tempAudio.duration);
    }
  }
  return songsArray;
}

//Make a new array wich includes the duration of the songs.
const newSongsArray = setDurations(songs);

//Calls the react App component.
ReactDOM.render(<App initialPlaylist={newSongsArray}/>, document.getElementById('root'));
registerServiceWorker();
