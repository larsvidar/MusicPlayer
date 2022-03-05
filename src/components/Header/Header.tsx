/***** IMPORTS *****/
import {FC} from 'react';
import styles from './Header.module.scss'


/***** TYPES *****/
interface IHeaderProps {
	title: string,
};


/***** COMPONENT-FUNCTION *****/
export const Header: FC<IHeaderProps> = ({title}) => {
	
	/*** Return-statement ***/
	return (
		<div className={styles.Header}>
			<h1>{title}</h1>
		</div>
	);
}


/***** EXPORTS *****/
export default Header;
