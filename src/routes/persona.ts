import { Router } from "express";
import {validarToken} from "./token";
import { validarPersonaApisPeru } from "../controllers/persona";

const ruta = Router();
ruta.post('/validarpersona', validarToken, validarPersonaApisPeru);
export default ruta;