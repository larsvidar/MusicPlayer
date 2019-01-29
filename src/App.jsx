import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from "./Components/Header";
import MenuButton from "./Components/MenuButton";
import AddSongForm from "./Components/AddSongForm";
import DisplaySong from "./Components/DisplaySong";
import Progress from "./Components/Progress";
import Controls from "./Components/Controls";
import PlayListBox from "./Components/Playlist/PlayListBox";

const audio = new Audio();
let songIndex = 11;


/******************************
******    APP class      ******
*******************************/
class App extends Component {
  constructor(props) {
    super(props);
    this.addSong = this.addSong.bind(this);
    this.onPlayButton = this.onPlayButton.bind(this);
    this.updateSongTime = this.updateSongTime.bind(this);

    this.navigate = this.navigate.bind(this);
    this.onPlayButton = this.onPlayButton.bind(this);
    this.onPauseButton = this.onPauseButton.bind(this);
    this.onStopButton = this.onStopButton.bind(this);

  	this.playIndex = 0;
  }
  
  state = {
      title: "Music Player",
      songlist: this.props.initialPlaylist,
      menuStyle: {display: "none"},
      playButtonStyle: {display: "block"},
      pauseButtonStyle: {display: "none"},
      isPlaying: false,
      songPassed: 0,
      songLength: 0,
      songProgress: 0,
    };

/********** FUNCTIONS **********/
  //Updates song timers.
  updateSongTime() {
    this.setState({
      songLength: Math.floor(audio.duration),
      songPassed: Math.floor(audio.currentTime),
      songProgress: ( (100 / audio.duration) * audio.currentTime ),
    });
  }

  //Adds song to playlist from AddSongForm.
  addSong(title, artist, url) {
    this.state.songlist.push({
      id: songIndex,
      songTitle: title,
      artist: artist,
      duration: 0,
      url: url,
    });

    this.setState(this.state);
    songIndex++;
  }

  /********** EVENT-LISTENERS **********/
  //Makes sure the song-timer updates regularly.
  componentDidMount() {
    this.interval = setInterval(this.updateSongTime, 100);
    audio.addEventListener("ended", function() {
      this.navigate(1);
    }.bind(this));
  }

  //Clears interval if unmounted
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //Handles Menu-button
  onMenuClick() {
    // Closes menu if open.
    if (this.state.menuStyle.display === "block") {
      this.setState({menuStyle: {display: "none"}});
      // Opens menu if closed.
    } else {
      this.setState({menuStyle: {display: "block"}});
    }
  }

  //Handles the skip forward and skip backward buttons.
  navigate(diff) {
    this.playIndex = this.playIndex + diff;

    //If you skip backwards on the biginning of the playlist, jump to last song..
    if (this.playIndex < 1) {
      this.playIndex = this.state.songlist.length - 1;
      audio.src = this.state.songlist[this.playIndex].url;
      if (this.state.isPlaying) {audio.play();}

      //if you skip forwards at the end of the playlist, jump to first song.
    } else if(this.playIndex > this.state.songlist.length - 1) {
      this.playIndex = 1;
      audio.src = this.state.songlist[this.playIndex].url;
      if (this.state.isPlaying) {audio.play();}

      //Else normal skipping.
    } else {
      audio.src = this.state.songlist[this.playIndex].url;
      if (this.state.isPlaying) {audio.play();}
    }
  }

  //Handles the play button.
  onPlayButton() {
    this.setState({isPlaying: true});
    if (this.playIndex === 0) {
      this.playIndex = 1;
      audio.src = this.state.songlist[this.playIndex].url;
    }

    audio.play();
    this.setState({playButtonStyle: {display: "none"}});
    this.setState({pauseButtonStyle: {display: "block"}});
  }

  //Handles the pause button.
  onPauseButton() {
    this.setState({isPlaying: false});
    audio.pause();
    this.setState({playButtonStyle: {display: "block"}});
    this.setState({pauseButtonStyle: {display: "none"}});
  }

  //Handles the stop button.
  onStopButton() {
    this.setState({isPlaying: false,
				   playButtonStyle: {display: "block"},
				   pauseButtonStyle: {display: "none"},
				   songProgress: 0,
           });
           
    this.playIndex = 0;
    audio.pause()
	audio.src = "";
  }

  //Renders the content of the page.
  render() {
    return (
      <div className="player">
        <Header title={this.state.title} />
        <MenuButton
          onMenuClick={function() {this.onMenuClick()}.bind(this)} />
        <AddSongForm
          menuStyle={this.state.menuStyle}
          onSongSubmit={this.addSong}/>
        <div className="controls">
          <DisplaySong song={this.state.songlist[this.playIndex]}/>
          <Progress timePassed={this.state.songPassed} timeLength={this.state.songLength} progressStyle={this.state.songProgress} />
          <Controls
            onBack={function(diff) {this.navigate(diff)}}
            onPlay={this.onPlayButton}
            onPause={this.onPauseButton}
            onForward={function(diff) {this.navigate(diff)}}
            onStop={this.onStopButton}
            playStyle={this.state.playButtonStyle}
            pauseStyle={this.state.pauseButtonStyle}/>
          <div className="playlist">
            <PlayListBox songlist={this.state.songlist} />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  initialPlaylist:  PropTypes.arrayOf(PropTypes.shape({
    id:               PropTypes.number.isRequired,
    songTitle:        PropTypes.string.isRequired,
    artist:           PropTypes.string.isRequired,
    url:              PropTypes.string.isRequired,
	duration:         PropTypes.number.isRequired,
  })).isRequired,
};


/***** Exporting the app *****/
export default App;
