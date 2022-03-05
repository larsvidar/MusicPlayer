/***** IMPORTS *****/
import {FC} from "react";
import {FEmpty} from "types/IGeneral";


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
		<div className="buttons">
			<i className="button fa fa-step-backward" onClick={() => handleNavigate(-1)} />
			<i className="button fa fa-play" onClick={handlePlay} />
			<i className="button fa fa-pause" onClick={handlePlay} />
			<i className="button fa fa-stop" onClick={handleStop} />
			<i className="button fa fa-step-forward" onClick={() => handleNavigate()} />
		</div>
	);
}


/***** EXPORTS *****/
export default Controls;
