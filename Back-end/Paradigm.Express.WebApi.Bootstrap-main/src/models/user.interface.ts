
export interface IUser {
    id: number;
    name: string;
    lastName: string;
    alias?: string;
    mail: string;
    password: string;
    userType: number;
    active: number;
    role: number;
}