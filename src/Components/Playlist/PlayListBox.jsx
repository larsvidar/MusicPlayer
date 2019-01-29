import React from "react";
import PropTypes from "prop-types";
import Playlist from "./Playlist";

/***** PLAYLISTBOX component *****/
export default function PlayListBox(props) {
    return (
      <div>
        <table className="playlist-table">
            <tbody>
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
              })}
            </tbody>
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