import { IResult } from "./iresult.interfaces";

export interface IUser {
    
        page:        number;
        per_page:    number;
        total:       number;
        total_pages: number;
        results:    IResult[];
    }
    
