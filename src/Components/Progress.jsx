import React from "react";
import PropTypes from "prop-types";

/***** PROGRESS component *****/
export default function Progress(props) {
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