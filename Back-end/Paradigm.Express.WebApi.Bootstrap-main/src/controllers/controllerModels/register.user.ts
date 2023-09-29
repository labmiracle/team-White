
export interface RegisterUser {
    name: string;
    lastName: string;
    alias?: string;
    mail: string;
    password: string;
    userType: number;
}