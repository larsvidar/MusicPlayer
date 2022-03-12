import {IPlayState, ISong} from "types/IGeneral";
import {jsonParse} from "./actions";


/**
 * Function for adding duration to an ISong.
 * @param songsArray Array of song-objects.
 * @returns Promise that resolves to array of ISong with duration.
 */
export const setAudioDurations = async (songsArray: ISong[]) => {
	const newSongsArray = [] as Promise<ISong>[];
	for(const song of songsArray) {
		const tempAudio = new Audio();
		tempAudio.src = song.url;
		tempAudio.load();
		const newSong = new Promise<ISong>((resolve) => {
			tempAudio.onloadedmetadata = () => {
				song.duration = Math.floor(tempAudio.duration);
				resolve(song);
			}
		});
		newSongsArray.push(newSong);
	}
	const resolved = await Promise.all(newSongsArray);
	return resolved;
}


/**
 * Takes an audio-element and calculates isPlaying, duration, current time and progress (% played).
 */
export const calculatePlayState = (audio: HTMLAudioElement) => {
	const result = {} as IPlayState;
	result.isPlaying = !audio.paused;
	result.duration = Math.floor(audio.duration || 0);
	result.currentTime = Math.floor(audio.currentTime || 0);
	const progress = ((100 / result.duration) * result.currentTime) || 0;
	result.progress = Math.floor(progress);
	return result;
}


/**
 * Fetches playlist from localStorage, adds song, and writes it back to localStorage.
 * @Return Returns the updated playlist
 */
export const addToLocalStorage = async (song: ISong | ISong[]) => {
	if(!Array.isArray(song)) song = [song];
	const newSongs = await setAudioDurations(song);
	const savedPlaylist: ISong[] = jsonParse(localStorage.playlist);
	const newPlaylist = [...(savedPlaylist || []), ...newSongs];
	localStorage.playlist = JSON.stringify(newPlaylist);
	return newPlaylist;
}


/**
 * Fetches playlist from localStorage, removes song, and writes it back.
 * @param song THe song object to be added.
 */
export const removeFromLocalStorage = async (songId: string) => {
	const savedPlaylist: ISong[] = jsonParse(localStorage.playlist);
	const newPlaylist = savedPlaylist.filter((song) => song.id !== songId);
	localStorage.playlist = JSON.stringify(newPlaylist);
	return newPlaylist;
}


export const songProtocolCheck = (song: ISong) => {
	const siteProtocol = getSiteProtocol();
	const songProtocol = song.url?.substring(0, 5);
	const cantFetch = siteProtocol === 'https' && songProtocol === 'http:';
	if(cantFetch) return Error(
		`Can't add songs from ${songProtocol}-sources. Only ${siteProtocol}-sources are supported.`
	)
	return {songProtocol, siteProtocol, canFetch: !cantFetch};
}

export const getSiteProtocol = (): 'http' | 'https' => {
	const host = typeof origin === 'undefined' ? '' : origin;
	const siteProtocol = host?.substring(0, 5) as 'http:' | 'https';
	if(siteProtocol === 'http:') return 'http';
	return siteProtocol;
}
