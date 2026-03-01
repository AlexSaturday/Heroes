import { Router } from "express";
import { createSession } from "../controllers/session.controllers";
import { joinSession } from "../controllers/session.controllers";
import { getSessionUsers } from "../controllers/session.controllers";
import { getAllSessions } from "../controllers/session.controllers";
import { startSession } from "../controllers/session.controllers";


const router = Router();

router.post("/", createSession);
router.post("/:id/join", joinSession);
router.get("/:id/users", getSessionUsers);
router.get("/", getAllSessions);
router.post("/:id/start", startSession);

export default router;