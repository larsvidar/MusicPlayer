/***** IMPORTS *****/
import {FC, SyntheticEvent, useState} from "react";


/***** TYPES *****/
interface IAddSongFormProps {
	menuStyle: object,
	onSongSubmit: any,
}


/***** COMPONENT-FUNCTION *****/
const AddSongForm: FC<IAddSongFormProps> = ({menuStyle, onSongSubmit}) => {

	const [formState, setFormState] = useState<any>({
		songTitleValue: "",
		artistValue: "",
		urlValue: "",
	})


	const onTitleChange = (event: SyntheticEvent) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		setFormState({songTitleValue: target.value});
	}

	const onArtistChange = (event: SyntheticEvent) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		setFormState({artistValue: target.value});
	}

	const onUrlChange = (event: SyntheticEvent) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		setFormState({urlValue: target.value});
	}

	const addButton = (event: SyntheticEvent) => {
		event.preventDefault();

		onSongSubmit(formState.songTitleValue, formState.artistValue, formState.urlValue);
		setFormState({
			songTitleValue: "",
			artistValue: "",
			urlValue: "",
		})
	}


	return (
		<div className="menu" style={menuStyle}>
			<h3>Add a song</h3>
			<form  onSubmit={addButton}>
				<table>
					<tbody>
						<tr>
							<td>
								<label htmlFor="title">Song title: </label>
							</td>
							<td>
								<input type="text" id="title" value={formState.songTitleValue} onChange={onTitleChange} />
							</td>
						</tr>
						<tr>
							<td>
								<label htmlFor="artist">Artist: </label>
							</td>
							<td>
								<input type="text" id="artist" value={formState.artistValue} onChange={onArtistChange} />
							</td>
						</tr>
						<tr>
							<td>
								<label htmlFor="url">URL: </label>
							</td>
							<td>
								<input type="text" id="url" value={formState.urlValue} onChange={onUrlChange} />
							</td>
						</tr>
						<tr>
							<td />
							<td>
								<input className="addSongButton" type="submit" value="Add song" />
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
