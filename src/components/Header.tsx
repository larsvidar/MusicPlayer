/***** IMPORTS *****/
import {FC} from 'react';


/***** TYPES *****/
interface IHeaderProps {
	title: string,
};


/***** COMPONENT-FUNCTION *****/
export const Header: FC<IHeaderProps> = ({title}) => {
	
	/*** Return-statement ***/
	return (
		<div className="header">
			<h1>{title}</h1>
		</div>
	);
}


/***** EXPORTS *****/
export default Header;
