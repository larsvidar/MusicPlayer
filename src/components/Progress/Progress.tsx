/***** IMPORTS *****/
import {FC} from 'react';
import {IPlayState} from 'types/IGeneral';
import {toMinutes} from 'utils/actions';
import styles from './Progress.module.scss';


/**** TYPES *****/
interface IProgressProps {
	playState: IPlayState,
}


/***** COMPONENT-FUNCTION *****/
const Progress: FC<IProgressProps> = ({playState}) => {
	
	/*** Variables ***/
	//Style for making the progress-meter fill up.
	const lineStyle = {width: (playState.progress || 1) + "%"};
	const passedMinutes = toMinutes(playState.currentTime);
	const duration = toMinutes(playState.duration);

	/*** Return-statement ***/
	return (
		<div className={styles.Progress}>
			<div className={styles.time}>
				<p>{passedMinutes}</p>
				<div className={styles.progressMeter}>
					<div className={styles.progress} style={lineStyle} />
				</div>
				<p>{duration}</p>
			</div>
		</div>
	);
}
  

/***** EXPORTS *****/
export default Progress;