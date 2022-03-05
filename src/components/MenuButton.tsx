/***** IMPORTS *****/
import {FC} from "react";


/***** TYPES *****/
interface IMenuButtonProps {
	onMenuClick: any,
}


/***** COMPONENT-FUNCTION *****/
const MenuButton: FC<IMenuButtonProps> = ({onMenuClick}) => {
    
	/*** Return-statement ***/
	return(
      <i className="fa fa-bars" onClick={onMenuClick} />
    );
}

export default MenuButton;
  