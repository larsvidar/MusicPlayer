/***** IMPORTS *****/
import {toMinutes} from 'components/actions';
import {ISong} from 'components/App';
import {FC} from 'react';
import styles from './Song.module.scss';


/***** TYPES *****/
interface ISongProps {
	song: ISong,
}

/***** COMPONENT-FUNCTION *****/
const Song: FC<ISongProps> = ({song}) => {

	/*** Variables ***/
	const minutes = toMinutes(song.duration);
	
	/*** Return-statement ***/
	return (
		<tr className={styles.Song}>
			<td><p title={song.songTitle} >{song.songTitle}</p></td>
			<td><p title={song.artist} >{song.artist}</p></td>
			<td><p className={styles.duration} title={minutes} >{minutes}</p></td>
			<td className={styles.edit} title={'Edit'} ><i className={'fa fa-edit'} /></td>
		</tr>
	);
}

export default Song;
