-- MariaDB dump 10.19-11.2.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: qph
-- ------------------------------------------------------
-- Server version	11.2.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `place` varchar(40) NOT NULL,
  `address` varchar(80) NOT NULL,
  `date` varchar(20) NOT NULL,
  `time` varchar(5) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `active` tinyint(4) NOT NULL,
  `userId` int(10) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `category` varchar(40) NOT NULL,
  `featured` tinyint(4) DEFAULT NULL,
  `organizedBy` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES
(1,'Festival Bandera','Ex Rural','Bv. Oroño 2493','Oct 7','14:30','FESTIVAL BANDERA. 4ta edición: más escenarios, nuevos espacios, nuevas propuestas, más música y más artistas ahora en la ex Rural de Rosario.',1,4,NULL,'Música',1,'AllPress'),
(2,'Feria de vinos','Materia Prima','Montevideo 2545','Oct 12','20:00','Desde Cuatro Cavas te invitamos a disfrutar de una cata de vino con cena de pasos en el bar Materia Prima. Reservá tu lugar ahora. Costo: $3.500',1,5,NULL,'Gastronomía',1,'Cuatro Cavas'),
(3,'Crack Bang Boom','Galpón 11','Estévez Boero 980','Oct 28','14:00','Crack Bang Boom es la Convención Internacional de Historietas de la Ciudad de Rosario en Argentina, la cual consiste en un evento de historietas y un popular concurso de cosplay.',1,3,'','Arte',1,'Municipalidad de Rosario'),
(4,'Dancing Mood en vivo','Sala de las Artes','Suipacha 98 bis','Oct 5','22:00','La orquesta de reggae Dancing Mood se presenta en Rosario juntoa  Rosario Smowing en una movida noche en la Sala de las Artes',1,4,'','Música',NULL,'AllPress'),
(5,'\"Preferencias del Sistema\"','Museo Castagnino','Av. Pellegrini y Bv. Oroño','Oct 17','18:00','La artista Andrea Ostera presenta \"Preferencias del Sistema\", una muestra en el marco de la Bienalsur 2023. Entrada libre y gratuita. ',1,3,'','Arte',NULL,'Municipalidad de Rosario'),
(6,'Matilda en vivo','Casa Brava','Pichincha 120','Nov 1','22:30','La banda rosarina Matilda se presenta el 1 de noviembre en Casa Brava presentando su nuevo álbum \"Bailando en la Tempestad\". Entradas: $3.000',1,4,'','Música',NULL,'AllPress'),
(7,'¿Antiheroína? Taller de teatro','Centro de Expresiones Contemporáneas','Paseo de las Artes y el río Paraná','Nov 6','12:00','A partir de juegos y dinámicas teatrales, proponemos acciones para la creación grupal y/o individual, con algunos tintes cómicos.',1,6,'','Arte',NULL,'El Otro Festival Rosario'),
(8,'Fiesta del Helado Artesanal','Parque Nacional a la Bandera','Av. Belgrano 500','Nov 15','12:00','El Parque Nacional a la Bandera será el escenario del evento más delicioso del año, la Fiesta provincial del Helado Artesanal con entrada libre y gratuita.',1,3,'','Gastronomía',NULL,'Municipalidad de Rosario'),
(9,'Colectividades 2023','Parque Nacional a la Bandera','Av. Belgrano 500','Nov 20','18:00','Llega la 39º Fiesta Nacional de Colectividades en Rosario. Evento cultural que reúne una muestra de la diversidad de culturas, de las muchas comunidades de inmigrantes que viven en la región. Durante diez noches, medio centenar de colectividades expondrá sus costumbres, música y gastronomía típica.',1,3,'','Gastronomía',NULL,'Municipalidad de Rosario'),
(10,'Un jardín de Rosas y azules','Casa Vanzo','Cochabamba 2010','Dic 12','15:00','Encuentro de bordado organizado por Michele Siquot en el espacio taller de Julio Vanzo y Rosa Wernicke. Una experiencia para compartir, a través del gesto del bordado, y disfrutar este refugio que es Casa Vanzo.',1,3,'','Arte',NULL,'Municipalidad de Rosario'),
(11,'San Patricio en Rosario','Bar Belfast','Jujuy 1341','Dic 13','21:00','Celebramos Saint Patrick’s Day. Vení a probar la real cerveza verde y todo el Whiskey Irlandés que puedas. Música en vivo, concursos y mucha diversión',1,8,'','Gastronomía',NULL,'Belfast'),
(12,'Skay y los Fakires en Rosario','Salón Metropolitano','Junín 501','Dic 18','21:00','Skay Beilinson seducirá una vez más al público local con sus cuerdas. Durante el recital visitará todos sus álbumes, desde A través del Mar de los Sargazos (2002) hasta En el corazón del laberinto (2019).',1,4,'','Música',NULL,'AllPress'),
(13,'Proyecto Objeto','Baskiat Bar','Brown 2248','Dic 21','20:00','Nos vemos en el evento más ondero de Rosario: vení a Basquiat a intervenir tu objeto y tomar algo.',1,7,'','Arte',NULL,'Proyecto Objeto');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `mail` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` tinyint(4) NOT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `active` tinyint(4) NOT NULL,
  `role` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`,`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'santiago@mail.com','Santiago','Ceron','$2b$10$AVoYAHSTCq7G0VjjUav6CeM0bQycujsn41kOgyugXmk25pKNG6gcu',0,'Admin1',1,1),
(2,'winsley@mail.com','Winsley','Jeune','$2b$10$zSBbyylpV9XZpp/5LBMmROQndMhXn/hf0IyN49.Bz4g9yqo0jrVA6',0,'Admin2',1,1),
(3,'municipalidad@gmail.com','Muni','Rosario','$2b$10$znr1e9KlwBPOubIMDPOfJ.58mrF6u5dtbYAgroXPXCwj1fxRUbx.e',0,'Municipalidad de Rosario',1,0),
(4,'allpress@gmail.com','Pablo','Gómez','$2b$10$buLg.WCtTHZekFOOOLB8teSUs/kGlzkyxh0lhZ22oN5YRPT5n3xuK',0,'AllPress',1,0),
(5,'cuatrocavas@gmail.com','Agostina','García','$2b$10$rbJXEwtXv6TTKKBzlhWmiOXyu/dWlPIqWjDMQFG97./RW7Z5TOJne',0,'Cuatro Cavas',1,0),
(6,'elotro@gmail.com','Mariana','Pérez','$2b$10$sunb8nFXbKCtWMJn3uYY8uVRxCIwSqpidaJ5cOpLLLjmYWkmHAvdq',0,'El Otro Festival Rosario',1,0),
(7,'proyectobjeto@gmail.com','Agostina','Campero','$2b$10$zkY.11BReXjr6qzj67yqseAZJlgA1SMPl7eYqahA/uwMFAlWpnwF.',0,'Proyecto Objeto',1,0),
(8,'belfast@gmail.com','Ezequiel','Ramírez','$2b$10$jaLBvOjLc6cLPnHs9Rkbd.RUcghy9iWHOj3eDLu32jM7ttwTodMJO',0,'Belfast',1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'qph'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-02 17:48:40
