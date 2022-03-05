/***** IMPORTS ******/
import {IProgress} from 'types/IUser';
import {genObject} from 'types/IGeneral';
import {ICompany} from 'types/ICompany';
import {ITrack} from 'types/ICourse';
import {ISubscription, IUser} from './contexts/IUserContext';


/***** INTERFACES *****/

export interface ITiers {amount: number, upto: number}
export interface IPricing {year: ITiers[], month: ITiers[], free: ITiers[]}

export interface IHandleLoader {
    isActive(showId?: string): boolean,
    get(): string[],
    set(showId: string): void,
    clear(showId: string): void,
    clearAll(): void,
}

//Interface for global state
export default interface IState {
    userInfo: IUser,
    hasError: boolean,
    messages: genObject,
    showPopup: boolean,
    currentPage: any,
    showLoader: string[],
    tracks: Array<ITrack>,
    abortControllers: {[x: string]: AbortController},
    pricing: IPricing,
//eslint-disable-next-line
}


//Interface for provider-methods
export interface IActions {
    setUserInfo(value: IUser | null, replace?: boolean): void,
    setRole(role: string | string[]): void,
    setProgress(progressData: IProgress): void,
    setMessage(message: string | number | null, nonExpire?: boolean): void,
    setCurrentPage(value: string): void,
    setCompany(data: ICompany): void,
    setCompanySubscription(data: ISubscription): void,
    setShowPopup(value: boolean): void,
    handleLoader: IHandleLoader,
    setSubscription(data: genObject): void,
    getTracks(): Promise<ITrack[]>,
    login(username: string, password: string): Promise<IUser | Error>,
    logout(): void,
    checkLogin(...options: string[]): Promise<boolean>,
    checkFreeUserLogin(): Promise<boolean>
    updateSubscription(subscriptionId: string, data: genObject): Promise<ISubscription>,
    isAuthenticated: FIsAuthenticated,
    setPricing(pricing: IPricing): void,
}


//Interface for context.
export interface IContext {
    state: IState,
    actions: IActions,
}

interface IPricingTier {
    amount: number, 
    upto: number 
}

export interface IRoles {
    administrator: string
    authenticated: string
    free: string
    instructor: string
    member: string
    public: string
    registered: string
}
export interface IConfigValues {
    version: string,
    abortController?(): AbortController,
    activeStatuses: string[],
    created: Date,
    disabledFeatures: string[],
    expire: number,
    googleTagId: string,
    host: {
        apiUrl: string, 
        clientUrl: string,
        reportUrl: string,
    },
    isClient: boolean,
    lang: string,
    mode: string,
    pricing: {
        month: IPricingTier[], 
        year: IPricingTier[], 
        free: IPricingTier[], 
    },
    roles: IRoles,
    stripe: {
        key: string, 
        maxAmount: number,
    },
    window: Window,
}

//Types
export type FIsAuthenticated = (role: 'none' | 'registered' | 'member' | 'instructor' | 'administrator') => boolean;
