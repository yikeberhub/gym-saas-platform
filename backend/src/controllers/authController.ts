import { Request, Response } from "express";
import { UserService } from "../services/userService";
import jwt  from "jsonwebtoken";


const userService = new UserService(); // Instantiate your service

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = await userService.registerUser(name, email, password, role);
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
    res.status(201).json({ message: "User registered successfully", token, user: newUser });
  } catch (error: any) {
    if (error.message.includes("User already exists")) {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await userService.loginUser(email, password);
    res.json({ message: "Logged in successfully", token, user });
  } catch (error: any) {
    if (error.message.includes("Invalid credentials")) {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const userProfile = await userService.findUserById(req.user.id);
    res.json(userProfile);
  } catch (error: any) {
    if (error.message.includes("User not found")) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};