import { DataTypes } from "sequelize";   //importas una parte de la libreria para eso son las llaves
import db from "../config/db.js";

const Empleado = db.define('empleados',{
    nombreCompleto:{
        type: DataTypes.STRING,
        allowNull:false
    },
    correo:{
        type: DataTypes.STRING,
        allowNull:false
    },
    fechaIngreso:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull:false
    },
    estadoCivil:{
        type:DataTypes.ENUM('Soltero', 'Casado', 'Divorciado'),
        allowNull:false
    },
    sexo:{
        type:DataTypes.ENUM('Masculino', 'Femenino'),
        allowNull:false
    }


})


export default Empleado