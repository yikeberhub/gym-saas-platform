// src/config/database.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

import { User } from "../models/User";
import { SubscriptionPlan } from "../models/SubscriptionPlan";
import { MemberSubscription } from "../models/MemberSubscription";
import { Payment } from "../models/Payment";
import { Attendance } from "../models/Attendance";
import { Notification } from "../models/Notification";
import { GymInfo } from "../models/GymInfo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "gym_db",
  synchronize: process.env.NODE_ENV === "development", // True only for development/initial setup
  logging: process.env.NODE_ENV === "development" ? ["query", "error"] : false,
  entities: [
    User,
    SubscriptionPlan,
    MemberSubscription,
    Payment,
    Attendance,
    Notification,
    GymInfo,
  ],
  migrations: [`${__dirname}/../migrations/**/*.ts`],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    // Ensure migrations are run if not in development and synchronize is false
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      // If synchronize is false (e.g., in production), run migrations here
      if (!AppDataSource.options.synchronize) {
        await AppDataSource.runMigrations();
        console.log("Migrations have been run successfully.");
      }
      console.log("Database connection established successfully!");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};