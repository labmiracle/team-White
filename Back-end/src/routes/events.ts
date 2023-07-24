import { Router } from "express";
import { getAllEvents } from "../controllers/events";

const router = Router();

router.get("/events", getAllEvents);

export default router;