import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    port:parseInt(process.env.DB_PORT || '5432',10),

});

pool.on('connect',()=>{
    console.log('connected to postgreSQL database');
})


export default pool;
