/***** IMPORTS *****/
import {FC} from 'react';
import {ISong} from 'types/IGeneral';
import styles from './CurrentSong.module.scss';


/**** TYPES *****/
interface ICurrentSongProps {
	song?: ISong,
}


/***** COMPONENT-FUNCTION *****/
const CurrentSong: FC<ICurrentSongProps> = ({song = {}}) => {
	
	/*** Return-statement ***/
	return (
		<div className={styles.CurrentSong}>
			<p>{song.artist} - {song.songTitle}</p>
		</div>
	);
}


/***** EXPORTS *****/
export default CurrentSong;
