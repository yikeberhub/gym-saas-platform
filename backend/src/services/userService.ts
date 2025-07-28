// src/services/userService.ts
import { AppDataSource } from "../config/database";
import { User, UserRole } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async registerUser(name: string, email: string, password: string, role?: UserRole) {
    let user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new Error("User with this email already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    user = this.userRepository.create({
      name,
      email,
      password_hash,
      role: role || UserRole.MEMBER,
    });

    await this.userRepository.save(user);

    // Omit password hash when returning user object
    const { password_hash: _, ...userWithoutHash } = user;
    return userWithoutHash;
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password_hash") // Explicitly select hashed password
      .where("user.email = :email", { email })
      .getOne();

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    // Omit password hash when returning user object
    const { password_hash: _, ...userWithoutHash } = user;
    return { token, user: userWithoutHash };
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found.");
    }
    // Omit password hash when returning user object
    const { password_hash: _, ...userWithoutHash } = user;
    return userWithoutHash;
  }

  // Add more methods like updateProfile, assignNfcCard, etc.
}