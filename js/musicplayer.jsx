/***** Songs array *****/
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
}

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
    };
  }

  navigate(diff) {
    this.state.playIndex += diff;
    if (this.state.playIndex < 1) {
      this.state.playIndex = this.state.songlist.length - 1;
      this.setState(this.state);
    } else if(this.state.playIndex > this.state.songlist.length - 1) {
      this.state.playIndex = 1;
      this.setState(this.state);
    } else {
      this.setState(this.state);
    }
  }

  onPlayButton(diff) {
    {console.log("Play-button pushed " + diff)}
    this.state.playIndex += diff;
    this.setState(this.state);
  }

  onStopButton() {
    {console.log("Stop-button pushed ")}
    this.state.playIndex = 0;
    this.setState(this.state);
  }



  render() {
    return (
      <div className="player">
        <Header title={this.state.title} />
        <div className="controls">
          <Displaysong song={this.state.songlist[this.state.playIndex]}/>
          <Progress />
          <Controls
            onBack={function(diff) {this.navigate(diff)}.bind(this)}
            onPlay={function(diff) {this.onPlayButton(diff)}.bind(this)}
            onForward={function(diff) {this.navigate(diff)}.bind(this)}
            onStop={function(diff) {this.onStopButton()}.bind(this)}
             />
          <div className="playlist">
            <table className="playlist-table">
              <tr>
                <th className="title">Title</th>
                <th className="artist">Artist</th>
                <th className="duration">Duration</th>
                <th className="edit"></th>
              </tr>
              {this.state.songlist.map(function(song) {
                return (
                  <Playlist
                    songtitle={song.songTitle}
                    artist={song.artist}
                    duration={song.duration} />
                );
              }.bind(this))}
            </table>
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
};

/***** Launching the app *****/
ReactDOM.render(<Application initialPlaylist={songs} />, document.getElementById("container"));
