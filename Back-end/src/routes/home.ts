import { Router } from "express";
import { getHome } from "../controllers/home";

const router = Router();

router.get("/", getHome);

export default router;