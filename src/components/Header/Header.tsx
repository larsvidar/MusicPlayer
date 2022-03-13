/***** IMPORTS *****/
import {FC} from 'react';
import {FSetLocalState} from 'types/IGeneral';
import styles from './Header.module.scss'
import MenuButton from './MenuButton/MenuButton';


/***** TYPES *****/
interface IHeaderProps {
	title: string,
	handleShowMenu: FSetLocalState<boolean>
};


/***** COMPONENT-FUNCTION *****/
export const Header: FC<IHeaderProps> = ({title, handleShowMenu}) => {
	
	/*** Return-statement ***/
	return (
		<div className={styles.Header}>
			<h1>{title}</h1>
			<MenuButton onMenuClick={handleShowMenu} />
		</div>
	);
}


/***** EXPORTS *****/
export default Header;
