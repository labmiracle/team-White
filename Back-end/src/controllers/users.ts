import { Request, Response } from "express";
import { getUsers, getUser, save } from "./../services/users";
import { User } from "../models/user";

export const getAllUsers = (req: Request, res: Response) => {
    res.json(getUsers);
}

export const getById = (req: Request, res: Response) => {
    res.json(getUser(Number(req.params.id)));
}

export const saveUser = (req: Request, res: Response) => {
    const user = new User(req.body.name, req.body.mail, req.body.password);
    save(user);
    res.send("Saving user");
}