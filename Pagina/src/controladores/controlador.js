const mainController = {};
const db = require("../basededatos/modelos")
const mysql = require("mysql");

// Definir la conexión aquí también
let conexion = mysql.createConnection({
    host: "localhost",
    database: "base.oneclick",
    user: "root",
    password: "",
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


// Middleware para agregar el usuario a todas las respuestas renderizadas
mainController.cargarUsuario = (req, res, next) => {
  res.locals.usuario = req.session.usuario || null; // Asigna el usuario logueado a res.locals
  next(); // Continúa con la siguiente función middleware o controlador
};


// Retorna la vista del editado de perfil 
mainController.index = async (req, res) => {
  console.log("holaaaaa", req.session)
  return res.render("pagdeinicio.ejs");
};
// Retorna la vista del editado de perfil 
mainController.acceder = async (req, res) => {
    return res.render("acceder.ejs");
  };

  mainController.registrarse = async (req, res) => {
    return res.render("registrarse.ejs");
  };

  mainController.pagdeinicio = async (req, res) => {
    return res.render("pagdeinicio.ejs");
  };

mainController.vernotas = async (req, res) => {
    const curso = await db.Curso.findAll();
    return res.render("vernotas.ejs", {curso});
  };

  mainController.vistacambiorol = async (req, res) => {
  try {
    const usuarios = await db.Persona.findAll({
      where: {
        persona_id: {
          [db.Sequelize.Op.ne]: req.session.usuario.id
        }
      },
      include: [{ model: db.TipoUsuario, as: 'tipoUsuario' }]
    });

    res.render("cambioRol", { usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(500).send("Error al cargar usuarios");
  }
};
  


mainController.materiaalumnado = async (req, res) => {
    const cursoid = req.params.id
    const curso = await db.Curso.findOne({
      where: { curso_id: cursoid },
      include: [
          {
              model: db.Materia,
              as: "materias", // Debe coincidir con el alias usado en la asociación
              attributes: ["materia_id", "nombre_materia"]
          }
      ]
  });
    return res.render("materiaalumnado", {curso} );
  };


mainController.notaspuestas = async (req, res) => {
    try {
        const { cursoId, materiaId } = req.params;

        // Obtener el curso, la materia y los alumnos junto con sus notas
        const curso = await db.Curso.findOne({
            where: { curso_id: cursoId },
            include: [
                {
                    model: db.Materia,
                    as: "materias",
                    where: { materia_id: materiaId },
                },
            ],
        });

        // Verificar si el curso y la materia existen
        if (!curso) {
            res.status(404).send("Curso o materia no encontrados");
            return;
        }

        // Obtener los alumnos del curso junto con sus notas específicas de la materia.
        const alumnos = await db.Persona.findAll({
            where: { curso_id: cursoId },
            include: [
                {
                    model: db.Nota,
                    as: "notas",
                    where: { materia_id: materiaId },
                    required: false, // Incluir alumnos sin notas aún
                    attributes: ["nota", "cuatrimestre", "informe"], // tipos/columnas que se obtienen
                },
            ],
        });

        res.render("notaspuestas", {
            curso,
            materia: curso.materias[0],
            alumnos,
        });
    } catch (error) {
        console.error("Error al obtener las notas:", error.message);
        res.status(500).send("Error en el servidor");
    }
};



  mainController.notas = async (req, res) => {
    try {
      const idusuario = req.session.usuario.id
      // Buscar el usuario logueado
      const usuario = await db.Persona.findOne({
        where: { persona_id: idusuario },
        include: [{
          model: db.Curso,
          as: 'curso',
          attributes: ['nombre_curso'],
          include: [{
            model: db.Materia,
            as: 'materias',
            include: [{
              model: db.Nota,
              as: 'notas',
              where: { persona_id: idusuario },
              attributes: ['nota', 'persona_id', 'cuatrimestre', 'informe'],
              required: false
            }]
          }]
        }]
      });
  
      // Renderizar la vista 'notas'
      return res.render("notas.ejs", { usuario });
    } catch (error) {
      console.error("Error al obtener el usuario con el curso:", error.message);
      res.status(500).send("Error en el servidor");
    }
  };

  mainController.perfil = async (req, res) => {
      try {
          const usuario = req.session.usuario; // Obtener los datos de la sesión activa
          if (!usuario) {
              return res.redirect("/acceder"); // Redirige si no hay sesión activa
          }
          return res.render("perfil.ejs", { usuario });
      } catch (error) {
          console.error("Error al cargar el perfil:", error);
          res.status(500).send("Error en el servidor");
      }
  };
  

  mainController.gestion = async (req, res) => {
    const curso = await db.Curso.findAll();
    return res.render("gestion.ejs", {curso});
  };

  mainController.alumnos = async (req, res) => {
    try {
      usuario = req.session.usuarioLogueado;
      const { cursoId, materiaId } = req.params;
  
      // Obtener el curso y sus materias, asegurándonos de que exista la materia específica
      const curso = await db.Curso.findOne({
        where: { curso_id: cursoId },
        include: [
          {
            model: db.Materia,
            as: "materias",
            where: { materia_id: materiaId }, // Filtra por la materia seleccionada
          },
        ],
      });
  
      // Verificar si el curso o la materia existen
      if (!curso) {
        return res.status(404).send("Curso o materia no encontrados");
      }
  
      // Filtrar alumnos que estén inscritos en el curso específico
      const alumnos = await db.Persona.findAll({
        where: { curso_id: cursoId }, // Filtra solo por el curso_id
      });
  
      // Renderizar la vista con los datos del curso, materia y la lista de alumnos
      res.render("alumnos", {
        curso,
        materia: curso.materias[0],
        alumnos,
        usuario,
        cursoId,
      });
    } catch (error) {
      console.error("Error al obtener la materia y sus alumnos:", error.message);
      res.status(500).send("Error en el servidor");
    }
  };

  mainController.materias = async (req, res) => {
    const cursoid = req.params.id
    const curso = await db.Curso.findOne({
      where: { curso_id: cursoid },
      include: [
          {
              model: db.Materia,
              as: "materias", // Debe coincidir con el alias usado en la asociación
              attributes: ["materia_id", "nombre_materia"]
          }
      ]
  });
    return res.render("materias.ejs", {curso} );
  };

  //crear usuarios
  mainController.validar = async (req, res) => {
    console.log("hola: ", req.res);
      
    const datos = req.body;

    let documento = datos.dni;
    let nom = datos.nombre;
    let correo = datos.email;
    let contraseña = datos.password;
    let curs = datos.curso;
    let tipo = 1

    // Verificar si el correo ya existe en la base de datos
    conexion.query(`SELECT * FROM persona WHERE correo = '${correo}'`, function(error, results) {
        if (error) {
            throw error;
        } else if (results.length > 0) {
            console.log("Ya existe ese usuario");
            return res.status(404).send("Usuario ya existe");
        } else {
            let registrar = `INSERT INTO persona (persona_id, nombre, correo, contrasena, tipo_usuario_id, curso_id) VALUES ('${documento}', '${nom}', '${correo}', '${contraseña}', '${tipo}', '${curs}')`;
            conexion.query(registrar, function(error) {
                if (error) {
                    console.error("Error al almacenar datos:", error);
                } else {
                    console.log("Datos almacenados con éxito");
                    res.redirect("/acceder");
                }
            });
        }
    });
  }

  //iniciar session
  mainController.iniciar = async (req, res) => {
    const { correo, contrasena } = req.body;
    console.log("req.body", req.body);
  
    const usuario = await db.Persona.findOne({ where: { correo } });
  
    if (usuario && contrasena === usuario.contrasena) {
      req.session.usuario = {
        id: usuario.persona_id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        curso_id: usuario.curso_id,
        tipo_usuario_id: usuario.tipo_usuario_id
      };
      console.log("Usuario logueado:", req.session.usuario);
      return res.redirect("/pagdeinicio");
    } else {
      console.log("Contraseña incorrecta o usuario no encontrado");
      return res.status(401).send("Credenciales incorrectas");
    }
  };
  
  //notas
  mainController.guardarNotas = async (req, res) => { 
    try {
      console.log(req.body); // Esto te permite ver la estructura completa de req.body
  
      const { cursoId, materiaID } = req.params;
      if (!req.body) {
        return res.status(400).json({ error: "No se encontraron datos en el cuerpo de la solicitud." });
      }
  
      // Array para guardar las notas procesadas
      const notasProcesadas = [];
  
      // Iterar sobre todas las claves de req.body para extraer los persona_id y sus respectivas notas
      for (let key in req.body) {
        if (key.startsWith("persona_id_")) {
          const personaId = req.body[key]; // Extraer persona_id
          const id = key.split('_')[2]; // Extraer id (101, 8888, etc.)
          
          // Obtener las notas asociadas a este persona_id
          const notaData = req.body[`nota_${id}`]; // nota_<id>
          
          if (notaData) {
            // Crear objeto con los datos del alumno y la nota
            notasProcesadas.push({
              persona_id: parseInt(personaId), // Convertir a número
              materia_id: parseInt(materiaID), // Convertir a número
              curso_id: parseInt(cursoId), // Convertir a número
              cuatrimestre: parseInt(notaData.cuatrimestre), // Convertir a número
              informe: parseInt(notaData.instancia), // Convertir a número
              nota: parseInt(notaData.nota), // Convertir a número
            });
          }
        }
      }
  
      // Verificar que hay datos para guardar
      if (notasProcesadas.length === 0) {
        return res.status(400).json({ error: "No se encontraron notas para guardar." });
      }

      // Eliminar las notas existentes que coincidan con la combinación de persona_id, materia_id, curso_id, cuatrimestre, informe
      for (const nota of notasProcesadas) {
        await db.Nota.destroy({
          where: {
            persona_id: nota.persona_id,
            materia_id: nota.materia_id,
            curso_id: nota.curso_id,
            cuatrimestre: nota.cuatrimestre,
            informe: nota.informe
          }
        });
      }
  
      // Guardar en la base de datos las nuevas notas
      await db.Nota.bulkCreate(notasProcesadas);
  
      res.redirect(`/curso/${cursoId}/materia/${materiaID}`);
    } catch (error) {
      console.error("Error al guardar las notas:", error);
      res.status(500).json({ error: "Ocurrió un error al guardar las notas." });
    }
};

  
  
  //cerrar session
  mainController.cerrar = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/acceder'); // Redirige al login después de cerrar sesión
    });
};

mainController.cambiarRol = async (req, res) => {
  const { persona_id, nuevo_rol } = req.body;

  try {
    await db.Persona.update(
      { tipo_usuario_id: nuevo_rol },
      { where: { persona_id } }
    );
    res.redirect('/cambiorol');
  } catch (error) {
    console.error("Error al cambiar el rol:", error.message);
    res.status(500).send("Error al actualizar el rol");
  }
};

module.exports = mainController;