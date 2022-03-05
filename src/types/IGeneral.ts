/***** IMPORTS *****/
import {Dispatch, ReactNode, SetStateAction, SyntheticEvent} from 'react';


/***** INTERFACES *****/
export interface IBaseProps {
    className?: string,
    tabIndex?: number,
    onClick?: FGenFunc,
    onChange?: FGenFunc,
    onTouchStart?: FGenFunc,
    onTouchEnd?: FGenFunc,
    onTouchMove?: FGenFunc,
    children?: ReactNode,
    onSubmit?: FGenFunc,
}

export interface IDangerousHtml {
    __html: string,
}


/***** TYPES *****/

//Generic object-type.
export type genObject = {
    [key: string]: any | string
};
export type FToggle = (toggle: boolean) => void;
export type FEmpty = () => void;
export type FEventHandler<T = void> = (event: SyntheticEvent) => T
export interface FSetLocalState<T> {
    (value: T): Dispatch<SetStateAction<T>> | void
}
export type TTimeOut = ReturnType<typeof setTimeout>;
export type TInterval = ReturnType<typeof setInterval>;
export type FSingleVoid<T> = (param: T) => void;
export type FNoParam<T> = () => T;
export type FGenFunc<T = any> = (...params: any[]) => T;
export type TRestProps = {[key: string]: any};
export type FAllVoid = (...params: []) => void;

export interface ISong {
	id: string,
	songTitle: string,
	artist: string,
	duration: number,
	url: string,
};

export interface IPlayState {
	isPlaying: boolean,
	progress: number,
	duration: number,
	currentTime: number,
}
