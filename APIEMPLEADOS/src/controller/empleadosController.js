import Empleado from "../models/Empleados.js";
const empleadosController={}

empleadosController.insertOne = async(rq,rs)=>{
    console.log("se esta intentando la creacion de un nuevo empleado");
    const {ide,nombreCompleto,correo,fechaIngreso,telefono,estadoCivil,sexo}=rq.body

    const newEmpleado = await Empleado.create(rq.body)

    if (newEmpleado){
        rs.status(200)
        rs.json(`Se creo con exito`)
    }
    else{
        rs.status(400);
        rs.json({
            messageStatus: `Error al intentar`
        })
    }
}

empleadosController.deleteOne=async(rq,rs)=>{ 
  
    const id =rq.params.usuarioID
    console.log(`Se ha solicitado la busqueda del USUARIO con el ID: ${id}`)
    const empleadoBuscado=await Empleado.findByPk(id)
  
    if (empleadoBuscado) {
        empleadoBuscado.destroy()
      rs.json({
        estatus:"Usuario Eliminado",
        mensaje:`El usuario con el id${id}`
      })
    } else {
      rs.json({
        estatus: "Usuario no encontrado", mensaje: `El usuario que intenta eliminar no se encuentra registrado`
      })
    }
}
empleadosController.getAll = async (rq, rs) => {
    console.log("Obteniendo todos los empleados");

    try {
        // Obtener todos los empleados
        const empleados = await Empleado.findAll();

        rs.status(200).json({
            empleados: empleados
        });
    } catch (error) {
        console.error("Error al intentar obtener todos los empleados:", error);
        rs.status(500).json({
            message: "Error interno del servidor al intentar obtener todos los empleados"
        });
    }
};



empleadosController.update = async (req, res) => {
  
  try {
    const loggedEmployee = await Empleado.findByPk(id);
    // Obtén el ID del empleado desde la sesión
    const { nombreCompleto, correo, estadoCivil, fechaIngreso, sexo, telefono } = req.body;
    
    // Validaciones
    await check("nombreCompleto").notEmpty().withMessage("Tu nombre completo es requerido").run(req);
    await check("correo").notEmpty().withMessage("Tu correo es requerido").isEmail().withMessage("Formato de correo inválido").run(req);
    await check("estadoCivil").notEmpty().withMessage("Tu estado civil es requerido").run(req);
    await check("fechaIngreso").notEmpty().withMessage("La fecha de ingreso es requerida").toDate().isISO8601().withMessage("Formato de fecha inválido").run(req);
    await check("sexo").notEmpty().withMessage("Tu sexo es requerido").run(req);
    await check("telefono").notEmpty().withMessage("Tu teléfono es requerido").run(req);

    const resultValidate = validationResult(req);

    const employeeExists = await Employee.findOne({
      where: {
        correo: req.body.correo,
        id: { [Op.not]: employeeId },
      },
    });

    if (employeeExists) {
      res.render("auth/editEmployee.pug", {
        page: "Perfil",
        showHeader: true,
        showFooter: true,
        employeePurchases,
        errors: [{ msg: `El correo ${req.body.correo} ya existe` }],
        employee: {
          nombreCompleto: req.body.nombreCompleto,
          correo: req.body.correo,
          estadoCivil: req.body.estadoCivil,
          fechaIngreso: req.body.fechaIngreso,
          sexo: req.body.sexo,
          telefono: req.body.telefono,
        },
      });
      // Actualiza los datos del empleado en la base de datos
      await Employee.update({ nombreCompleto, correo, estadoCivil, fechaIngreso, sexo, telefono }, { where: { id: employeeId } });
      // Redirige a la página de perfil con un mensaje de éxito
    } 
      
    }
   catch (error) {
    console.error("Error al actualizar el perfil del empleado:", error);
  }

};


empleadosController.getOneById = async (rq, rs) => {
 
    const id=rq.params.empleadoID
    console.log(`Se ha solicitado la busqueda del usuario con ID: ${id}`)
    const empleadoBuscado=await Empleado.findByPk(id)
    if (empleadoBuscado) {
        rs.json(empleadoBuscado)
    } else {
      rs.json({
        estatus:"Usuario no encontrado",
        mensaje:`El usuario con ID: ${id}, no s encontro`
      })
    }
  }

export default empleadosController