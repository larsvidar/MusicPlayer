import {IChapter, ICourse, ILesson} from 'types/ICourse';
import {genObject, IFile} from 'types/IGeneral';

export interface IReview {
    createdAt?: string,
    displayName?: string,
    id?: string,
    title?: string,
    text?: string,
    rating: number,
    userThumbnail?: IFile,
    course?: string,
    error?: any,
    author: any,
    oldThumbnail: any,
	metauser?: string,
}

export interface IQuestion {
    id: string,
    createdAt: string,
    updatedAt: string,
    title?: string,
    text: string,
    displayName: string,
    userThumbnail?: IFile,
    question: string,
    error?: any,
    metauser?: genObject,
    isNew?: boolean,
    course?: ICourse,
    isEdited?: boolean,
    isDeleted?: boolean,
    collection: string,
    isFollowing?: boolean,
    isArchived?: boolean,
    type: string,
    chapter?: IChapter,
    lesson: ILesson,
	likes: string[],
	answers?: IQuestion[],
}