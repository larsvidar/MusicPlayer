/***** Songs array *****/
let songs = [
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
function Displaysong() {
  return (
    <div className="song-info">
      <p>Air - Sexy Boy</p>
    </div>
  );
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
function Controls() {
  return (
    <div className="buttons">
      <i class="button fa fa-step-backward"></i>
      <i class="button fa fa-play"></i>
      <i class="button fa fa-stop"></i>
      <i class="button fa fa-step-forward"></i>
    </div>
  );
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

/***** APPLICATION class *****/
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Music Player",
      songlist: this.props.initialPlaylist,
    };
  }

  render() {
    return (
      <div className="player">
        <Header title={this.state.title} />
        <div className="controls">
          <Displaysong />
          <Progress />
          <Controls />
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
  })).isRequired
};

/***** Launching the app *****/
ReactDOM.render(<Application initialPlaylist={songs} />, document.getElementById("container"));
