/***** IMPORTS *****/
import {ICollection, IFile, IScore} from 'types/IGeneral';
import {IReview} from 'types/IUserPosts';


/***** INTERFACES *****/

export interface IAuthor extends ICollection {
    type: string,
    thumbnail: IFile,
    company: string,
    title: string,
    courses: Array<string> 
}

export interface ICategory {
	id: string,
    title: string,
    titleCanonical: string,
    type: 'toplevelcategory' | 'category' | 'subcategory' | 'topic',
    categories: ICategory[],
    courses: ICourse[],
	tracks: ITrack[],
    parent: ICategory,
    numberOfCourses?: number,
    url?: string,
}

export interface IChapter extends ICollection {
    number: number,
    description: string,
    course: string,
    lessons: Array<ILesson>,
}

export interface ILesson extends ICollection {
    number: number,
    chapter: string,
    course: string,
    showQuestions: boolean,
    showReviews: boolean,
    video?: string,
    vimeo?: string,
    poster?: IFile,
    description?: string,
    showReviewOverview?: boolean,
    videoLength?: number,
}

export interface ILevel extends ICollection {
    level: number,
    type: string,
    courses: Array<string>,
}


export interface ICourse {
    collection: string,
    id: string,
    title: string,
	shortTitle: string,
    description: string,
	shortDescription: string,
    isFree: boolean,
	publish: boolean,
    slug: string,
    tags: Array<string>,
    totalLength: number,
    introVideoFile: string,
    introVideoYoutube: string,
    introVideoVimeo: string,
    videoBaseUrl: string,
    numberOfVideos: number,
    createdAt: string,
    updatedAt: string,
    thumbnail: IFile,
    attachments: IFile,
    author: IAuthor,
    category: ICategory,
    chapters: Array<IChapter>,
    reviews: Array<IReview>,
    participants: number,
    totalParticipants: number,
    score: IScore,
	scores?: IScore[],
    lessons?: ILesson[],
    courseMeter?: number,
    isLoading?: boolean,
    introVideoDuration?: number,
    introVideoThumbnail?: string,
	progress: number,
    topic?: string,
}

export interface ICourseResponseType {
    courses: ICourse[]
    courseCount: number
    categories?: ICategory[]
}


export interface ITrack {
    collection: string,
    id: string,
    title: string,
    description: string,
    duration: number,
    numberOfLessons: number,
    thumbnail: IFile,
    cover: IFile,
    slug: string,
    categories: Array<ICategory>,
    courses: ICourse[],
    participants: number,
    instructors: IAuthor[],
    createdAt: string,
    updatedAt: string,
    publish: boolean,
    prerequisiteTitle: string,
    prerequisiteSubtitle: string,
    estimatedTime: string,
}

export interface ITrackResponseType {
    tracks: ITrack[]
    tracksCount: number
    categories?: ICategory[]
}
