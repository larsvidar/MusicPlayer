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
      <i class="button fa fa-pause"></i>
      <i class="button fa fa-stop"></i>
      <i class="button fa fa-step-forward"></i>
    </div>
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
