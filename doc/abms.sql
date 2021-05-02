CREATE DATABASE  IF NOT EXISTS `ABMS` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ABMS`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: ABMS
-- ------------------------------------------------------
-- Server version	5.6.36

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
-- Table structure for table `AbmsLog`
--

DROP TABLE IF EXISTS `AbmsLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AbmsLog` (
  `abmsLogNo` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`abmsLogNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AbmsLog`
--

LOCK TABLES `AbmsLog` WRITE;
/*!40000 ALTER TABLE `AbmsLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `AbmsLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AbmsProject`
--

DROP TABLE IF EXISTS `AbmsProject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AbmsProject` (
  `abmsProjectNo` int(11) NOT NULL AUTO_INCREMENT,
  `memberNo` int(11) DEFAULT NULL,
  `writer` varchar(100) DEFAULT NULL,
  `writerDesc` text,
  `projectTitle` varchar(100) DEFAULT NULL,
  `projectWidth` int(11) DEFAULT NULL,
  `projectHeight` int(11) DEFAULT NULL,
  `projectDesc` text,
  `projectStatus` enum('NORMAL','CONVERTING') DEFAULT 'NORMAL',
  `publicStatus` enum('Y','N') DEFAULT 'Y',
  `modifyTime` datetime DEFAULT NULL,
  `coverFileOrgName` text,
  `coverFileNewName` text,
  `coverFileLocalPath` text,
  `coverFileWebPath` text,
  `pageCount` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`abmsProjectNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AbmsProject`
--

LOCK TABLES `AbmsProject` WRITE;
/*!40000 ALTER TABLE `AbmsProject` DISABLE KEYS */;
/*!40000 ALTER TABLE `AbmsProject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClientManage`
--

DROP TABLE IF EXISTS `ClientManage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClientManage` (
  `clientManageNo` int(11) NOT NULL AUTO_INCREMENT,
  `cilientId` varchar(45) DEFAULT NULL,
  `clientIp` varchar(45) DEFAULT NULL,
  `clientName` varchar(45) DEFAULT NULL,
  `clientDes` varchar(45) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`clientManageNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientManage`
--

LOCK TABLES `ClientManage` WRITE;
/*!40000 ALTER TABLE `ClientManage` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClientManage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CoResource`
--

DROP TABLE IF EXISTS `CoResource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CoResource` (
  `coResourceNo` int(11) NOT NULL AUTO_INCREMENT,
  `orgFileName` text,
  `newFileName` text,
  `resourceType` enum('IMAGE','ICON','CLIPART') DEFAULT 'IMAGE',
  `fileType` enum('PNG','JPEG','JPG') DEFAULT NULL,
  `fileSize` int(12) DEFAULT NULL,
  `localAccessPath` text,
  `webAccessPath` text,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`coResourceNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CoResource`
--

LOCK TABLES `CoResource` WRITE;
/*!40000 ALTER TABLE `CoResource` DISABLE KEYS */;
/*!40000 ALTER TABLE `CoResource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EditorData`
--

DROP TABLE IF EXISTS `EditorData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EditorData` (
  `editorDataNo` int(11) NOT NULL AUTO_INCREMENT,
  `abmsProjectNo` int(11) DEFAULT NULL,
  `data` text,
  `type` enum('JSON','XML') DEFAULT 'JSON',
  `createTime` datetime DEFAULT NULL,
  `modifyTime` datetime DEFAULT NULL,
  PRIMARY KEY (`editorDataNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EditorData`
--

LOCK TABLES `EditorData` WRITE;
/*!40000 ALTER TABLE `EditorData` DISABLE KEYS */;
/*!40000 ALTER TABLE `EditorData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Member`
--

DROP TABLE IF EXISTS `Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Member` (
  `memberNo` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` varchar(45) DEFAULT NULL,
  `memberName` varchar(100) DEFAULT NULL,
  `memberPassword` varchar(45) DEFAULT NULL,
  `memberType` enum('SUPER','MANAGER','COMMON','GUEST') DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`memberNo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Member`
--

LOCK TABLES `Member` WRITE;
/*!40000 ALTER TABLE `Member` DISABLE KEYS */;
INSERT INTO `Member` VALUES (1,'admin','안영철','admin','SUPER',NULL);
/*!40000 ALTER TABLE `Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MemberResource`
--

DROP TABLE IF EXISTS `MemberResource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MemberResource` (
  `memberResourceNo` int(11) NOT NULL AUTO_INCREMENT,
  `abmsProjectNo` int(11) DEFAULT NULL,
  `memberNo` int(11) DEFAULT NULL,
  `resourceType` enum('IMAGE','ICON','CLIPART') DEFAULT 'IMAGE',
  `orgFileName` text,
  `newFileName` text,
  `fileType` enum('PNG','JPEG','JPG') DEFAULT NULL,
  `fileSize` int(12) DEFAULT NULL,
  `localAccessPath` text,
  `webAccessPath` text,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`memberResourceNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MemberResource`
--

LOCK TABLES `MemberResource` WRITE;
/*!40000 ALTER TABLE `MemberResource` DISABLE KEYS */;
/*!40000 ALTER TABLE `MemberResource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transform`
--

DROP TABLE IF EXISTS `Transform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transform` (
  `transfromNo` int(11) NOT NULL AUTO_INCREMENT,
  `abmsProjectNo` int(11) DEFAULT NULL,
  `transformType` enum('EPUB','HTML','PSD','PDF') DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`transfromNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transform`
--

LOCK TABLES `Transform` WRITE;
/*!40000 ALTER TABLE `Transform` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransformAttachFile`
--

DROP TABLE IF EXISTS `TransformAttachFile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TransformAttachFile` (
  `transformAttachFileNo` int(11) NOT NULL AUTO_INCREMENT,
  `abmsProjectNo` int(11) DEFAULT NULL,
  `attachFileOrgName` text,
  `attachFileNewName` text,
  `fileType` enum('A3','PDF','ZIP') DEFAULT NULL,
  `fileSize` int(12) DEFAULT NULL,
  `attachFileLocalPath` text,
  `attachFileWebPath` text,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`transformAttachFileNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransformAttachFile`
--

LOCK TABLES `TransformAttachFile` WRITE;
/*!40000 ALTER TABLE `TransformAttachFile` DISABLE KEYS */;
/*!40000 ALTER TABLE `TransformAttachFile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-17 19:35:52
