/***** IMPORTS *****/
import {FC} from 'react';
import {ISong} from '../App';
import styles from './DisplaySong.module.scss';


/**** TYPES *****/
interface IDisplaySongProps {
	song: ISong,
}


/***** COMPONENT-FUNCTION *****/
const DisplaySong: FC<IDisplaySongProps> = ({song}) => {
	
	/*** Return-statement ***/
	return (
		<div className={styles.DisplaySong}>
			<p>{song.artist} - {song.songTitle}</p>
		</div>
	);
}


/***** EXPORTS *****/
export default DisplaySong;
