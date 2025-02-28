//conexion a  la base de datos 
module.exports = {

  //entorno para el desarrolo local
  "development": {
    "username": "root",
    "password": null,
    "database": "base.oneclick",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatoAliases": false
  },

  //entorno para ejecutar pruebas automaticas
  "test": {
    "username": "root", 
    "password": null,
    "database": "base.oneclick",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatoAliases": false
  },

  //entonrno para ver en vivo el sitio
  "production": {
    "username": "root",
    "password": null,
    "database": "base.oneclick",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatoAliases": false
  }
}