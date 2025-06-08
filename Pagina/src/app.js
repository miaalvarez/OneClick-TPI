const express = require("express");
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const methodOverride = require("method-override")

const app = express();

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    })
);


let conexion = mysql.createConnection({
    host: "localhost",
    database: "base.oneclick",
    user: "root",
    password: "",
});

// Configurar la carpeta pública para servir archivos estáticos
const publico = path.resolve(__dirname, "../publica");
app.use(express.static(publico));

// Configurar el motor de vistas a usar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs"); // usar EJS como motor de vistas
app.set("views", path.resolve(__dirname, "vistas")); // establecer la carpeta de vistas en ./views

// Rutas para el inicio de la aplicación
app.use("/", require("./ruteo/ruteo")); 

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});

// Manejo de errores de acceso no autorizado (403)
app.use((err, req, res, next) => {
    if (err.status === 403) {
        return res.status(403).render('403.ejs'); // Asegúrate de tener una vista 403.ejs en tu carpeta de vistas
    }
    next(err);  // Pasar a otros manejadores si no es un error 403
});

// Manejo de 404 (página no encontrada)
app.use((req, res) => {
    res.status(404).render('404.ejs');  // Ya tienes configurada la vista 404
});



// Hace andar el servidor
const port = process.env.port || 2507;
app.listen(port, () => 
    console.log("Corriendo servidor en: http://localhost:2507/")
);