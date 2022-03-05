/***** INTERFACES *****/
import {IFile} from 'types/IGeneral';

export interface IBlogPost {
    id: string,
    title: string,
    publish: boolean,
    createdAt: string,
    updatedAt: string,
    lead: string,
    body: string,
    author: string,
    authorDescription?: string,
    authorThumbnail?: IFile,
    authorCompany?: string,
    images: IFile[],
    tags: string[],
    time: number,
    slug: string,
    collection: string, //'blogs
    isLoading?: boolean,
}
