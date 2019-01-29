import React from "react";
import PropTypes from "prop-types";

/***** CONTROLS component *****/
export default function Controls(props) {
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