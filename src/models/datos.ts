import { DataTypes } from "sequelize";
import {sequelize} from "../db/conexion";

export const TiposDocumentos = sequelize.define('tipo_documentos',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    codigo:{
        type: DataTypes.STRING(20),
        defaultValue: false,
    },
    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    min:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creditos:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    abrev:{
        type: DataTypes.STRING(10),
        allowNull: true,
    },
},{
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
})

export const ConsultasApiReniec = sequelize.define('reniec_consultas_apis',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sistema_origen:{
        type: DataTypes.STRING(20),
        allowNull:false
    },
    usuario_creacion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    documento:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    tipo_documento:{
        type:DataTypes.STRING(20),
        allowNull:false,
    },
    respuesta:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    costo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creditos_actuales:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: false
})
