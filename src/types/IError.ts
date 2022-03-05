export default interface IError {
    error: any,
}

export interface IPageError {
    msg: Event | string, 
    url?: string, 
    lineNmb?: number, 
    colNmb?: number, 
    error?: Error
} 