import Sequelize  from "sequelize";
import dotenv from "dotenv"//.env dote es punto

dotenv.config({path: "./src/.env"})

const db = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password,{
    host: process.env.db_host,
    port: process.env.db_port,
    dialect: "mysql",
    define:{
        timestamp:true  //datos de auditoria, fecha de creacion y de actualizacion
    },
    pool:{
        max:5,
        min:0,
        acquire:30000, //el tiempo que tarda en conectarse a la base
        idle:10000  //tiempo en que se pone a dormir la coonexion
    },
    operatorAliases:false
});

export default db;
