// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
    if (req.session && req.session.usuario) {
      // Si la sesión existe, el usuario está logueado, pasa al siguiente middleware
      return next();
    } else {
      // Si no está logueado, redirige a la página de inicio de sesión
      return res.redirect('/acceder');
    }
  };