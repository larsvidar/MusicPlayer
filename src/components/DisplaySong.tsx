/***** IMPORTS *****/
import {FC} from 'react';
import {ISong} from './App';


/**** TYPES *****/
interface IDisplaySongProps {
	song: ISong,
}

/***** COMPONENT-FUNCTION *****/
const DisplaySong: FC<IDisplaySongProps> = ({song}) => {
	
	/*** Return-statement ***/
	return (
		<div className="song-info">
			<p>{song.artist} - {song.songTitle}</p>
		</div>
	);
}


/***** EXPORTS *****/
export default DisplaySong;
