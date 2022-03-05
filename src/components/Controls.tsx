/***** IMPORTS *****/
import {FC} from "react";


/**** TYPES ****/
interface IControlsProps {
	onBack: any,
	onPlay: any,
	onPause: any,
	onForward: any,
	onStop: any,
	playStyle: object,
	pauseStyle: object,
}


/***** COMPONENT-FUNCTION *****/
const Controls: FC<IControlsProps> = ({	
	onBack,
	onPlay,
	onPause,
	onForward,
	onStop,
	playStyle,
	pauseStyle,
}) => {

	/*** Return-statement ***/
	return (
		<div className="buttons">
			<i className="button fa fa-step-backward" onClick={() => onBack(-1)} />
			<i className="button fa fa-play" onClick={() => onPlay()} style={playStyle} />
			<i className="button fa fa-pause" onClick={onPause} style={pauseStyle} />
			<i className="button fa fa-stop" onClick={onStop} />
			<i className="button fa fa-step-forward" onClick={() => onForward(1)} />
		</div>
	);
}


/***** EXPORTS *****/
export default Controls;
