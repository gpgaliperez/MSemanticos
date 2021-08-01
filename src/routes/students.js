const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require("../config/auth")
const rutaS = express.Router(); //**lo que hace es redireccionar los pedidos a un Controller correspondiente 

const  {
    getAllAlumnos,
    editarAlumnos,
    agregarAlumnos,
    guardarAlumnos,
    guardarAlumnosEditados,
    //eliminarAlumnos

} = require("../controllers/students")

rutaS.route("/agregar")
    .get(isLoggedIn, agregarAlumnos)
    .post(isLoggedIn, guardarAlumnos)


rutaS.route("/listado")
    .get(isLoggedIn,getAllAlumnos)


module.exports = rutaS;