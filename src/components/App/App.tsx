/***** IMPORTS *****/
import Header from 'components/Header/Header';
import MenuButton from 'components/MenuButton/MenuButton';
import AddSongForm from 'components/AddSongForm/AddSongForm';
import DisplaySong from 'components/DisplaySong/DisplaySong';
import Progress from 'components/Progress/Progress';
import Controls from 'components/Controls/Controls';
import PlayListBox from 'components/Playlist/PlayList';
import {useEffect, useRef, useState} from 'react';
import initialPlaylist from 'data/initialSongs.json';
import config from 'data/configData.json';
import styles from './App.module.scss'
import {genUid, getTimeoutObject, isEmpty, jsonParse} from 'utils/actions';
import {IPlayState, ISong} from 'types/IGeneral';
import {calculatePlayState, setAudioDurations} from 'utils/mActions';


/***** COMPONENT-FUNCTION *****/
const App = () => {

	/*** Variables ***/
	const audio = useRef(new Audio());
	const timeouts = useRef(getTimeoutObject());


	/*** State ***/
	const [playlist, setPlaylist] = useState([] as ISong[]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [song, setSong] = useState(playlist[0] || {});
	const [playState, setNativePlayState] = useState<IPlayState>({
		isPlaying: false,
		progress: 0,
		duration: 0,
		currentTime: 0,
	});


	/*** Effects ***/

	//Runs once
	//	-If no playlist exist in localStorage, sets initial-songs to localStorage and sets playlist to state.
	//	-Cleanup
	useEffect(() => {
		if(!localStorage.playlist) {
			setAudioDurations(initialPlaylist as unknown as ISong[]).then((result: ISong[]) => {
				localStorage.playlist = JSON.stringify(result, null, 4);
				setSong(result[0]);
				setPlaylist(result)
			});
		} else {
			const savedPlaylist: ISong[] = jsonParse(localStorage.playlist);
			setPlaylist(savedPlaylist);
			setSong(savedPlaylist[0])
		}

		const tempTimeout = timeouts.current;
		// Clears interval if unmounted
		return () => {
			tempTimeout.clearAll();
		}
	}, []); //eslint-disable-line


	//Runs when playlist- or song-state is updated
	//	-If no song is selected, select first song in playlist.
	useEffect(() => {
		if(!isEmpty(song)) {
			audio.current.src = song.url;

			if(isPlaying) audio.current.play();
			else audio.current.pause();
		} else {
			audio.current.src = '';
			setIsPlaying(false);
		}

		updatePlayState();
	}, [playlist, song]); //eslint-disable-line

	//Sets ended-event-listener
	//	-Makes sure the player loads next song when current song is finished.
	useEffect(() => {
		//const interval = setInterval(updatePlayState, 100);
		if(audio.current) audio.current.addEventListener("ended", () => handleNavigate());
	}, [audio.current]); //eslint-disable-line


	//Runs when isPlaying-state is updated
	//	-Starts or stops audio, and sets or removes playState-interval.
	useEffect(() => {
		if(isPlaying) {
			timeouts.current.playing = setInterval(updatePlayState, 250);
			audio.current.play();
		} else {
			setPlayState({isPlaying: false} as IPlayState);
			clearInterval(timeouts.current.playing);
			audio.current.pause();
		}
	}, [isPlaying]); //eslint-disable-line


	/*** Functions ***/

	/**
	 * Setter for playState. Makes sure one setting dont overwrite other settings.
	 * @param data Data to set to state. 
	 */
	const setPlayState = (data: IPlayState) => {
		setNativePlayState((prevPlayState) => {
			return {...prevPlayState, ...data};
		});
	}


	/**
	 * Calculates and updates playState.
	 */
	const updatePlayState = () => {
		const newPlayState = calculatePlayState(audio.current);
		setPlayState(newPlayState)
	}

	const handleNavigate = (factor = 1) => {
		const currentIndex = playlist.findIndex((thisSong) => thisSong.id === song.id);
		let newIndex = currentIndex + factor;
		if(newIndex >= playlist.length) newIndex -= playlist.length;
		if(newIndex < 0) newIndex = (playlist.length + newIndex);

		setSong(playlist[newIndex]);
	};

	const handleStop = () => {
		setIsPlaying(false);
		setPlayState({isPlaying: false, progress: 0} as IPlayState);
	}

	//Adds song to playlist from AddSongForm.
	const addSong = (title: string, artist: string, url: string) => {
		setPlaylist([
			...playlist,
			{
				id: genUid(8),
				songTitle: title,
				artist: artist,
				duration: 0,
				url: url,
			}
		]);
	};


  	/*** Return-statement ***/
    return(
		<div className={styles.App}>
			<div className={styles.player}>
				<Header title={config.title} />
				<MenuButton onMenuClick={() => setShowMenu(!showMenu)} />
				{showMenu &&
					<AddSongForm onSongSubmit={addSong} />
				}
				
				<div className={styles.controls}>
					<DisplaySong song={song} />
					
					<Progress playState={playState} />

					<Controls
						isPlaying={isPlaying}
						handlePlay={() => setIsPlaying(!isPlaying)}
						handleNavigate={handleNavigate}
						handleStop={handleStop}
					/>

					<div className={styles.playlist}>
						<PlayListBox playlist={playlist} />
					</div>
				</div>
			</div>
		</div>
    );
};


/***** EXPORTS *****/
export default App;
