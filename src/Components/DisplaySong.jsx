import React from "react";
import PropTypes from "prop-types";

/***** DISPLAYSONG component *****/
export default function DisplaySong(props) {
    return (
      <div className="song-info">
        <p>{props.song.artist} - {props.song.songTitle}</p>
      </div>
    );
  }
  
  DisplaySong.propTypes = {
    song: PropTypes.shape({
      id:               PropTypes.number.isRequired,
      songTitle:        PropTypes.string.isRequired,
      artist:           PropTypes.string.isRequired,
      duration:         PropTypes.number.isRequired,
      url:              PropTypes.string.isRequired,
    }).isRequired,
  }