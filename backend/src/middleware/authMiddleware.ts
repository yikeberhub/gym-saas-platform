import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/User";

interface JwtPayload {
    id: string;
    email: string;
    role: UserRole;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace("Bearer ", "").trim();

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification error:", err); // Log the error for debugging
        return res.status(401).json({ message: "Token is not valid" });
    }
};