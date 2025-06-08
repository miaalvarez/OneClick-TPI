const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  'base.oneclick',
  'root',
  null,
  {
    host: config.host,
    dialect: 'mysql',
  }
);

const db = {};

// Importar los modelos
db.Persona = require('./Persona')(sequelize, Sequelize.DataTypes);
db.Curso = require('./Curso')(sequelize, Sequelize.DataTypes);
db.Materia = require('./Materia')(sequelize, Sequelize.DataTypes);
db.CursoMateria = require('./CursoMateria')(sequelize, Sequelize.DataTypes);
db.Nota = require('./Nota')(sequelize, Sequelize.DataTypes);
db.TipoUsuario = require('./TipoUsuarios')(sequelize, Sequelize.DataTypes);

// Ejecutar asociaciones si están definidas
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sincronizar los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch(error => {
    console.error('Error al sincronizar los modelos:', error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
