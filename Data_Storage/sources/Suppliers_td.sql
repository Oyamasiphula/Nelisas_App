-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 20, 2016 at 01:32 PM
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
-- Table structure for table `Suppliers_td`
--

CREATE TABLE `Suppliers_td` (
  `id` int(11) NOT NULL,
  `Supplier_name` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Suppliers_td`
--

INSERT INTO `Suppliers_td` (`id`, `Supplier_name`) VALUES
(1, 'Makro'),
(2, 'Epping Market'),
(3, 'HomeMade'),
(4, 'Joe Spaza Shop'),
(5, 'ChinaTown');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Suppliers_td`
--
ALTER TABLE `Suppliers_td`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Suppliers_td`
--
ALTER TABLE `Suppliers_td`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
