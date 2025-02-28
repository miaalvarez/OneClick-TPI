// Middleware para solo alumnos (tipo_usuario_id = 1)
function soloAlumnos(req, res, next) {
    if (req.session.usuario.tipo_usuario_id === 1) {
      return next(); // Permitir el acceso a la ruta
    } else {
        res.status(404).render("404.ejs");
    }
  }
  
  // Middleware para solo alumnado (tipo_usuario_id = 3)
  function soloAlumnado(req, res, next) {
    if (req.session.usuario.tipo_usuario_id === 3) {
      return next(); // Permitir el acceso a la ruta
    } else {
        res.status(404).render("404.ejs");
    }
  }
  
  // Middleware para solo administradores (tipo_usuario_id = 2)
  function soloAdministradores(req, res, next) {
    if (req.session.usuario.tipo_usuario_id === 2) {
      return next(); // Permitir el acceso a la ruta
    } else {
        res.status(404).render("404.ejs");
    }
  }
  
  module.exports = { soloAlumnos, soloAlumnado, soloAdministradores };