/***** IMPORTS *****/
import {ISubscription, IUser} from './contexts/IUserContext';
import {ICompany} from './ICompany';
import {ICollection, genObject, IFile, IScore, FSetLocalState} from 'types/IGeneral';
import {ICourse, ITrack} from './ICourse';


/***** INTERFACES *****/

// Interface for user-data when registering new user.
export interface INewUser {
    username: string,
    email: string,
    password: string,
}

export type TCourseStatus = 'not started' | 'active' | 'completed' | 'archived'

export interface IProgressScore {
    collection: string,
    type: string,
    id: string,
    username: string,
    parent: string,
    totalSubScore: number,
    course?: string,
    track?: string,
    progress: string,
    status: TCourseStatus,
    finished: number,
    numberOfItems: number,
    watchedItems: number,
    certificate: string,
    category: string,
    chapters: IProgressChapter[],
    created: string,
    updated: string,
}

//Interface for course-data on IProgress.
export interface IProgressCourse {
    id: string,
    status: TCourseStatus,
    numberOfLessons: number,
    watchedLessons: number,
    started: number,
    updated: number,
    category: string,
    chapters: Array<IProgressChapter>,
    finished?: number,
    certificate?: string,
    score?: genObject,
}


export interface IProgressChapter {
    chapterNumber: number,
    lessons: Array<IProgressLesson>
}

export interface IProgressLesson {
    lessonNumber: number,
    finished?: number,
    score?: number,
    videoProgress?: number
}

//Interface for track-object on Progress.
export interface IProgressTrack {
    id?: string,
    status: string,
    started: number,
    updated: number,
    numberOfCourses: number,
    completedCourses: number,
    numberOfLessons: number,
    completedLessons: number,
    finished?: number,
    certificate?: string,
    score: number,
}


export type IProgressTracksObject = {score?: genObject[]} & {[key: string]: IProgressTrack};


//Interface for progress-data.
export interface IProgress extends ICollection {
    collection: string,
    username: string,
    displayName: string,
    thumbnail: IFile,
    totalScore: number,
    createdAt: string,
    updatedAt: string,
	scores: IScore[],
	courses: ICourse[],
    tracks: ITrack[],
}

export interface ICard {
    id: string,
    last4: string,
    brand: string,
    fingerprint: string,
    default: boolean,
    expMonth: string,
    expYear: number,
    expired: boolean,
}


export interface IEntity extends ICompany, IUser {}
export interface IEntityActions {
	setEntity: (entity: ICompany | IUser, replace?: boolean) => void,
	setSubscription: FSetLocalState<ISubscription>,
	refreshEntity: () => Promise<ICompany | IUser>,
}
