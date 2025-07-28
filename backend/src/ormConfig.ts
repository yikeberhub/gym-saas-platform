import {DataSource} from 'typeOrm';
import {User} from './models/User';
import {Gym} from './models/Gym';
import {GymMember} from './models/GymMember';

export const AppDataSource = new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[User,Gym,GymMember],
    migrations:['src/migrations/*.ts'],
    logging:false,
    synchronize:false,
});