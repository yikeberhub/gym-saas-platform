// src/app.ts
import express from "express";
import {Request,Response,NextFunction} from "express";
import "reflect-metadata"; 
import { initializeDatabase } from "./config/database";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./routes/index"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//api route
app.use("/api", mainRouter);

app.use((err: Error, req:Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const startServer = async () => {
  await initializeDatabase(); 

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

export default app; 