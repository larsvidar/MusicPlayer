/***** IMPORTS *****/
import {FC} from 'react';
import Song from './Song';
import styles from './Playlist.module.scss';
import {ISong} from 'types/IGeneral';

/**** TYPES *****/
interface IPlayList {
	playlist: ISong[],
}

/***** FUNCTION-COMPONENT *****/
const PlayList: FC<IPlayList> = ({playlist = []}) => {
	return (
		<div className={styles.Playlist} >
			<table className={styles.playlistTable}>
				<tbody>
					{/* Table-header */}
					<tr>
						<th className={styles.title} ><p>Title</p></th>
						<th className={styles.artist} ><p>Artist</p></th>
						<th className={styles.duration} ><p>Duration</p></th>
						<th className={styles.edit} ><p>Edit</p></th>
					</tr>

					{/* Song-list */}
					{playlist?.map((song: any) => (
						<Song key={song.id} song={song} />
					))}
				</tbody>
			</table>
		</div>
	);
}


/**** EXPORTS *****/
export default PlayList;
