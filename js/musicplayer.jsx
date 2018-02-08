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
function Playlist() {
  return (
      <table className="playlist-table">
        <tr>
          <th className="title">Title</th>
          <th className="artist">Artist</th>
          <th className="duration">Duration</th>
          <th className="edit"></th>
        </tr>
        <tr>
          <td>Sexy Boy</td>
          <td>Air</td>
          <td>3:21</td>
          <td><i class="fa fa-edit"></i></td>
        </tr>
        <tr>
          <td>Last Junkie</td>
          <td>Dandy Warholes</td>
          <td>4:03</td>
          <td><i class="fa fa-edit"></i></td>
        </tr>
        <tr>
          <td>Eple</td>
          <td>Röyksopp</td>
          <td>2:58</td>
          <td><i class="fa fa-edit"></i></td>
        </tr>
        <tr>
          <td>Sexy Boy</td>
          <td>Air</td>
          <td>3:21</td>
          <td><i class="fa fa-edit"></i></td>
        </tr>
        <tr>
          <td>Last Junkie</td>
          <td>Dandy Warholes</td>
          <td>4:03</td>
          <td><i class="fa fa-edit"></i></td>
        </tr>
        <tr>
          <td>Eple</td>
          <td>Röyksopp</td>
          <td>2:58</td>
          <td><i class="fa fa-edit"></i></td>
        </tr>
      </table>
  );
}

/***** APPLICATION class *****/
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Music Player"
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
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  title: PropTypes.string.isRequired
};

/***** Launching the app *****/
ReactDOM.render(<Application />, document.getElementById("container"));
