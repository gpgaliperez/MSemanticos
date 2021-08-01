const pool = require("../config/database")
const express = require("express");
const cueActualObj = require("../config/passport")

exports.agregarAlumnos  = (req, res, next) =>{
    res.render("students/add")
}

exports.guardarAlumnos = async (req, res, next) =>{
    console.log("entro guardarAlumnos Controller")
    try {
    
        const newPadre = {
            apellidos : req.body.apellidoP,
            nombres : req.body.nombreP,
            edad : req.body.edadP,
            ocupacion : req.body.ocupacionP,
            lugar_trabajo: req.body.lugarTrabajoP,
            ingresos_netos: req.body.ingresoP,
            convive : req.body.conviveP === "on" ? true : false,
            nro_alumno: req.body.dni
        }
       
        const newMadre = {
            apellidos : req.body.apellidoM,
            nombres : req.body.nombreM,
            edad : req.body.edadM,
            ocupacion : req.body.ocupacionM,
            lugar_trabajo: req.body.lugarTrabajoM,
            ingresos_netos: req.body.ingresoM,
            convive : req.body.conviveM === "on" ? true : false,
            nro_alumno: req.body.dni
        }

        const newHermano1 = {
            apellidos : req.body.apellidoH1,
            nombres : req.body.nombreH1,
            edad : req.body.edadH1,
            ocupacion : req.body.ocupacionH1,
            escuela : req.body.escuelaH1,
            convive : req.body.conviveH1 === "on" ? true : false,
            nro_alumno: req.body.dni
        }

        const newHermano2 = {
            apellidos : req.body.apellidoH2,
            nombres : req.body.nombreH2,
            edad : req.body.edadH2,
            ocupacion : req.body.ocupacionH2,
            escuela : req.body.escuelaH2,
            convive : req.body.conviveH2 === "on" ? true : false,
            nro_alumno: req.body.dni
        }

        const newHermano3 = {
            apellidos : req.body.apellidoH3,
            nombres : req.body.nombreH3,
            edad : req.body.edadH3,
            ocupacion : req.body.ocupacionH3,
            escuela : req.body.escuelaH3,
            convive : req.body.conviveH3 === "on" ? true : false,
            nro_alumno: req.body.dni
        }
        
        //CALCULO INGRESOS - GASTOS
        const ingresoGastos = (req.body.ingresoP + req.body.ingresoM) - req.body.gastoEnfermedad

        //CALCULO CANTIDAD DE HERMANOS
        const array =[newHermano1, newHermano2, newHermano3]
        let cantHermanos = 0
        array.forEach( h => {
            if(h.nombres !== ""){
                cantHermanos++;
            }
        } )

        //RANDOM Para el IDBECA
        const becaID = Math.floor(Math.random() * (150 - 1)) + 1;

        const newBeca = {
            id_beca : becaID,
            posee_enfermedad : req.body.enfermedadCronica === "on" ? true : false,
            estado : "EN ESTUDIO",
            tipo : " ",
            diferencia_ingreso_gastos : ingresoGastos,
            cantidad_hermanos: cantHermanos
        }

        
        const becaCreada = await pool.query('INSERT INTO becas SET ?', [newBeca]);

        const newAlumno = {
            apellidos : req.body.apellidos,
            nombres : req.body.nombres,
            dni : req.body.dni,
            cuil : req.body.cuil,
            fecha_nacimiento : req.body.fecha_nacimiento,
            nacionalidad : req.body.nacionalidad,
            domicilio : req.body.domicilio,
            localidad : req.body.localidad,
            codigo_postal : req.body.codigo_postal,
            telefono : req.body.telefono,
            email : req.body.email,
            turno : req.body.turno,
            grado : req.body.grado,
            nro_beca : becaID,
            nro_instituto : cueActualObj.cueActual 
        }

        console.log("cue actual: " + cueActualObj.cueActual)
        //console.log("user.cue: " + user.cue)
        console.log("becaID: " + becaID)

        const alumnoCreado = await pool.query('INSERT INTO alumnos SET ?', [newAlumno]);
        
        if(newPadre.nombres !== ''){
            console.log("padre")
            const alumnoCreado = await pool.query('INSERT INTO padres SET ?', [newPadre]);
        }
        if(newMadre.nombres !== '' ){
            console.log("madre")
            const alumnoCreado = await pool.query('INSERT INTO padres SET ?', [newMadre]);
        }

        if(newHermano1.nombres !== '' ){
            console.log("hermano")
            const alumnoCreado = await pool.query('INSERT INTO hermanos SET ?', [newHermano1]);
        }
        if(newHermano2.nombres !== ''){
            console.log("hermanoo")
            const alumnoCreado = await pool.query('INSERT INTO hermanos SET ?', [newHermano2]);
        }
        if(newHermano3.nombres !== ''){
            console.log("hermanooo")
            const alumnoCreado = await pool.query('INSERT INTO hermanos SET ?', [newHermano3]);
        }

        console.log("registro hecho ")
        res.redirect("/alumnos/listado")
      } catch (err) {
        throw err;
      }
   
}

exports.getAllAlumnos = async (req, res, next) =>{
    //res.render("students/list")
    //const alumnos = await pool.query("SELECT * FROM becas ");
    //const becas = await pool.query("SELECT * FROM alumnos WHERE nro_instituo = ? ", [cueActualObj.cueActual] );
    const becas = await pool.query('SELECT * FROM   becas  WHERE  id_beca = (SELECT nro_beca FROM   alumnos   WHERE   nro_instituto = ?)',[cueActualObj.cueActual] );    
    res.send(becas);
}


