import { Router } from "express";
import { getAllUsers, getById, saveUser } from "../controllers/users";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getById)
router.post("/users", saveUser);


export default router;