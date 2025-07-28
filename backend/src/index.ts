// src/app.ts (or src/index.ts)
import express from "express";
import "reflect-metadata"; // Ensure this is at the top of your main entry file!
import { initializeDatabase } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

app.get('/',async(_req,res)=>{
    try{
        res.send('Welcome to Api.');
    }catch(err){
        res.status(500).send('database connection failed'+err);
    }
});
const startServer = async () => {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();