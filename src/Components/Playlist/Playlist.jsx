import React from "react";
import PropTypes from "prop-types";

/***** PLAYLIST component *****/
export default function Playlist(props) {
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