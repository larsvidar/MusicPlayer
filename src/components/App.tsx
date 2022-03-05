/***** IMPORTS *****/
import Header from 'components/Header/Header';
import MenuButton from 'components/MenuButton/MenuButton';
import AddSongForm from 'components/AddSongForm/AddSongForm';
import DisplaySong from 'components/DisplaySong/DisplaySong';
import Progress from 'components/Progress/Progress';
import Controls from 'components/Controls/Controls';
import PlayListBox from 'components/Playlist/PlayList';
import {useEffect, useRef, useState} from 'react';
import initialPlaylist from 'components/initialSongs.json';
import config from 'components/configData.json';
import {genUid, getTimeoutObject} from './actions';
import styles from './App.module.scss'

/***** TYPES *****/
export interface ISong {
	id: string,
	songTitle: string,
	artist: string,
	duration: number,
	url: string,
};

interface IPlayState {
	isPlaying: boolean,
	progress: number,
	duration: number,
	currentTime: number,
}

/***** COMPONENT-FUNCTION *****/
const App = () => {

	/*** Variables ***/
	const audio = useRef(new Audio());
	const timeouts = getTimeoutObject();

	/*** State ***/
	const [playlist, setPlaylist] = useState(initialPlaylist as unknown as ISong[]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playState, setNativePlayState] = useState<IPlayState>({
		isPlaying: false,
		progress: 0,
		duration: 0,
		currentTime: 0,
	});
	const [showMenu, setShowMenu] = useState(false);
	const [song, setSong] = useState(playlist[0]);


	/*** Effects ***/

	//Cleanup
	useEffect(() => {
		// Clears interval if unmounted
		return () => {
			timeouts.clearAll();
		}
	}, []);

	//Makes sure the song-timer updates regularly.
	useEffect(() => {
		//const interval = setInterval(updatePlayState, 100);
		audio.current.addEventListener("ended", () => navigate(1));
	}, [audio]);

	useEffect(() => {
		audio.current.src = song.url;
		if(isPlaying) audio.current.play();
		else audio.current.pause();
	}, [song]);


	useEffect(() => {
		if(isPlaying) {
			timeouts.playing = setInterval(updatePlayState, 100);
			audio.current.play();
		} else {
			clearInterval(timeouts.playing);
			audio.current.pause();
		}
	}, [isPlaying]);


	useEffect(() => {
		  //Make a new array which includes the duration of the songs.
		  const newSongsArray = setDurations(playlist);
		  setPlaylist(newSongsArray);
	}, [playlist]);


	/*** Functions ***/

	const setDurations = (songsArray: ISong[]) => {
		for (let i = 1; i < songsArray.length; i++) {
			const tempAudio = new Audio();
			tempAudio.src = songsArray[i].url;
			tempAudio.load();
			tempAudio.onloadedmetadata = () => {
				songsArray[i].duration = Math.floor(tempAudio.duration);
			}
		}
		return songsArray;
	}

	const setPlayState = (data: IPlayState) => {
		setNativePlayState((prevPlayState) => {
			return {...prevPlayState, ...data};
		});
	}


	//Updates song timers.
	const updatePlayState = () => {
		setPlayState({
			isPlaying: !audio.current.paused,
			duration: Math.floor(audio.current.duration || 0),
			currentTime: Math.floor(audio.current.currentTime || 0),
			progress: ((100 / audio.current.duration) * audio.current.currentTime) || 0,
		});
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


	//Handles the skip forward and skip backward buttons.
	const navigate = (diff: number) => {
		audio.current.src = playlist[0].url;
	};


	//Handles the pause button.
	const onPauseButton = () => {
		setPlayState({isPlaying: false} as IPlayState);
		audio.current.pause();
	};

	
	//Handles the stop button.
	const onStopButton = () => {
		setPlayState({
			isPlaying: false,
			progress: 0,
		} as IPlayState);
			
		audio.current.pause()
		audio.current.src = '';
	};

	console.log(audio.current.src)


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
					{!!song && 
						<DisplaySong song={song} />
					}
					
					<Progress 
						timePassed={playState.progress} 
						timeLength={playState.duration} 
						progressStyle={0} 
					/>

					<Controls
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
