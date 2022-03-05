import {IPlayState, ISong} from "types/IGeneral";


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


export const calculatePlayState = (audio: HTMLAudioElement) => {
	const result = {} as IPlayState;
	result.isPlaying = !audio.paused;
	result.duration = Math.floor(audio.duration || 0);
	result.currentTime = Math.floor(audio.currentTime || 0);
	const progress = ((100 / result.duration) * result.currentTime) || 0;
	result.progress = Math.floor(progress);
	return result;
}
