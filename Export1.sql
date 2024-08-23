-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: real-estate
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `message_text` text NOT NULL,
  `property_id` int DEFAULT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `manager_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` (`id`, `name`, `location`, `price`, `description`, `manager_id`, `created_at`, `updated_at`) VALUES (1,'Tel Aviv Penthouse','Tel Aviv, Israel',1500000.00,'Luxury penthouse in Tel Aviv with a sea view.',1,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(2,'Herzliya Villa','Herzliya, Israel',2500000.00,'Spacious villa with a private pool and garden.',2,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(3,'Haifa Apartment','Haifa, Israel',800000.00,'Cozy apartment with a panoramic view of the Haifa Bay.',3,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(4,'Jerusalem House','Jerusalem, Israel',2000000.00,'Beautiful house near the Old City.',4,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(5,'Eilat Beachfront Condo','Eilat, Israel',1000000.00,'Modern condo right on the beach.',5,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(6,'Netanya Seaside Apartment','Netanya, Israel',1200000.00,'Apartment with a view of the Mediterranean Sea.',1,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(7,'Raanana Family Home','Raanana, Israel',1800000.00,'Family-friendly home in a quiet neighborhood.',2,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(8,'Ashdod Luxury Flat','Ashdod, Israel',950000.00,'Luxury flat near the Marina district.',3,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(9,'Beer Sheva Downtown Loft','Beer Sheva, Israel',700000.00,'Stylish loft in the heart of Beer Sheva.',4,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(10,'Rishon Lezion Suburban House','Rishon Lezion, Israel',1600000.00,'Charming house in a suburban area.',5,'2024-08-23 09:14:22','2024-08-23 09:14:22');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_features`
--

DROP TABLE IF EXISTS `property_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `feature_name` varchar(100) NOT NULL,
  `feature_value` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_features_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_features`
--

LOCK TABLES `property_features` WRITE;
/*!40000 ALTER TABLE `property_features` DISABLE KEYS */;
INSERT INTO `property_features` (`id`, `property_id`, `feature_name`, `feature_value`, `created_at`) VALUES (1,1,'Bedrooms','4','2024-08-23 09:14:22'),(2,1,'Bathrooms','3','2024-08-23 09:14:22'),(3,1,'Square Footage','2500','2024-08-23 09:14:22'),(4,1,'Garage','Yes','2024-08-23 09:14:22'),(5,1,'Balcony','Yes','2024-08-23 09:14:22'),(6,2,'Bedrooms','5','2024-08-23 09:14:22'),(7,2,'Bathrooms','4','2024-08-23 09:14:22'),(8,2,'Square Footage','3000','2024-08-23 09:14:22'),(9,2,'Swimming Pool','Yes','2024-08-23 09:14:22'),(10,2,'Garden','Yes','2024-08-23 09:14:22'),(11,3,'Bedrooms','2','2024-08-23 09:14:22'),(12,3,'Bathrooms','1','2024-08-23 09:14:22'),(13,3,'Square Footage','900','2024-08-23 09:14:22'),(14,3,'Balcony','Yes','2024-08-23 09:14:22'),(15,3,'Parking','No','2024-08-23 09:14:22'),(16,4,'Bedrooms','3','2024-08-23 09:14:22'),(17,4,'Bathrooms','2','2024-08-23 09:14:22'),(18,4,'Square Footage','1500','2024-08-23 09:14:22'),(19,4,'Garden','Yes','2024-08-23 09:14:22'),(20,4,'Historical Landmark','Yes','2024-08-23 09:14:22'),(21,5,'Bedrooms','2','2024-08-23 09:14:22'),(22,5,'Bathrooms','2','2024-08-23 09:14:22'),(23,5,'Square Footage','1100','2024-08-23 09:14:22'),(24,5,'Beach Access','Yes','2024-08-23 09:14:22'),(25,5,'Swimming Pool','Yes','2024-08-23 09:14:22'),(26,6,'Bedrooms','3','2024-08-23 09:14:22'),(27,6,'Bathrooms','2','2024-08-23 09:14:22'),(28,6,'Square Footage','1200','2024-08-23 09:14:22'),(29,6,'Sea View','Yes','2024-08-23 09:14:22'),(30,6,'Balcony','Yes','2024-08-23 09:14:22'),(31,7,'Bedrooms','4','2024-08-23 09:14:22'),(32,7,'Bathrooms','3','2024-08-23 09:14:22'),(33,7,'Square Footage','2000','2024-08-23 09:14:22'),(34,7,'Garden','Yes','2024-08-23 09:14:22'),(35,7,'Garage','Yes','2024-08-23 09:14:22'),(36,8,'Bedrooms','3','2024-08-23 09:14:22'),(37,8,'Bathrooms','2','2024-08-23 09:14:22'),(38,8,'Square Footage','1400','2024-08-23 09:14:22'),(39,8,'Rooftop Terrace','Yes','2024-08-23 09:14:22'),(40,8,'Parking','Yes','2024-08-23 09:14:22'),(41,9,'Bedrooms','1','2024-08-23 09:14:22'),(42,9,'Bathrooms','1','2024-08-23 09:14:22'),(43,9,'Square Footage','800','2024-08-23 09:14:22'),(44,9,'Open Floor Plan','Yes','2024-08-23 09:14:22'),(45,9,'City View','Yes','2024-08-23 09:14:22'),(46,10,'Bedrooms','3','2024-08-23 09:14:22'),(47,10,'Bathrooms','2','2024-08-23 09:14:22'),(48,10,'Square Footage','1600','2024-08-23 09:14:22'),(49,10,'Suburban Quiet','Yes','2024-08-23 09:14:22'),(50,10,'Garage','Yes','2024-08-23 09:14:22');
/*!40000 ALTER TABLE `property_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_images`
--

LOCK TABLES `property_images` WRITE;
/*!40000 ALTER TABLE `property_images` DISABLE KEYS */;
INSERT INTO `property_images` (`id`, `property_id`, `image_path`, `created_at`) VALUES (1,3,'/uploads/images/apartment1.jpg','2024-08-23 09:59:04'),(2,3,'/uploads/images/apartment2.jpg','2024-08-23 09:59:04'),(3,3,'/uploads/images/apartment3.jpg','2024-08-23 09:59:04'),(4,9,'/uploads/images/loft1.jpg','2024-08-23 09:59:04'),(5,9,'/uploads/images/loft2.jpg','2024-08-23 09:59:04'),(6,2,'/uploads/images/beachHouse1.jpg','2024-08-23 09:59:04'),(7,2,'/uploads/images/beachHouse2.jpg','2024-08-23 09:59:04'),(8,2,'/uploads/images/beachHouse3.jpg','2024-08-23 09:59:04');
/*!40000 ALTER TABLE `property_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_videos`
--

DROP TABLE IF EXISTS `property_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `video_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_videos_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_videos`
--

LOCK TABLES `property_videos` WRITE;
/*!40000 ALTER TABLE `property_videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `property_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `role_name`) VALUES (1,'Seeker'),(2,'Manager'),(3,'Property Manager'),(4,'Property Seeker');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES (1,'Avi Cohen','avi.cohen@example.com','hashed_password_1',1,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(2,'Noa Levi','noa.levi@example.com','hashed_password_2',1,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(3,'Lior Mizrahi','lior.mizrahi@example.com','hashed_password_3',1,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(4,'Yael Rosen','yael.rosen@example.com','hashed_password_4',1,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(5,'Eitan Gil','eitan.gil@example.com','hashed_password_5',1,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(6,'Shira Katz','shira.katz@example.com','hashed_password_6',2,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(7,'Daniel Levy','daniel.levy@example.com','hashed_password_7',2,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(8,'Maya Shani','maya.shani@example.com','hashed_password_8',2,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(9,'Itay Bar','itay.bar@example.com','hashed_password_9',2,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(10,'Tamar Dayan','tamar.dayan@example.com','hashed_password_10',2,'2024-08-23 09:14:22','2024-08-23 09:14:22'),(11,'Adina Ingber','Adina@gmail.com','adina',2,'2024-08-23 09:14:22','2024-08-23 09:14:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-23 13:04:53
