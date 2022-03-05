/***** IMPORTS *****/
import {ICompany, ICompanyActions} from 'types/ICompany';
import {FGenFunc} from 'types/IGeneral';
import {IConfigValues} from 'types/IHandlerState';


/***** SITESTATE-TYPES *****/
export type FSetMessage = (message: string | number | null, nonExpire?: boolean) => void;
export type FSetConfig = (data: IConfigValues) => void;
export type FSetConfirmation = (confirmation: FGenFunc | string, params?: any[]) => void;
export type FShowLoginPopups = (show?: boolean | string) => void;

export interface IConfigActions {
    setConfig: FSetConfig,
}

export interface IMessage {
    [x: number]: string
}


export interface IHandleLoader {
    isActive(showId?: string): boolean,
    get(): string[],
    set(showId: string): void,
    clear(showId: string): void,
    clearAll(): void,
}


export interface IConfigContext {
    configValues: IConfigValues,
    configActions: IConfigActions,
}


export interface ICompanyContext {
    company: ICompany,
    companyStateActions: ICompanyActions,
}
