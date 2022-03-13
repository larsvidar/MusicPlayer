/***** IMPORTS *****/
import {FC} from 'react';
import styles from './MenuButton.module.scss';


/***** TYPES *****/
interface IMenuButtonProps {
	onMenuClick: any,
}


/***** COMPONENT-FUNCTION *****/
const MenuButton: FC<IMenuButtonProps> = ({onMenuClick}) => {
    
	/*** Return-statement ***/
	return(
		<div className={styles.MenuButton}>
			<i className={styles.bars + ' fa fa-bars'} onClick={onMenuClick} />
		</div>
    );
}

export default MenuButton;
  