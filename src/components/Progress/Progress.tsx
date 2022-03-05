/***** IMPORTS *****/
import {FC} from 'react';
import styles from './Progress.module.scss';


/**** TYPES *****/
interface IProgressProps {
	timePassed: number,
	timeLength: number,
	progressStyle: number,
}


/***** COMPONENT-FUNCTION *****/
const Progress: FC<IProgressProps> = ({timePassed, timeLength, progressStyle}) => {
	
	/*** Variables ***/
	//Style for making the progress-meter fill up.
	let lineStyle = {width: progressStyle + "%"};
	//Finds how many minutes has passed.
	let passedMinutes = Math.floor(timePassed / 60);
	//Finds the seconds, and add a zero if the number is below 10.
	let passedSeconds = (timePassed % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
	let lengthMinutes = 0;
	let lengthSeconds = (0).toLocaleString(undefined, {minimumIntegerDigits: 2});
	//Finds how many minutes the song is, sets zero if no song is loaded.
	if (timeLength > 0) {lengthMinutes = Math.floor(timeLength / 60);}
	//Finds the seconds, and add a zero if the number is below 10. Sets zero if no song is loaded.
	if (!isNaN(timeLength)) {lengthSeconds = (timeLength % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});}

	return (
		<div className={styles.Progress}>
			<div className={styles.time}>
				<p>{passedMinutes}:{passedSeconds}</p>
				<p>{lengthMinutes}:{lengthSeconds}</p>
			</div>
			<div className={styles.progressMeter}>
				<div className={styles.progress} style={lineStyle}>
				</div>
			</div>
		</div>
	);
}
  

/***** EXPORTS *****/
export default Progress;