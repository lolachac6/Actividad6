export interface IResult {
    _id:        string;
    id:         number;
    first_name: string;
    last_name:  string;
    username:   string;
    email:      string;
    image:      string;
    password:   Password;
}
    export enum Password {
        User12345 = "user12345",
    }


