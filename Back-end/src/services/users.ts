import { IUser } from "../models/user";

let users: IUser [] = [];
let ids = 0;

export const getUsers = () => {
    return users;
}

export const getUser = (id: number) => {
    return users.find(user => {
        return id === user.id;
    });
}

export const save = (user: IUser) => {
    user.id = ids++;
    users.push(user);
    console.log(users);
}

