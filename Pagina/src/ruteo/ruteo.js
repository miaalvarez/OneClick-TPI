const express = require('express');
const router = express.Router();
const mainController = require('../controladores/controlador');
const authMiddleware = require('../middlewares/authMiddleware'); // Importa el middleware
const { soloAlumnos, soloAlumnado, soloAdministradores} = require('../middlewares/roles')
const { Persona, TipoUsuario } = require('../basededatos/modelos');

// Aplica el middleware antes de las rutas
router.use(mainController.cargarUsuario);

// Rutas de registro y acceso público
router.get('/registrarse', mainController.registrarse);
router.get('/acceder', mainController.acceder); // Página de acceder
router.post('/iniciar', mainController.iniciar); // Acción para iniciar sesión


// Rutas protegidas por el middleware de autenticación
router.get('/', authMiddleware, mainController.index); // Página principal
router.get('/pagdeinicio', authMiddleware, mainController.pagdeinicio); // Página de inicio
router.get('/notas',authMiddleware, soloAlumnos, mainController.notas); // Página de las notas
router.get('/perfil', authMiddleware, mainController.perfil); // Página del perfil
router.get('/gestionar', authMiddleware, soloAlumnado, mainController.gestion); // Página de gestionar alumnos
router.get('/curso/:cursoId/materia/:materiaId', authMiddleware, soloAlumnado, mainController.alumnos); // Página de alumnos
router.get('/materias/:id', authMiddleware, soloAlumnado, mainController.materias); // Página de materias
router.get('/vernotas', authMiddleware, mainController.vernotas); // ver notas profes
router.get('/materiaalumnado/:id', authMiddleware, soloAlumnado, mainController.materiaalumnado); // nose
router.get('/notaspuestas/:cursoId/materia/:materiaId', authMiddleware, soloAlumnado, mainController.notaspuestas); // nose

router.post('/validar', mainController.validar);

// Ruta para guardar las notas
router.post('/curso/:cursoId/materia/:materiaID', authMiddleware, soloAlumnado, mainController.guardarNotas);

// Ruta para cerrar sesión
router.post("/cerrar-sesion", authMiddleware, mainController.cerrar);

// Rutas para gestionar roles (solo para administradores)
router.get('/admin/usuarios', async (req, res) => {
    try {
        const usuarios = await Persona.findAll({
            include: { model: TipoUsuario, as: 'tipoUsuario' }
        });

        console.log("Usuarios cargados:", usuarios); // <-- AÑADÍ ESTE LOG

        res.render('cambiorol', {
            usuarios,
            usuario: req.session.usuario
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        res.status(500).send('Error interno al obtener usuarios');
    }
});
router.post('/cambiar-rol', async (req, res) => {
    const { persona_id, nuevo_rol } = req.body;

    try {
        const persona = await Persona.findByPk(persona_id);
        if (!persona) {
            return res.status(404).send('Usuario no encontrado');
        }

        persona.tipo_usuario_id = nuevo_rol;
        await persona.save();

        res.redirect('/admin/usuarios');
    } catch (error) {
        console.error('Error al cambiar el rol:', error);
        res.status(500).send('Error interno al cambiar rol');
    }
});

router.post('/eliminar-usuario', async (req, res) => {
    const { persona_id } = req.body;
    try {
        await Persona.destroy({ where: { persona_id } });
        res.redirect('/admin/usuarios'); // o la vista que estés usando
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send('Error al eliminar el usuario');
    }
});
module.exports = router;