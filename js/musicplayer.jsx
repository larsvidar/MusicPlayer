/***** Songs array *****/
//Index 0 is reserved for stopped state.
let songs = [
  {id: 0,   songTitle: "",                        artist: "",                 url: "#"},
  {id: 1,   songTitle: "A Kind Of Magic",         artist: "Queen",            url: "http://hcmaslov.d-real.sci-nnov.ru/public/mp3/Queen/Queen%20'A%20Kind%20Of%20Magic'.mp3"},
  {id: 2,   songTitle: "Dynamite",                artist: "Scorpions",        url: "http://hcmaslov.d-real.sci-nnov.ru/public/mp3/Scorpions/Scorpions%20'Dynamite'.mp3"},
  {id: 3,   songTitle: "Got My Mind Set On You",  artist: "George Harrison",  url: "http://dora-robo.com/muzyka/70's-80's-90's%20/George%20Harrison%20-%20Got%20My%20Mind%20Set%20On%20You%20%5bJanuary%201988%5d.mp3"},
  {id: 4,   songTitle: "Bohemian Rhapsody",       artist: "Queen",            url: "http://hcmaslov.d-real.sci-nnov.ru/public/mp3/Queen/Queen%20'Bohemian%20Rhapsody'.mp3"},
  {id: 5,   songTitle: "Mastermind",              artist: "Mike Oldfield",    url: "http://www.replicaradio.ro/audio/oldfield/millenium/07.Mike%20Oldfield-Mastermind.mp3"},
  {id: 6,   songTitle: "Heart Of Glass",          artist: "Blondie",          url: "http://dora-robo.com/muzyka/70's-80's-90's%20/Blondie%20-%20Heart%20of%20Glass.mp3"},
  {id: 7,   songTitle: "End Game",                artist: "Taylor Swift",     url: "http://s1.mmdl.xyz/1396/08/18/Taylor%20Swift%20-%20Reputation/2%20End%20Game.mp3"},
  {id: 8,   songTitle: "Ma Baker",                artist: "Boney M",          url: "http://dora-robo.com/muzyka/70's-80's-90's%20/Boney%20M.%20-%20Ma%20Baker.mp3"},
  {id: 9,   songTitle: "Cocaine",                 artist: "Eric Clapton",     url: "http://195.122.253.112/public/mp3/Eric%20Clapton/Eric%20Clapton%20'Cocaine'.mp3"},
  {id: 10,  songTitle: "All That She Wants",      artist: "Ace Of Base",      url: "http://dora-robo.com/muzyka/70's-80's-90's%20/All%20That%20She%20Wants.mp3"},
];

const audio = new Audio
let songIndex = 11;
setDurations();

// Function for setting duration for all songs on the playlist.
function setDurations() {
  for (let i = 1; i < songs.length; i++) {
    const tempAudio = new Audio();
    tempAudio.src = songs[i].url;
    tempAudio.load();
    tempAudio.onloadedmetadata = () => {
      songs[i].duration = Math.floor(tempAudio.duration);
    }
  }
}


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
    <i class="fa fa-bars" onClick={function() {props.onMenuClick()}}></i>
  );
}

MenuButton.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
}


/***** ADDSONGFORM component *****/
class AddSongForm extends React.Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onArtistChange = this.onArtistChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.addButton = this.addButton.bind(this);
    this.state = {
        songTitleValue: "",
        artistValue: "",
        urlValue: "",
    }
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
            <tr>
              <td>
                <lable for="title">Song title: </lable>
              </td>
              <td>
                <input type="text" id="title" value={this.state.songTitleValue} onChange={this.onTitleChange} />
              </td>
            </tr>
            <tr>
              <td>
                <lable for="artist">Artist: </lable>
              </td>
              <td>
                <input type="text" id="artist" value={this.state.artistValue} onChange={this.onArtistChange} />
              </td>
            </tr>
            <tr>
              <td>
                <lable for="url">URL: </lable>
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
          </table>
      </form>
      </div>
    );
  }
}

AddSongForm.propTypes = {
  menuStyle: PropTypes.object.isRequired,
  onsSongSubmit: PropTypes.func.isRequired,
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
  let lineStyle = {width: props.progressStyle + "%"}
  let passedMinutes = Math.floor(props.timePassed / 60); //Finds how many minutes has passed.
  let passedSeconds = (props.timePassed % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}); //Finds the seconds, and add a zero if the number is below 10.
  let lengthMinutes = Math.floor(props.timeLength / 60); //Finds how many minutes the song is.
  let lengthSeconds = (props.timeLength % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}); //Finds the seconds, and add a zero if the number is below 10.

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
      <i class="button fa fa-step-backward" onClick={function() {props.onBack(-1);}}></i>
      <i class="button fa fa-play" onClick={function() {props.onPlay();}} style={props.playStyle}></i>
      <i class="button fa fa-pause" onClick={function() {props.onPause();}} style={props.pauseStyle}></i>
      <i class="button fa fa-stop" onClick={function() {props.onStop();}}></i>
      <i class="button fa fa-step-forward" onClick={function() {props.onForward(1);}}></i>
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
        }.bind(this))}
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
          <td><i class="fa fa-edit"></i></td>
        </tr>
  );
}

Playlist.propTypes = {
  songtitle: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
}


/******************************
****** APPLICATION class ******
*******************************/
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.addSong = this.addSong.bind(this);
    this.onPlayButton = this.onPlayButton.bind(this);
    this.updateSongTime = this.updateSongTime.bind(this);
    this.state = {
      title: "Music Player",
      songlist: this.props.initialPlaylist,
      playIndex: 0,
      menuStyle: {display: "none"},
      playButtonStyle: {display: "block"},
      pauseButtonStyle: {display: "none"},
      isPlaying: false,
      songPassed: 0,
      songLength: 1,
      songProgress: 0,
    };
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

  //Updates song timers.
  updateSongTime() {
    this.setState({
      songLength: Math.floor(audio.duration),
      songPassed: Math.floor(audio.currentTime),
      songProgress: ( (100 / audio.duration) * audio.currentTime ),
    });
  }

  //Makes sure the song-timer updates regulary.
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
    this.state.playIndex += diff;
    //If you skip backwards on the biginning of the playlist, jump to last song..
    if (this.state.playIndex < 1) {
      this.state.playIndex = this.state.songlist.length - 1;
      audio.src = this.state.songlist[this.state.playIndex].url;
      if (this.state.isPlaying) {audio.play();}
      this.setState(this.state);
      //if you skip forwards at the end of the playlist, jump to first song.
    } else if(this.state.playIndex > this.state.songlist.length - 1) {
      this.state.playIndex = 1;
      audio.src = this.state.songlist[this.state.playIndex].url;
      if (this.state.isPlaying) {audio.play();}
      this.setState(this.state);
      //Else normal skipping.
    } else {
      audio.src = this.state.songlist[this.state.playIndex].url;
      if (this.state.isPlaying) {audio.play();}
      this.setState(this.state);
    }
  }

  //Handles the play button.
  onPlayButton() {
    this.state.isPlaying = true;
    if (this.state.playIndex === 0) {
      this.state.playIndex++;
      audio.src = this.state.songlist[this.state.playIndex].url;
    }
    audio.play();
    this.state.playButtonStyle = {display: "none"};
    this.state.pauseButtonStyle = {display: "block"};
    this.setState(this);
  }

  //Handles the pause button.
  onPauseButton() {
    this.state.isPlaying = false;
    audio.pause();
    this.state.playButtonStyle = {display: "block"};
    this.state.pauseButtonStyle = {display: "none"};
    this.setState(this);
  }

  //Handles the stop button.
  onStopButton() {
    this.state.isPlaying = false;
    this.state.playIndex = 0;
    audio.pause()
    this.state.playButtonStyle = {display: "block"};
    this.state.pauseButtonStyle = {display: "none"};
    this.setState(this.state);
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
          <Displaysong song={this.state.songlist[this.state.playIndex]}/>
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

Application.propTypes = {
  title:            PropTypes.string.isRequired,
  initialPlaylist:  PropTypes.arrayOf(PropTypes.shape({
    id:               PropTypes.number.isRequired,
    songTitle:        PropTypes.string.isRequired,
    artist:           PropTypes.string.isRequired,
    duration:         PropTypes.number.isRequired,
    url:              PropTypes.string.isRequired,
  })).isRequired,
  playIndex:      PropTypes.number.isRequired,
  menyStyle:      PropTypes.object.isRequired,
};


/***** Launching the app *****/
ReactDOM.render(<Application initialPlaylist={songs} />, document.getElementById("container"));
