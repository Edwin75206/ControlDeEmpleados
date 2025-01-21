import Express  from "express";
import empleadosController from "./../controller/empleadosController.js"


const router =Express.Router();

router.post("/insertOne/",empleadosController.insertOne)
router.delete("/deleteOne/:usuarioID",empleadosController.deleteOne)
router.get("/getAll/",empleadosController.getAll)
router.get("/getOne/:empleadoID",empleadosController.getOneById)
router.post("/update/",empleadosController.update)
router.get("/", (request,response)=>{
    response.json("Bienvenido al API para la Tarea Integradora")
})

export default router