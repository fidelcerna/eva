import express, { urlencoded } from 'express';
import session from 'express-session';
import rutaPerson from '../routes/persona';
import {sequelize} from '../db/conexion';
import cors from 'cors';
import morgan from 'morgan'

class Server{
    private app: express.Application;
    private port: string;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.listen();
        this.midlewares();
        this.rutas();
        this.dbConexion();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('App on port', this.port);
        })
    }

    rutas(){
        this.app.use('/api/persona', rutaPerson)
    }

    midlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors(
            {
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST',
                allowedHeaders: 'Content-Type,Authorization',
            }
        ));
        this.app.use(morgan('tiny'))
        this.app.use(session({
            secret: 'tu_secreto', // Usa un secreto adecuado
            resave: false,
            saveUninitialized: true,
          }));
    }

    async dbConexion(){
        try {
            await sequelize.authenticate();  
            console.log("DB Conectada");
        } catch (error) {
            console.log("Error: " + error)
        }
    }
}

export default Server;