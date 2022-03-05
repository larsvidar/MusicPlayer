/***** IMPORTS *****/
import {ICompany} from 'types/ICompany';
import {FEmpty, genObject, ICollection, IFile, IGroup, TEmailSettings} from 'types/IGeneral';
import {ICard, IProgress} from 'types/IUser';
import {IQuestion, IReview} from 'types/IUserPosts';


/***** USERCONTEXT-TYPES *****/
export type TRole = 'none' | 'registered' | 'member' | 'instructor' | 'administrator';
export type FSetSubscription = (data: ISubscription) => void;
export type FLoginFunction = (user: string, password: string, redirectUrl?: string) => Promise<boolean>
export type FIsAuthenticated = (role?: TRole) => boolean;

export interface IUserActions {
    setUserState: any,
    setSubscription: FSetSubscription,
    login: FLoginFunction,
    logout(forwardLink?: string): void,
    isAuthenticated: FIsAuthenticated,
    refreshUser: (mode?: 'shallow' | 'deep') => Promise<IUser>,
    resetUser: FEmpty,
}

export interface IUserContext {
    userState: IUser,
    userActions: IUserActions,
}

export interface IStripeSubscription {
	username: string,
	stripeId: string,
	cycle: string,
    scheduled: genObject,
    lastAmount: number,
    startDate: number,
    licenses: number,
    status: string,
    nextPeriod: number,
    id: string,
	subscription?: string,
    canceled: boolean,
    amountDue: number,
	verifyUrl?: string,
	intentId?: string,
	message?: string,
}

export interface ISubscription extends ICollection {
    username: string,
    stripeId: string,
    defaultCard: string,
    status: string,
    totalLicenses: number,
    created: string,
	cards: Array<ICard>,
	subscriptions: IStripeSubscription[],
    user?: string,
	company?: string,
}

//Interface for user-data.
export interface IUser {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    title: string,
    displayName: string,
    email: string,
    publicId: string,
    description: string,
    role: genObject,
    userThumbnail: IFile,
    street: string,
    zipcode: string,
    city: string,
    company?: ICompany,
    progress: IProgress,
    emailSettings: Array<TEmailSettings>,
    privacySettings: Array<string>,
    subscription: ISubscription,
    groups: IGroup[],
    status?: string,
    license?: genObject,
    error?: any,
    created: string,
    updated: string
    hasOldId?: boolean
    isMigrated?: boolean,
    hasConvertedSpaces?: boolean,
    questions?: IQuestion[],
    reviews?: IReview[],
    headline?: string,
    coverImage: IFile,
    followedQuestions: IQuestion[],
    archivedQuestions: IQuestion[],
    hasCompanyLicense?: boolean,
    hasStripeId?: boolean,
    freeAccessUntil: string,
	isFreeUser?: boolean
}