/***** IMPORTS *****/
import {Dispatch, ReactNode, SetStateAction, SyntheticEvent} from 'react';
import {IProgressChapter} from './IUser';


/***** INTERFACES *****/
export interface ICollection  {
    collection: string,
    id: string,
    title: string,
    isLoading?: boolean,
	isFetched?: boolean,
}


export interface IFile {
    collection?: string,
    id: string,
    url: string,
    fullUrl: string,
    name?: string,
    sha256?: string,
    hash?: string,
    ext?: string,
    mime?: string,
    size?: number,
    provider?: string,
    related?: genObject, //{_id, ref, kind, field,}
    created?: string,
    updated?: string,
    caption?: string,
    wpUrl?: string,
}


export type IScoreDestination = 'active' | 'archived' | 'completed';

export interface IScoreCourseData {
	chapterNumber: number,
	lessons: [
		{
			lessonId: string,
			lessonNumber: number,
			finished: number,
			score: number,
			videoLength: number,
		},
	]
}

export interface IScoreTrackData {
	id: string,
	title: string,
	finished: number,
	score: number,
	progress: number,
}

export interface IScore {
    id: string,
    user: string,
    thumbnail: string,
    score: number,
    lastScore: string,
    bookmarked: boolean,
    updatedAt: string,
    watchedItems: number,
    numberOfItems: number,
    category: string,
    chapters: IProgressChapter[],
    course: string,
    createdAt: string,
    parent: string,
    progress: string,
    status: IScoreDestination,
    totalSubScore: number,
    username: string,
    certificate?: string,
}

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

export interface IFetchOptions {
    fields?: Array<string>,
    quantity?: number,
    page?: number,
    start?: number,
    sort?: Array<string> //['createdAt', 'asc'],
    abort?: AbortSignal,
    origin?: string,
    mode?: 'same-origin' | 'no-cors' | 'cors' | 'navigate',
    isSilent?: boolean,
    returnType?: 'json' | 'blob' | 'text' | 'document',
    method?: 'post' | 'get' | 'put' | 'delete';
    signal?: AbortSignal, 
    contentType?: string,
    body?: any,
    headers?: genObject,
    authOnly?: boolean, //If true, no requests are sent unless jwt is present.
	auth?: string,
	keepalive?: boolean,
}


export interface IMailOptions {
    type: 'contact' | 'offer'
    toMail?: string,
    subject?: string,
    fromMail?: string,
    replyTo?: string,
    message?: string,
    data?: genObject,
    origin?: string,
}


/***** TYPES *****/

//Generic object-type.
export type genObject = {
    [key: string]: any | string
};

export type IItem = 'search' | undefined;

export type IPageAccess = 
    'none' | 
    'registered' | 
    'member' |  
    'instructor' | 
    'administrator' |
    'companyUser' |
    'companyAdmin'
;

export type ICompanyUserRole = 
    'none' |
    'invitedUser' | 
    'passiveUser' | 
    'activeUser' |  
    'passiveAdmin' | 
    'activeAdmin'
;

export type TEmailSettings =
    'newsletter' | 
    'certificate' | 
    'questions' | 
    'messages'
;

export type TChecked = [string, Function];

export interface IDangerousHtml {
    __html: string,
}

export type FToggle = (toggle: boolean) => void;
export type FEmpty = () => void;
export type FEventHandler<T = void> = (event: SyntheticEvent) => T
export interface FSetLocalState<T> {
    (value: T): Dispatch<SetStateAction<T>> | void
}

export type TCycle = 'year' | 'month' | 'free';
export interface IHtml {__html: string}


export type TTimeOut = ReturnType<typeof setTimeout>;
export type TInterval = ReturnType<typeof setInterval>;
export interface IGroup {
	title: string,
}
export type FSingleVoid<T> = (param: T) => void;
export type FNoParam<T> = () => T;
export type FGenFunc<T = any> = (...params: any[]) => T;
export type TRestProps = {[key: string]: any};
export type FAllVoid = (...params: []) => void;
