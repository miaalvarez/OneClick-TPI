-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2025 a las 17:23:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `base.oneclick`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `curso_id` int(11) NOT NULL,
  `nombre_curso` varchar(100) NOT NULL,
  `orientacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`curso_id`, `nombre_curso`, `orientacion`) VALUES
(1, '1ro 1ra', 'Tecnica'),
(2, '1ro 2da', 'Tecnica'),
(3, '1ro 3ra', 'Tecnica'),
(4, '1ro 4ta', 'Tecnica'),
(5, '2do 1ra', 'Tecnica'),
(6, '2do 2da', 'Tecnica'),
(7, '2do 3ra', 'Tecnica'),
(8, '2do 4ta', 'Tecnica'),
(9, '3ro 1ra', 'Tecnica'),
(10, '3ro 2da', 'Tecnica'),
(11, '3ro 3ra', 'Tecnica'),
(12, '3ro 4ta', 'Tecnica'),
(13, '4to 1ra', 'Tecnica'),
(14, '4to 2da', 'Tecnica'),
(15, '4to 3ra', 'Tecnica'),
(16, '4to 4ta', 'Tecnica'),
(17, '5to 1ra', 'Tecnica'),
(18, '5to 2da', 'Tecnica'),
(19, '5to 3ra', 'Tecnica'),
(20, '5to 4ta', 'Tecnica'),
(21, '6to 1ra', 'Tecnica'),
(22, '6to 2da', 'Tecnica'),
(23, '6to 3ra', 'Tecnica'),
(24, '6to 4ta', 'Tecnica'),
(25, '7mo 1ra', 'Tecnica'),
(26, '7mo 2da', 'Tecnica'),
(27, '7mo 3ra', 'Tecnica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_materia`
--

CREATE TABLE `curso_materia` (
  `curso_materia_id` int(11) NOT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `materia_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso_materia`
--

INSERT INTO `curso_materia` (`curso_materia_id`, `curso_id`, `materia_id`) VALUES
(1, 25, 1),
(2, 25, 2),
(3, 25, 3),
(4, 25, 4),
(5, 25, 5),
(6, 25, 6),
(7, 25, 7),
(8, 25, 8),
(9, 25, 9),
(10, 25, 10),
(11, 26, 1),
(12, 26, 2),
(13, 26, 3),
(14, 26, 4),
(15, 26, 5),
(16, 26, 6),
(17, 26, 7),
(18, 26, 8),
(19, 26, 9),
(20, 26, 10),
(21, 27, 1),
(22, 27, 2),
(23, 27, 3),
(24, 27, 4),
(25, 27, 5),
(26, 27, 6),
(27, 27, 7),
(28, 27, 8),
(29, 27, 9),
(30, 27, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `materia_id` int(11) NOT NULL,
  `nombre_materia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`materia_id`, `nombre_materia`) VALUES
(1, 'Matemáticas Séptimo\r\n'),
(2, 'ingles tecnico Séptimo\r\n'),
(3, 'Marco Jurídico'),
(4, 'Asistencia 2'),
(5, 'Autogestión'),
(6, 'Hardware 4'),
(7, 'Prácticas Profesionalizantes 2'),
(8, 'Programación'),
(9, 'Redes 3'),
(10, 'Arduino 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `nota_id` int(11) NOT NULL,
  `persona_id` int(11) DEFAULT NULL,
  `materia_id` int(11) DEFAULT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `nota` decimal(5,2) NOT NULL,
  `cuatrimestre` int(11) NOT NULL,
  `informe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nota`
--

INSERT INTO `nota` (`nota_id`, `persona_id`, `materia_id`, `curso_id`, `nota`, `cuatrimestre`, `informe`) VALUES
(331, 46182804, 1, 25, 2.00, 1, 1),
(332, 46182804, 2, 25, 8.00, 2, 3),
(333, 46182804, 7, 25, 10.00, 2, 2),
(334, 34099123, 2, 25, 8.00, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `persona_id` int(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `tipo_usuario_id` int(11) DEFAULT NULL,
  `curso_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`persona_id`, `nombre`, `correo`, `contrasena`, `tipo_usuario_id`, `curso_id`) VALUES
(23598234, 'Hugo Barrera', 'hugo@gmail.com', '1234', 2, 7),
(25198876, 'Veronica Godoy', 'vero@gmail.com', '123', 3, 5),
(34099123, 'Araceli Yapura', 'ara@gmail.com', '123', 1, 25),
(46182804, 'mia alvarez', 'miaabialvarez@gmail.com', '1231', 1, 15),
(67008543, 'Matias Fernandez', 'mati@gmail.com', '2025', 3, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `tipo_usuario_id` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`tipo_usuario_id`, `rol`) VALUES
(1, 'alumno'),
(2, 'administrador'),
(3, 'alumnado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`curso_id`);

--
-- Indices de la tabla `curso_materia`
--
ALTER TABLE `curso_materia`
  ADD PRIMARY KEY (`curso_materia_id`),
  ADD KEY `curso_id` (`curso_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`materia_id`);

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`nota_id`),
  ADD KEY `materia_id` (`materia_id`),
  ADD KEY `curso_id` (`curso_id`),
  ADD KEY `nota_ibfk_1` (`persona_id`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`persona_id`),
  ADD KEY `curso_id` (`curso_id`),
  ADD KEY `tipo_usuario_id` (`tipo_usuario_id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`tipo_usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `curso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `curso_materia`
--
ALTER TABLE `curso_materia`
  MODIFY `curso_materia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `materia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `nota`
--
ALTER TABLE `nota`
  MODIFY `nota_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=335;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `tipo_usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `curso_materia`
--
ALTER TABLE `curso_materia`
  ADD CONSTRAINT `curso_materia_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`curso_id`),
  ADD CONSTRAINT `curso_materia_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`materia_id`);

--
-- Filtros para la tabla `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`persona_id`),
  ADD CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`materia_id`),
  ADD CONSTRAINT `nota_ibfk_3` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`curso_id`);

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`curso_id`),
  ADD CONSTRAINT `persona_ibfk_2` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`tipo_usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
