import express  from "express";
import db from "./config/db.js"
import Empleado from "./models/Empleados.js";
import router from "./routes/empleadosRoutes.js";

import cors  from "cors";


//crear la app
const api = express();
api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = 4000;
// Habilitar CORS
api.use(cors());

api.use(express.json())
api.use("/",router)
api.use("/empleados",router)

//conexion data base
try {
    console.log('verificando las credenciales para la conexion a la base de datos')
    await db.authenticate();
    console.log('conexion exitosa a la base de datos')
    console.log('sincronizando el modelo logico con el modelo fisico')
    db.sync()
} catch (error) {
    console.log(error)
}

api.listen(port,()=>{
    console.log(`El api ha sido iniciada en el puerto: ${port}`)
})


