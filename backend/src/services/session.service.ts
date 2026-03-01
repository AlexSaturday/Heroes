import { prisma } from "../prisma"
import crypto from "crypto";
import {session_status} from "@prisma/client";

export const createSession = async (maxUsers?: number) => {
    return await prisma.session.create({
        data: {
            maxUsersCount: maxUsers || 2,
            status: session_status.waiting
        }
    });
}

export const joinSession = async (sessionId: number, name: string) => {
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { users: true }
    });

    if (!session){
        throw new Error("Session not found");
    }

    if (session.status !== session_status.waiting){
        throw new Error("Session is not open for joining");
    }

    if (session.users.length >= session.maxUsersCount && session.maxUsersCount >= 4){
        throw new Error("Session is full");
    }

    const role = session.users.length === 0 ? "admin" : "player";

    const token = crypto.randomBytes(16).toString("hex");

    const user = await prisma.session_user.create({
        data: {
            sessionId,
            name,
            role,
            tokenHash: token,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60)
        }
    });

    return user;
}

export const getSessionUsers = async (sessionId: number) => {
    const users =  await prisma.session_user.findMany(
        {where:{
            sessionId
        }}
    );
    return users;
}

export const getAllSessions = async () => {
    const sessions = await prisma.session.findMany();
    return sessions;
}

export const startSession = async (sessionId: number) => {
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { users: true }
    });

    if (!session) {
        throw new Error("Session not found");
    }

    if (session.status !== session_status.waiting) {
        throw new Error("Session is not open for starting");
    }

    if (session.users.length < 2) {
        throw new Error("Not enough users to start the session");
    }

    return await prisma.session.update({
        where: { id: sessionId },
        data: { status: session_status.game }
    });
}