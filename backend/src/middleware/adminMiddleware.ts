import {Request,Response,NextFunction} from "express";
import { UserRole } from "../models/User";

export const adminMiddleware = (
    req:Request,
    res:Response,
    next:NextFunction,
)=>{
    if(req.user && req.user.role===UserRole.ADMIN){
        next();
    } else{
        res.status(403).json({message:"Access denied: Admins only"});
    }
}