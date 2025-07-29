import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateRegister = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("role").isIn(["member", "admin"]).withMessage("Role must be either 'member' or 'admin'").optional(), // role can be optional and defaults to member
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err=>({msg:err.msg,field:err.path})) });
        }
        next();
    }
];

export const validateLogin = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"), // Added notEmpty for password
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err=>({msg:err.msg,path:err.path})) });
        }
        next();
    }
];