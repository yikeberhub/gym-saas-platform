// src/config/database.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

import {User} from "../models/User";
import { SubscriptionPlan } from "../models/SubscriptionPlan";
import { MemberSubscription } from "../models/MemberSubscription";
import { Payment } from "../models/Payment";
import { Attendance } from "../models/Attendance";
import { Notification } from "../models/Notification";
// import { GymInfo } from "../models/gymInfo";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "gym_db",
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production" ? ["query", "error"] : false,
  entities: [
    User,
    SubscriptionPlan,
    MemberSubscription,
    Payment,
    Attendance,
    Notification,
    // GymInfo,
  ],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error("Error connecting to database:",error);
    process.exit(1);
  }
};