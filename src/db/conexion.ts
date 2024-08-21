import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize(`${process.env.NAME_DB!}`, 'postgres', `${process.env.KEY_DB!}`, {
    host:`${process.env.HOST_DB!}`,
    timezone: 'America/Lima',
    dialect:'postgres',
    define: {
        schema: `${process.env.NAME_SCHEMA!}`
    },
    logging: false,
});