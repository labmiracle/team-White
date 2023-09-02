
export interface IUser {
    id: number;
    name: string;
    lastName: string;
    alias?: string;
    mail: string;
    password: string;
    userType: string;
    active: number;
}