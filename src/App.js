import React, { Component } from 'react';
import PropTypes from 'prop-types';

const audio = new Audio();
let songIndex = 11;

/***** HEADER component *****/
function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
    );
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};


/***** MENUBUTTON component *****/
function MenuButton(props) {
  return(
    <i className="fa fa-bars" onClick={function() {props.onMenuClick()}}></i>
  );
}

MenuButton.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
}


/***** ADDSONGFORM component *****/
class AddSongForm extends Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onArtistChange = this.onArtistChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.addButton = this.addButton.bind(this);
  }
  
  state = {
        songTitleValue: "",
        artistValue: "",
        urlValue: "",
		}
  
  

  onTitleChange(e) {
    this.setState({songTitleValue: e.target.value});
  }

  onArtistChange(e) {
    this.setState({artistValue: e.target.value});
  }

  onUrlChange(e) {
    this.setState({urlValue: e.target.value});
  }

  addButton(e) {
    e.preventDefault();
    this.props.onSongSubmit(this.state.songTitleValue, this.state.artistValue, this.state.urlValue);
    this.setState({songTitleValue: "",
                   artistValue: "",
                   urlValue: "",
                 })
  }

  render() {
    return (
      <div className="menu" style={this.props.menuStyle}>
        <h3>Add a song</h3>
        <form  onSubmit={this.addButton}>
          <table>
			<tbody>
				<tr>
				  <td>
					<label htmlFor="title">Song title: </label>
				  </td>
				  <td>
					<input type="text" id="title" value={this.state.songTitleValue} onChange={this.onTitleChange} />
				  </td>
				</tr>
				<tr>
				  <td>
					<label htmlFor="artist">Artist: </label>
				  </td>
				  <td>
					<input type="text" id="artist" value={this.state.artistValue} onChange={this.onArtistChange} />
				  </td>
				</tr>
				<tr>
				  <td>
					<label htmlFor="url">URL: </label>
				  </td>
				  <td>
					<input type="text" id="url" value={this.state.urlValue} onChange={this.onUrlChange} />
				  </td>
				</tr>
				<tr>
				  <td></td>
				  <td>
					<input className="addSongButton" type="submit" value="Add song" />
				  </td>
				</tr>
			</tbody>
          </table>
      </form>
      </div>
    );
  }
}

AddSongForm.propTypes = {
  menuStyle: PropTypes.object.isRequired,
  onSongSubmit: PropTypes.func.isRequired,
};


/***** DISPLAYSONG component *****/
function Displaysong(props) {
  return (
    <div className="song-info">
      <p>{props.song.artist} - {props.song.songTitle}</p>
    </div>
  );
}

Displaysong.propTypes = {
  song: PropTypes.shape({
    id:               PropTypes.number.isRequired,
    songTitle:        PropTypes.string.isRequired,
    artist:           PropTypes.string.isRequired,
    duration:         PropTypes.number.isRequired,
    url:              PropTypes.string.isRequired,
  }).isRequired,
}


/***** PROGRESS component *****/
function Progress(props) {
  let lineStyle = {width: props.progressStyle + "%"} //Style for making the progress-meter fill up.
  let passedMinutes = Math.floor(props.timePassed / 60); //Finds how many minutes has passed.
  let passedSeconds = (props.timePassed % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}); //Finds the seconds, and add a zero if the number is below 10.
  let lengthMinutes = 0;
  let lengthSeconds = (0).toLocaleString(undefined, {minimumIntegerDigits: 2});
  if (props.timeLength > 0) {lengthMinutes = Math.floor(props.timeLength / 60);} //Finds how many minutes the song is, sets zero if no song is loaded.
  if (!isNaN(props.timeLength)) {lengthSeconds = (props.timeLength % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});} //Finds the seconds, and add a zero if the number is below 10. Sets zero if no song is loaded.
  
  return (
    <div>
      <div className="time">
        <p>{passedMinutes}:{passedSeconds}</p>
        <p>{lengthMinutes}:{lengthSeconds}</p>
      </div>
      <div className="progress-meter">
        <div className="progress" style={lineStyle}>
        </div>
      </div>
    </div>
  );
}

Progress.propTypes = {
  timePassed: PropTypes.number.isRequired,
  timeLength: PropTypes.number.isRequired,
  progressStyle: PropTypes.number.isRequired,
};


/***** CONTROLS component *****/
function Controls(props) {
  return (
    <div className="buttons">
      <i className="button fa fa-step-backward" onClick={function() {props.onBack(-1);}}></i>
      <i className="button fa fa-play" onClick={function() {props.onPlay();}} style={props.playStyle}></i>
      <i className="button fa fa-pause" onClick={function() {props.onPause();}} style={props.pauseStyle}></i>
      <i className="button fa fa-stop" onClick={function() {props.onStop();}}></i>
      <i className="button fa fa-step-forward" onClick={function() {props.onForward(1);}}></i>
    </div>
  );
}

Controls.propTypes = {
  onBack: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  playStyle: PropTypes.object.isRequired,
  pauseStyle: PropTypes.object.isRequired,
};


/***** PLAYLISTBOX component *****/
function PlayListBox(props) {
  return (
    <div>
      <table className="playlist-table">
		  <tbody>
			<tr>
			  <th className="title">Title</th>
			  <th className="artist">Artist</th>
			  <th className="duration">Duration</th>
			  <th className="edit"></th>
			</tr>
			{props.songlist.map(function(song) {
			  return (
				<Playlist
				  songtitle={song.songTitle}
				  artist={song.artist}
				  duration={song.duration}
				  key={song.id} />
			  );
			})}
		  </tbody>
      </table>
    </div>
  );
}

PlayListBox.propTypes = {
  songlist:   PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    songTitle:  PropTypes.string.isRequired,
    artist:     PropTypes.string.isRequired,
    duration:   PropTypes.number.isRequired,
    url:        PropTypes.string.isRequired,
  })).isRequired,
};


/***** PLAYLIST component *****/
function Playlist(props) {
  let minutes = Math.floor(props.duration / 60);  //Finds how many minutes the song is.
  let seconds = (props.duration % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}); //Finds the seconds, and add a zero if the number is below 10.
  return (
        <tr>
          <td>{props.songtitle}</td>
          <td>{props.artist}</td>
          <td>{minutes}:{seconds}</td>
          <td><i className="fa fa-edit"></i></td>
        </tr>
  );
}

Playlist.propTypes = {
  songtitle: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
}


/******************************
******    APP class      ******
*******************************/
class App extends Component {
  constructor(props) {
    super(props);
    this.addSong = this.addSong.bind(this);
    this.onPlayButton = this.onPlayButton.bind(this);
    this.updateSongTime = this.updateSongTime.bind(this);
	
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

  //Updates song timers.
  updateSongTime() {
    this.setState({
      songLength: Math.floor(audio.duration),
      songPassed: Math.floor(audio.currentTime),
      songProgress: ( (100 / audio.duration) * audio.currentTime ),
    });
  }

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
          <Displaysong song={this.state.songlist[this.playIndex]}/>
          <Progress timePassed={this.state.songPassed} timeLength={this.state.songLength} progressStyle={this.state.songProgress} />
          <Controls
            onBack={function(diff) {this.navigate(diff)}.bind(this)}
            onPlay={function() {this.onPlayButton()}.bind(this)}
            onPause={function() {this.onPauseButton()}.bind(this)}
            onForward={function(diff) {this.navigate(diff)}.bind(this)}
            onStop={function(diff) {this.onStopButton()}.bind(this)}
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
