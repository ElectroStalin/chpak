-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: alpico
-- ------------------------------------------------------
-- Server version	5.7.10-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientcontacts`
--

DROP TABLE IF EXISTS `clientcontacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientcontacts` (
  `IDClient` int(11) NOT NULL,
  `Email` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `PhoneNumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDClient`),
  CONSTRAINT `R_1` FOREIGN KEY (`IDClient`) REFERENCES `clients` (`IDClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientcontacts`
--

LOCK TABLES `clientcontacts` WRITE;
/*!40000 ALTER TABLE `clientcontacts` DISABLE KEYS */;
INSERT INTO `clientcontacts` VALUES (1,'vas@mail.ru',2147483647),(2,'petr@mail.ru',2147483647);
/*!40000 ALTER TABLE `clientcontacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `IDClient` int(11) NOT NULL,
  `Name` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Surname` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Qualification` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Password` char(18) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`IDClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Vasily','Petichkin','kms','228228'),(2,'Petr','Vasiliev','ms','23213228');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mountains`
--

DROP TABLE IF EXISTS `mountains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mountains` (
  `Name` char(18) CHARACTER SET latin1 NOT NULL,
  `Height` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Country` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Area` char(18) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mountains`
--

LOCK TABLES `mountains` WRITE;
/*!40000 ALTER TABLE `mountains` DISABLE KEYS */;
INSERT INTO `mountains` VALUES ('elbrus','5642','rus','kavkaz');
/*!40000 ALTER TABLE `mountains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people` (
  `IDClient` int(11) NOT NULL,
  `IDStuff` int(11) NOT NULL,
  `Name` char(18) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`IDClient`,`IDStuff`,`Name`),
  KEY `R_5` (`IDStuff`,`Name`),
  CONSTRAINT `R_4` FOREIGN KEY (`IDClient`) REFERENCES `clients` (`IDClient`),
  CONSTRAINT `R_5` FOREIGN KEY (`IDStuff`, `Name`) REFERENCES `routes` (`IDStuff`, `Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `routes` (
  `IDStuff` int(11) NOT NULL,
  `BeginDate` date DEFAULT NULL,
  `FinishDate` date DEFAULT NULL,
  `Difficult` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Finished` tinyint(1) DEFAULT NULL,
  `Name` char(18) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`IDStuff`,`Name`),
  KEY `R_3` (`Name`),
  CONSTRAINT `R_3` FOREIGN KEY (`Name`) REFERENCES `mountains` (`Name`),
  CONSTRAINT `R_7` FOREIGN KEY (`IDStuff`) REFERENCES `stuff` (`IDStuff`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stuff`
--

DROP TABLE IF EXISTS `stuff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stuff` (
  `IDStuff` int(11) NOT NULL,
  `Name` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Surname` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `qualification` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `Password` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `HireDate` date DEFAULT NULL,
  `RoutesQuantity` char(18) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`IDStuff`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stuff`
--

LOCK TABLES `stuff` WRITE;
/*!40000 ALTER TABLE `stuff` DISABLE KEYS */;
/*!40000 ALTER TABLE `stuff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stuffcontacts`
--

DROP TABLE IF EXISTS `stuffcontacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stuffcontacts` (
  `IDStuff` int(11) NOT NULL,
  `Email` char(18) CHARACTER SET latin1 DEFAULT NULL,
  `PhoneNumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDStuff`),
  CONSTRAINT `R_2` FOREIGN KEY (`IDStuff`) REFERENCES `stuff` (`IDStuff`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stuffcontacts`
--

LOCK TABLES `stuffcontacts` WRITE;
/*!40000 ALTER TABLE `stuffcontacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `stuffcontacts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-14  7:21:14
