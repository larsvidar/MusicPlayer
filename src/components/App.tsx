/***** IMPORTS *****/
import Header from 'components/Header';
import MenuButton from 'components/MenuButton';
import AddSongForm from 'components/AddSongForm';
import DisplaySong from 'components/DisplaySong';
import Progress from 'components/Progress';
import Controls from 'components/Controls';
import PlayListBox from 'components/Playlist/PlayListBox';
import {useEffect, useState} from 'react';
import initialPlaylist from 'components/initialSongs.json';
import config from 'components/configData.json';
import {genUid} from './actions';

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
	const audio = new Audio();

	/*** State ***/
	const [playlist, setPlaylist] = useState(initialPlaylist as unknown as ISong[]);
	const [playState, setNativePlayState] = useState<IPlayState>({
		isPlaying: false,
		progress: 0,
		duration: 0,
		currentTime: 0,
	});
	const [showMenu, setShowMenu] = useState(false);
	const [song, setSong] = useState({} as ISong);


	/*** Effects ***/
	//Makes sure the song-timer updates regularly.
	useEffect(() => {
		const interval = setInterval(updatePlayState, 100);
		audio.addEventListener("ended", function() {
			navigate(1);
		});

		//Cleanup
		// Clears interval if unmounted
		return () => {
			clearInterval(interval);
		}
	}, [audio]);


	/*** Functions ***/
	const setPlayState = (data: IPlayState) => {
		setNativePlayState((prevPlayState) => {
			return {...prevPlayState, ...data};
		});
	}


	//Updates song timers.
	const updatePlayState = () => {
		setPlayState({
			isPlaying: !audio.paused,
			duration: Math.floor(audio.duration),
			currentTime: Math.floor(audio.currentTime),
			progress: ((100 / audio.duration) * audio.currentTime ),
		});
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
		audio.src = playlist[0].url;
	};


	//Handles the play button.
	const onPlayButton = () => {
		setPlayState({isPlaying: true} as IPlayState);
		audio.src = playlist[0].url;

		audio.play();
	}

	//Handles the pause button.
	const onPauseButton = () => {
		setPlayState({isPlaying: false} as IPlayState);
		audio.pause();
	};

	
	//Handles the stop button.
	const onStopButton = () => {
		setPlayState({
			isPlaying: false,
			progress: 0,
		} as IPlayState);
			
		audio.pause()
		audio.src = '';
	};


  	/*** Return-statement ***/
    return(
		<div className='player'>
			<Header title={config.title} />
			<MenuButton onMenuClick={() => setShowMenu(!showMenu)} />
			{showMenu &&
				<AddSongForm menuStyle={{style: 'none'}} onSongSubmit={addSong} />
			}
			
			<div className='controls'>
				{!!song && 
					<DisplaySong song={song} />
				}
				
				<Progress 
					timePassed={playState.progress} 
					timeLength={playState.duration} 
					progressStyle={0} 
				/>

				<Controls
					onBack={navigate}
					onPlay={onPlayButton}
					onPause={onPauseButton}
					onForward={navigate}
					onStop={onStopButton}
					playStyle={{style: 'none'}}
					pauseStyle={{style: 'none'}}
				/>

				<div className='playlist'>
					<PlayListBox playlist={playlist} />
				</div>
			</div>
		</div>
    );
};


/***** EXPORTS *****/
export default App;
