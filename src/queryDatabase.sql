USE db_becas;
CREATE TABLE institutos(
  cue INTEGER NOT NULL UNIQUE,
  clave VARCHAR(30) NOT NULL,
  PRIMARY KEY(cue)
);


CREATE TABLE becas(
	id_beca INTEGER NOT NULL ,
	posee_enfermedad BOOLEAN NOT NULL,
    diferencia_ingreso_gastos INTEGER NOT NULL,
    estado VARCHAR(20) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    cantidad_hermanos INTEGER,
    PRIMARY KEY(id_beca)
);


CREATE TABLE alumnos(
  apellidos VARCHAR(30) NOT NULL,
  nombres VARCHAR(40) NOT NULL ,
  dni INTEGER NOT NULL UNIQUE,
  cuil INTEGER NOT NULL,
  fecha_nacimiento DATE NOT NULL ,
  nacionalidad VARCHAR(30) NOT NULL,
  domicilio VARCHAR(50) NOT NULL,
  localidad VARCHAR(50) NOT NULL,
  codigo_postal VARCHAR(10) NOT NULL,
  telefono INTEGER NOT NULL,
  email VARCHAR(70) NOT NULL ,
  turno VARCHAR(20) NOT NULL,
  grado INTEGER NOT NULL,
  nro_beca INTEGER ,
  nro_instituto INTEGER,
  FOREIGN KEY (nro_beca) REFERENCES becas(id_beca),
  FOREIGN KEY (nro_instituto) REFERENCES institutos(cue),
  PRIMARY KEY(dni)
);

CREATE TABLE padres(
	id_padre INTEGER UNIQUE auto_increment,
	nombres VARCHAR(40) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
	edad INTEGER NOT NULL,
    ocupacion VARCHAR(60) NOT NULL,
    lugar_trabajo VARCHAR(80) NOT NULL,
    ingresos_netos INTEGER NOT NULL,
    convive BOOLEAN NOT NULL,
    nro_alumno INTEGER,
    PRIMARY KEY(id_padre),
	FOREIGN KEY (nro_alumno) REFERENCES alumnos(dni)
);

CREATE TABLE hermanos(
	id_hno INTEGER UNIQUE auto_increment,
	nombres VARCHAR(40) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
	edad INTEGER NOT NULL,
    ocupacion VARCHAR(60) NOT NULL,
    escuela VARCHAR(60) NOT NULL,
    convive BOOLEAN NOT NULL,
	nro_alumno INTEGER,
    PRIMARY KEY(id_hno),
    FOREIGN KEY (nro_alumno) REFERENCES alumnos(dni)
)
