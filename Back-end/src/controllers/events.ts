import { Request, Response } from "express";

export const getAllEvents = (req: Request, res: Response) => {
    res.send("Events");
}