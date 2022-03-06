/***** IMPORTS *****/
import {toMinutes} from 'utils/actions';
import {FC} from 'react';
import styles from './Song.module.scss';
import {FSingleVoid, ISong} from 'types/IGeneral';
import {BsTrash} from 'react-icons/bs'


/***** TYPES *****/
interface ISongProps {
	song: ISong,
	deleteSong: FSingleVoid<string>
}

/***** COMPONENT-FUNCTION *****/
const Song: FC<ISongProps> = ({song, deleteSong}) => {
	console.log(song)

	/*** Variables ***/
	const minutes = toMinutes(song.duration);
	const songClass = `${styles.Song} ${song.isActive ? styles.active : ''}`;
	
	/*** Return-statement ***/
	return (
		<tr className={songClass}>
			<td><p title={song.songTitle} >{song.songTitle}</p></td>
			<td><p title={song.artist} >{song.artist}</p></td>
			<td><p className={styles.duration} title={minutes} >{minutes}</p></td>
			<td className={styles.edit} title={'Edit'} onClick={() => deleteSong(song.id)} >
				<BsTrash />
			</td>
		</tr>
	);
}

export default Song;
