import { Response, Request  } from "express";
import * as sessionService from "../services/session.service";

export const createSession = async (req: Request, res: Response) => {
    try {
        const { maxUsers } = req.body;

        const session = await sessionService.createSession(maxUsers);
        res.json(session)
    } catch(error: any){
        res.status(500).json({ error: "Failed to create session", message: error.message });
    }
        
}

export const joinSession = async (req: Request, res: Response) => {
    try {
        const sessionId = Number(req.params.id);
        const { name } = req.body;

        const user = await sessionService.joinSession(sessionId, name);

        res.json(user);
    } catch(error: any){
        res.status(400).json({ error: "Failed to join session", message: error.message });
    }
}

export const getSessionUsers = async (req: Request, res: Response) => {
    try {
        const sessionId = Number(req.params.id);

        const users = await sessionService.getSessionUsers(sessionId);

        res.json(users);
    } catch(error: any){
        res.status(500).json({ error: "Failed to get users", message: error.message });
    }
}

export const getAllSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await sessionService.getAllSessions();

        res.json(sessions);
    } catch(error: any){
        res.status(500).json({ error: "Failed to get sessions", message: error.message });
    }
}

export const startSession = async (req: Request, res: Response) => {
    try {
        const sessionId = Number(req.params.id);

        const session = await sessionService.startSession(sessionId);

        res.json(session);
    } catch(error: any){
        res.status(400).json({ error: "Failed to start session", message: error.message });
    }
}