-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 20, 2016 at 01:31 PM
-- Server version: 5.7.15-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Nels_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Products_td`
--

CREATE TABLE `Products_td` (
  `Product_id` int(11) NOT NULL,
  `Product_name` char(30) DEFAULT NULL,
  `Category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Products_td`
--

INSERT INTO `Products_td` (`Product_id`, `Product_name`, `Category_id`) VALUES
(1, 'Milk 1l', 1),
(2, 'Imasi', 1),
(3, 'Bread', 1),
(4, 'Chakalaka Can', 2),
(5, 'Gold Dish Vegetable Curry Can', 2),
(6, 'Fanta 500ml', 3),
(7, 'Coke 500ml', 3),
(8, 'Cream Soda 500ml', 3),
(9, 'Iwisa Pap 5kg', 4),
(10, 'Top Class Soy Mince', 4),
(11, 'Shampoo 1 litre', 5),
(12, 'Soap Bar', 5),
(13, 'Bananas - loose', 6),
(14, 'Apples - loose', 6),
(15, 'Mixed Sweets 5s', 7),
(16, 'Heart Chocolates', 7),
(17, 'Rose (plastic)', 8),
(18, 'Valentine Cards', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Products_td`
--
ALTER TABLE `Products_td`
  ADD PRIMARY KEY (`Product_id`),
  ADD KEY `Category_id` (`Category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Products_td`
--
ALTER TABLE `Products_td`
  MODIFY `Product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Products_td`
--
ALTER TABLE `Products_td`
  ADD CONSTRAINT `Products_td_ibfk_1` FOREIGN KEY (`Category_id`) REFERENCES `Categories_td` (`id`),
  ADD CONSTRAINT `Products_td_ibfk_2` FOREIGN KEY (`Category_id`) REFERENCES `Categories_td` (`id`),
  ADD CONSTRAINT `Products_td_ibfk_3` FOREIGN KEY (`Category_id`) REFERENCES `Categories_td` (`id`),
  ADD CONSTRAINT `Products_td_ibfk_4` FOREIGN KEY (`Category_id`) REFERENCES `Categories_td` (`id`),
  ADD CONSTRAINT `Products_td_ibfk_5` FOREIGN KEY (`Category_id`) REFERENCES `Categories_td` (`id`),
  ADD CONSTRAINT `Products_td_ibfk_6` FOREIGN KEY (`Category_id`) REFERENCES `Categories_td` (`id`),
  ADD CONSTRAINT `Products_td_ibfk_7` FOREIGN KEY (`Category_id`) REFERENCES `Categories_td` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
