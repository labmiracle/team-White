import { Request, Response } from "express";
import { getUsers, getUser, save } from "./../services/users";
import { User } from "../models/user";

export const getAllUsers = (req: Request, res: Response) => {
    res.json(getUsers());
}

export const getById = (req: Request, res: Response) => {
    const user = getUser(Number(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
}

export const saveUser = (req: Request, res: Response) => {
    const { name, mail, password } = req.body;

    if (!name) {
        res.status(400).send("Name is required");
    } else if (!mail) {
        res.status(400).send("Mail is required");
    } else if (!password) {
        res.status(400).send("Password is required");
    } else {
        const user = new User(name, mail, password);
        save(user);
        res.status(201).send("Saving user");
    }
}