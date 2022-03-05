/***** IMPORTS *****/
import {ISong} from 'components/App';
import Playlist from 'components/Playlist/Playlist';
import {FC} from 'react';

/**** TYPES *****/
interface IPlayListBox {
	playlist: ISong[],
}

/***** FUNCTION-COMPONENT *****/
const PlayListBox: FC<IPlayListBox> = ({playlist = []}) => {
	return (
		<div>
			<table className='playlist-table'>
				<tbody>
					<tr>
					<th className='title'>Title</th>
					<th className='artist'>Artist</th>
					<th className='duration'>Duration</th>
					<th className='edit'></th>
					</tr>
					{playlist?.map((song: any) => (
						<Playlist
							songtitle={song.songTitle}
							artist={song.artist}
							duration={song.duration}
							key={song.id} 
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}


/**** EXPORTS *****/
export default PlayListBox;
