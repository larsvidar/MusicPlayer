/***** Songs array *****/
//Index 0 is reserved for stopped state.
let songs = [
  {id: 0,   songTitle: "",                            artist: "",                   duration: 0,    url: "#"},
  {id: 1,   songTitle: "Sexy Boy",                    artist: "Air",                duration: 214,  url: "#"},
  {id: 2,   songTitle: "Last Junkie",                 artist: "The Dandy Warholes", duration: 324,  url: "#"},
  {id: 3,   songTitle: "Sommerlykke",                 artist: "SNoB",               duration: 186,  url: "#"},
  {id: 4,   songTitle: "Paris Is Burning",            artist: "Ladyhawke",          duration: 204,  url: "#"},
  {id: 5,   songTitle: "Yesterday",                   artist: "Beatles",            duration: 151,  url: "#"},
  {id: 6,   songTitle: "Eple",                        artist: "Röyksopp",           duration: 175,  url: "#"},
  {id: 7,   songTitle: "Happy Up Here",               artist: "Röyksopp",           duration: 121,  url: "#"},
  {id: 8,   songTitle: "Where the wild roses grow",   artist: "Nick Cave",          duration: 254,  url: "#"},
  {id: 9,   songTitle: "Bently Rythm Gonna Get You",  artist: "Bently Rythm Ace",   duration: 300,  url: "#"},
  {id: 10,  songTitle: "Stan",                        artist: "Eminem",             duration: 129,  url: "#"},
];


/***** HEADER component *****/
function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
    );
}


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
    super(props)
  }

  render() {
    return (
      <div className="menu" style={this.props.menuStyle}>
        <h3>Add a song</h3>
        <table>
          <tr>
            <td>
              <lable for="title">Song title: </lable>
            </td>
            <td>
              <input type="text" id="title" />
            </td>
          </tr>
          <tr>
            <td>
              <lable for="artist">Artist: </lable>
            </td>
            <td>
              <input type="text" id="artist" />
            </td>
          </tr>
          <tr>
            <td>
              <lable for="url">URL: </lable>
            </td>
            <td>
              <input type="text" id="url" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input className="addSongButton" type="submit" value="Add song" />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
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
function Progress() {
  return (
    <div className="progress-meter">
      <div className="progress"></div>
    </div>
  );
}


/***** CONTROLS component *****/
function Controls(props) {
  return (
    <div className="buttons">
      <i class="button fa fa-step-backward" onClick={function() {props.onBack(-1);}}></i>
      <i class="button fa fa-play" onClick={function() {props.onPlay(1);}}></i>
      <i class="button fa fa-stop" onClick={function() {props.onStop();}}></i>
      <i class="button fa fa-step-forward" onClick={function() {props.onForward(1);}}></i>
    </div>
  );
}

Controls.propTypes = {
  onBack: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
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
              duration={song.duration} />
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
  return (
        <tr>
          <td>{props.songtitle}</td>
          <td>{props.artist}</td>
          <td>{props.duration}</td>
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
    //this.onPlayButton = this.onPlayButton.bind(this);
    this.state = {
      title: "Music Player",
      songlist: this.props.initialPlaylist,
      playIndex: 0,
      menuStyle: {display: "none"},
    };
  }

  //Handles Menu-button
  onMenuClick() {
    // Closes menu if open.
    if (this.state.menuStyle.display === "block") {
      this.state.menuStyle = {display: "none"};
      this.setState(this.state);
      // Opens menu if closed.
    } else {
      this.state.menuStyle = {display: "block"};
      this.setState(this.state);
    }
  }

  //Handles the skip forward and skip backward buttons.
  navigate(diff) {
    this.state.playIndex += diff;
    //If you skip backwards on the biginning of the playlist, jump to last song..
    if (this.state.playIndex < 1) {
      this.state.playIndex = this.state.songlist.length - 1;
      this.setState(this.state);
      //if you skip forwards at the end of the playlist, jump to first song.
    } else if(this.state.playIndex > this.state.songlist.length - 1) {
      this.state.playIndex = 1;
      this.setState(this.state);
      //Else normal skipping.
    } else {
      this.setState(this.state);
    }
  }

  //Handles the play button.
  onPlayButton(diff) {
    this.state.playIndex += diff;
    this.setState(this.state);
  }

  //Handles the stop button.
  onStopButton() {
    this.state.playIndex = 0;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="player">
        <Header title={this.state.title} />
        <MenuButton
          onMenuClick={function() {this.onMenuClick()}.bind(this)} />
        <AddSongForm
          menuStyle={this.state.menuStyle} />
        <div className="controls">
          <Displaysong song={this.state.songlist[this.state.playIndex]}/>
          <Progress />
          <Controls
            onBack={function(diff) {this.navigate(diff)}.bind(this)}
            onPlay={function(diff) {this.onPlayButton(diff)}.bind(this)}
            onForward={function(diff) {this.navigate(diff)}.bind(this)}
            onStop={function(diff) {this.onStopButton()}.bind(this)} />
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
