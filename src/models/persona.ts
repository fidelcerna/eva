import { DataTypes } from "sequelize";
import {sequelize} from "../db/conexion";
import { Usuario } from "./usuarios";
import { Asesoras, TiposDocumentos } from "./datos";

export const Persona = sequelize.define('persona',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    eliminado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    validacion_reniec:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    usuario_creacion:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Usuario,
            key: 'id',
        },
        field:'usuario_creacion'
    },
    usuario_actualizacion:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model: Usuario,
            key: 'id',
        },
        field:'usuario_actualizacion'
    },
    paciente_nuevo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    paciente:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    asesora_id:{
        type: DataTypes.INTEGER,
        allowNull:true,
        references: {
            model: Asesoras,
            key: 'id'
        },
        field: 'asesora_id'
    },
    nombres:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    apellido_paterno:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    apellido_materno:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    tipo_documento:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:TiposDocumentos,
            key:'id'
        },
        field:'tipo_documento'
    },
    documento:{
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true
    },
    fecha_nacimiento:{
        type:DataTypes.DATEONLY,
        allowNull:true
    },
    origen:{
        type:DataTypes.STRING(100),
        allowNull:true,
        defaultValue:'EVA'
    },
},{
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
});
Persona.belongsTo(Usuario,{foreignKey: 'usuario_creacion', as: 'creador' })
Persona.belongsTo(Asesoras,{foreignKey: 'asesora_id', as: 'asesora' })
Persona.belongsTo(Usuario,{foreignKey: 'usuario_actualizacion', as: 'actualizacion' })
Persona.belongsTo(TiposDocumentos,{foreignKey: 'tipo_documento', as: 'tipo' })
