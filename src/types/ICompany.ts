/***** IMPORTS *****/
import {FEmpty, genObject, IFile, IGroup, TEmailSettings} from 'types/IGeneral';
import {FSetSubscription, ISubscription, IUser} from './contexts/IUserContext';


/***** COMPANY INTERFACES *****/

export type ICompanyLicenseStatus = 'passive' | 'active' | 'invited' | 'declined'

export interface ICompanyLicense {
    email: string,
    invited: number,
    status: ICompanyLicenseStatus,
    id: string,
    memberSince: number,
    displayname?: string,
    expires: number,
}

//Interface for company-collection.
export interface ICompany {
    id: string,
    title: string,
    slug: string,
    headline?: string,
    description: string,
    logo: IFile,
    coverImage: IFile,
    street: string,
    zipcode: string,
    city: string,
    email: string,
    administrators: Array<string>,
    users: Array<string | IUser>,
    licenses: ICompanyLicense[],
    emailSettings: TEmailSettings[],
    billingCycle: string,
    billingLicenses: number,
    invites: Array<string>,
    groups: IGroup[],
    subscription: ISubscription,
    status?: string,
    isAdmin?: boolean,
    adminList?: ICompanyLicense[],
    hasStripeId?: boolean,

	//DB-fields
	company_user_licenses: ICompanyLicense[],
	metausers: string[],
	company_administrators: string[],
}


export interface ICompanyActions {
    setCompany: (data: ICompany, replace?: boolean) => void,
    setCompanySubscription: FSetSubscription,
    resetCompany: FEmpty,
	refreshCompany: () => Promise<ICompany>
}
