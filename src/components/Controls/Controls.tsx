/***** IMPORTS *****/
import {FC} from 'react';
import {FEmpty} from 'types/IGeneral';
import styles from './Controls.module.scss';


/**** TYPES ****/
interface IControlsProps {
	handlePlay: FEmpty,
	handleNavigate: (factor?: number) => void,
	handleStop: FEmpty,
}


/***** COMPONENT-FUNCTION *****/
const Controls: FC<IControlsProps> = ({handlePlay, handleNavigate, handleStop}) => {

	/*** Return-statement ***/
	return (
		<div className={styles.Controls}>
			<i className={styles.button + ' fa fa-step-backward'} onClick={() => handleNavigate(-1)} />
			<i className={styles.button + ' fa fa-play'} onClick={handlePlay} />
			<i className={styles.button + ' fa fa-pause'} onClick={handlePlay} />
			<i className={styles.button + ' fa fa-stop'} onClick={handleStop} />
			<i className={styles.button + ' fa fa-step-forward'} onClick={() => handleNavigate()} />
		</div>
	);
}


/***** EXPORTS *****/
export default Controls;
