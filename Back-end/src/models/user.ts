
export interface IUser {
    name: string;
    mail: string;
    password: string;
    id?: number;
    lastname?: string;
}

export class User {
    constructor(
        public name: string,
        public mail: string,
        public password: string,
        public id?: number,
        public lastname?: string
    ) {}
}