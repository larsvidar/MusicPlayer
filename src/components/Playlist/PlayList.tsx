/***** IMPORTS *****/
import {FC} from 'react';
import Song from './Song';
import styles from './Playlist.module.scss';
import {FSingleVoid, ISong} from 'types/IGeneral';

/**** TYPES *****/
interface IPlayList {
	playlist: ISong[],
	deleteSong: FSingleVoid<string>,
}

/***** FUNCTION-COMPONENT *****/
const PlayList: FC<IPlayList> = ({playlist = [], deleteSong}) => {
	return (
		<div className={styles.Playlist} >
			<table className={styles.playlistTable}>
				<tbody>
					{/* Table-header */}
					<tr>
						<th className={styles.title} ><p>Title</p></th>
						<th className={styles.artist} ><p>Artist</p></th>
						<th className={styles.duration} ><p>Duration</p></th>
						<th className={styles.edit} />
					</tr>

					{/* Song-list */}
					{playlist?.map((song) => (
						<Song key={song.id} song={song} deleteSong={deleteSong} />
					))}
				</tbody>
			</table>
		</div>
	);
}


/**** EXPORTS *****/
export default PlayList;
