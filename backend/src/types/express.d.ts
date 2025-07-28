import { Request } from "express";
import { UserRole } from "../models/User";

interface AuthUser{
    id:string;
    email:string;
    role:UserRole;
}

declare global{
    namespace Express{
        interface Request{
            user?:AuthUser;
        }
    }
}