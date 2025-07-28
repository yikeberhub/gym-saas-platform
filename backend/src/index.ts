import express,{Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db';



dotenv.config();

const app:Application = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.get('/',async(_req,res)=>{
    try{
        const result = await pool.query('SELECT NOW()');
        res.send(`API is running. DB time:${result.rows[0].now}`);
    }catch(err){
        res.status(500).send('database connection failed');
    }
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
