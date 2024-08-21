import { Request, Response, response } from "express"
import { TiposDocumentos, ConsultasApiReniec } from "../models/datos"
import { Op } from 'sequelize';
import axios from 'axios';
import { sequelize } from "../db/conexion";

export const validarPersonaApisPeru = async (req: Request, res: Response) => {
  const { documento,tipo_documento } = req.body;
  try {
    const data = await apiReniec(documento,tipo_documento,'EVA',req.info.nameUser)
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ msg: `${error}` })
  }
}

export async function apiReniec (documento:string,tipo_documento:number,sistema:string,usuario:string){
  const tipoDoc = await TiposDocumentos.findByPk(tipo_documento)
  const tDoc = tipoDoc?.dataValues
  const url = `${process.env.API_PERU_DEV}/${tDoc.abrev}/${documento}?apikey=${process.env.KEY_PERU_DEV}`;
  const response = await axios.get(url);
  let data:any={
    tipo_documento:tipo_documento,
    success:response.data.statusCode==200?true:false
  }
  
  if(tipo_documento==1){
    data.nombres=response.data.body.preNombres
    data.apellidoPaterno=response.data.body.apePaterno
    data.apellidoMaterno=response.data.body.apeMaterno
    data.fecha_nacimiento=response.data.body.feNacimiento
    data.sexo=response.data.body.sexo.substr(0,1)
  }
  if(tipo_documento==2){
    data.nombres=response.data.body.nombres
    data.apellidoPaterno=response.data.body.apellido_paterno
    data.apellidoMaterno=response.data.body.apellido_materno
    data.fecha_nacimiento=response.data.body.fecha_nacimiento
    data.sexo=response.data.body.sexo
  }
  if(tipo_documento==4){
    data.nombres=response.data.body.data[0]?.nombres
    data.apellidoPaterno=response.data.body.data[0]?.apellido_paterno
    data.apellidoMaterno=response.data.body.data[0]?.apellido_materno
    data.fecha_nacimiento=response.data.body.data[0]?.fecha_nacimiento
    data.sexo=response.data.body.data[0]?.sexo
  }
  const response2 = await axios.get(process.env.API_PERU_CREDITOS!);
  const valor= response2.data.body.data.apiByApiKey.items[0].credits
  const log:any={
    sistema_origen:sistema,
    usuario_creacion:usuario,
    documento,
    tipo_documento:tDoc.codigo,
    respuesta:JSON.stringify(data),
    costo:data.success?tDoc.creditos:0,
    creditos_actuales:valor
  }
  await ConsultasApiReniec.create(log)
  return data
}