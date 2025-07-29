import {Router} from "express";
import {
    register,
    login,
    getProfile,
} from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { validateLogin, validateRegister } from "../validators/authValidator";

import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/register",validateRegister,validateRequest,register);
router.post("/login",validateLogin,validateRequest,login);
router.get("/me",authMiddleware,getProfile);

export default router;
