import dotenv from 'dotenv';
import Server  from "./models/server";
const limaTimeZone = 'America/Lima';

Intl.DateTimeFormat('es-PE', { timeZone: limaTimeZone });
dotenv.config();
const server = new Server();