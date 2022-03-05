/***** IMPORTS *****/
import {FC} from 'react';
import styles from './AddSongForm.module.scss'


/***** TYPES *****/
interface IAddSongFormProps {
	handleAdd: any,
}


/***** COMPONENT-FUNCTION *****/
const AddSongForm: FC<IAddSongFormProps> = ({handleAdd}) => {


	/*** Return-statement ***/
	return (
		<div className={styles.AddSongForm} >
			<h3>Add a song</h3>
			<form onSubmit={handleAdd}>
				<table>
					<tbody>
						<tr>
							<td>
								<label htmlFor='songTitle'>Song title: </label>
							</td>
							<td>
								<input 
									type='text' 
									name='songTitle'
									id='songTitle' 
								/>
							</td>
						</tr>
						<tr>
							<td>
								<label htmlFor='artist'>Artist: </label>
							</td>
							<td>
								<input 
									type='text' 
									id='artist'
									name='artist'
								/>
							</td>
						</tr>
						<tr>
							<td>
								<label htmlFor='url'>URL: </label>
							</td>
							<td>
								<input 
									type='text' 
									id='url' 
									name='url'
								/>
							</td>
						</tr>
						<tr>
							<td />
							<td>
								<input 
									className={styles.addSongButton} 
									type='submit' 
									value='Add song' 
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	);
};
  

/***** EXPORTS ****/
export default AddSongForm;
