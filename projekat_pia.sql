-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2021 at 11:27 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projekat_pia`
--

-- --------------------------------------------------------

--
-- Table structure for table `izdavanje`
--

CREATE TABLE `izdavanje` (
  `id` int(11) NOT NULL,
  `idN` int(11) DEFAULT NULL COMMENT 'id Nekretnine',
  `start` date DEFAULT NULL COMMENT 'vreme pocetka',
  `end` date DEFAULT NULL COMMENT 'vreme kraja',
  `IdB` int(11) DEFAULT NULL COMMENT 'id kome se izdaje',
  `accepted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `izdavanje`
--

INSERT INTO `izdavanje` (`id`, `idN`, `start`, `end`, `IdB`, `accepted`) VALUES
(1, 55, '2021-06-20', '2021-06-22', 3, 0),
(2, 55, '2021-06-23', '2021-06-25', 4, 0),
(13, 51, '2021-06-01', '2021-12-31', 24, 0),
(17, 53, '2021-06-14', '2021-06-30', 2, 1),
(21, 53, '2021-06-01', '2021-06-09', 4, 1),
(23, 53, '2022-11-26', '2022-12-31', 2, 0),
(24, 53, '2021-06-11', '2021-06-13', 24, 1),
(27, 58, '2021-06-01', '2021-06-30', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(24) NOT NULL,
  `email` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `id` int(11) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`firstName`, `lastName`, `username`, `password`, `email`, `city`, `country`, `imagePath`, `type`, `id`, `accepted`) VALUES
('Miroslav', 'Mirković', 'miroslav123', 'Miki@123', 'miroslav@gmail.com', 'Beograd', 'Srbija', '89.JPG', 'admin', 1, 1),
('Predrag', 'Mirković', 'pedja123', 'Pedja@123', 'pedja@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 2, 1),
('Nenad', 'Mirković', 'nenad123', 'Nesa@123456', 'nenad@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 3, 1),
('Vesna', 'Mirković', 'vesna123', 'Vesna@1234', 'vesna@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 4, 1),
('Goran', 'Mirković', 'goran1234', 'Goran@1234', 'goran@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 5, 1),
('Dusan', 'Cekić', 'dusan123', 'Dusan@1234', 'dusan@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 21, 0),
('Lazar', 'Vulić', 'lazar123', 'Lazar@1234', 'lazarvulic@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 23, 0),
('Marko', 'Mitrovic', 'maremitrovic', 'Marko@1234', 'maremitrovic@gmail.com', 'Smederevo', 'Beograd', 'noImage.png', 'korisnik', 24, 1),
('Damjan', 'Vukajlović', 'dami123', 'Dami@123', 'damjan@gmail.com', 'New York', 'Amerika', 'noImage.png', 'radnik', 25, 1),
('Luka', 'Simović', 'luka123', 'Luka@1234', 'luka123@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'radnik', 27, 1),
('Bojan', 'Jankovic', 'boki123', 'Bojan@1234', 'boki@gmail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 30, 1),
('Predrag', 'Mirkovic', 'pmoe', 'Pedja1234@', 'p@mail.com', 'Beograd', 'Srbija', 'noImage.png', 'korisnik', 31, 1);

-- --------------------------------------------------------

--
-- Table structure for table `kuca`
--

CREATE TABLE `kuca` (
  `id` int(11) DEFAULT NULL,
  `floor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kuca`
--

INSERT INTO `kuca` (`id`, `floor`) VALUES
(55, 2),
(58, 3),
(69, 3);

-- --------------------------------------------------------

--
-- Table structure for table `nekretnine`
--

CREATE TABLE `nekretnine` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `community` varchar(255) DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT 0,
  `address` varchar(255) NOT NULL,
  `imagesPath` varchar(255) NOT NULL,
  `videosPath` varchar(255) NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `furnished` tinyint(1) DEFAULT 0 COMMENT '0-nenamesten\r\n1-namesten',
  `roomNumber` double DEFAULT NULL,
  `sellOrRent` tinyint(1) DEFAULT NULL COMMENT '0 - izdaje se\r\n1 - prodaje se ',
  `price` double DEFAULT NULL,
  `m2` double DEFAULT NULL,
  `promoted` tinyint(1) DEFAULT 0,
  `type` tinyint(1) NOT NULL COMMENT '0- kuca \r\n1-stan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nekretnine`
--

INSERT INTO `nekretnine` (`id`, `description`, `city`, `community`, `accepted`, `address`, `imagesPath`, `videosPath`, `owner`, `furnished`, `roomNumber`, `sellOrRent`, `price`, `m2`, `promoted`, `type`) VALUES
(51, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'Beograd', 'Novi Beograd', 1, 'Aleksinackih Rudara 1', '1.jpg,2.jpg,3.jpg,4.jpg,5.jpg,6.jpg,7.jpg', '', 'pedja123', 0, 2, 1, 80000, 67, 1, 1),
(53, 'Izdavanje luksuznih stanova Beograd/Vracar', 'Beograd', 'Vracar', 1, 'Cara Nikolaja II', '8.jpg,9.jpg,10.jpg,11.jpg,12.jpg,13.jpg', '', 'agencija', 1, 2, 0, 800, 53, 1, 1),
(54, 'Prodaje se stan u blizini Zelenog venca', 'Beograd', 'Zeleni Venac', 1, 'Kolarceva 5a', '14.jpg,15.jpg,16.jpg,17.jpg,18.jpg,19.jpg,20.jpg,21.jpg', '', 'agencija', 1, 2, 1, 90000, 50, 1, 1),
(55, 'Izdavanje lux kuca', 'Beograd', 'Palilula', 1, 'Uzdinska 5a', '22.jpg,23.jpg,24.jpg,25.jpg,26.jpg,28.jpg,29.jpg,30.jpg,31.jpg,32.jpg', '', 'agencija', 1, 5, 0, 3200, 460, 1, 0),
(56, 'Stan na prodaju - Vračar, Hrama Svetog Save', 'Beograd', 'Vračar', 1, 'Bulevar Arsenija Carnojevica 39', '33.jpg,34.jpg,35.jpg,36.jpg,37.jpg,38.jpg,39.jpg,99.jpg', '', 'pedja123', 1, 5, 1, 75000, 210, 1, 1),
(57, 'Lux Stan u Novom Sadu', 'Novi Sad', 'Novi Sad', 1, 'Ulica Milana Rakića 19b', '44.jpg,45.jpg,46.jpg,47.jpg,48.jpg,49.jpg,50.jpg,51.jpg,52.jpg,53.jpg,97.png,PBS.png', '', 'pedja123', 0, 5, 1, 200000, 230, 0, 1),
(58, 'Luksuzan stan Zagreb Hills', 'Zagreb', 'Maksimir', 1, 'Ustanicka 88h', '54.jpg,55.jpg,56.jpg,57.jpg,58.jpg,59.jpg', 'video1.mp4', 'pedja123', 0, 6, 0, 1250, 200, 0, 0),
(64, 'Beograd Blok 70 Lux stan', 'Beograd', 'Novi Beograd', 1, 'Jurija Gagarina 70a', '16.jpg,17.jpg,18.jpg,19.jpg,26.jpg,28.jpg', '', 'maremitrovic', 0, 4, 1, 70000, 80, 0, 1),
(69, 'Lux kuća na izdavanje Niš', 'Niš', 'Niš', 1, 'adresa 1', '5.jpg,28.jpg,29.jpg,32.jpg,34.jpg', '', 'agencija', 1, 5, 0, 300, 150, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `poruke`
--

CREATE TABLE `poruke` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `user1` varchar(255) NOT NULL,
  `user2` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `time` datetime NOT NULL,
  `saved` tinyint(1) NOT NULL DEFAULT 0,
  `seen` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `poruke`
--

INSERT INTO `poruke` (`id`, `title`, `user1`, `user2`, `text`, `time`, `saved`, `seen`) VALUES
(1, 'Prodaje se stan u blizini Zelenog venca', 'pedja123', 'agencija', 'Dobar dan, zeleo bih da se raspitam kod vas o stanju ove nekretnine', '2021-06-22 00:00:00', 0, 1),
(2, 'Prodaje se stan u blizini Zelenog venca', 'agencija', 'pedja123', 'Naravno, pitajete sve sto vas zanima', '2021-06-22 10:00:00', 0, 1),
(4, 'Lux Stan u Novom Sadu', 'maremitrovic', 'pedja123', 'Cao, zeleo bih da znam u kakvom je stanju nekrentnina', '2021-06-01 00:00:00', 0, 0),
(5, 'Lux Stan u Novom Sadu', 'pedja123', 'maremitrovic', 'Izvinite na kasnom odgovoru, nekretnina je u odlicnom stanju', '2021-06-10 00:00:00', 0, 0),
(8, 'Prodaje se stan u blizini Zelenog venca', 'pedja123', 'agencija', 'Ono sto me naravno zanima je da li postoji mogucnost da se nekako spusti cena?', '2021-06-22 10:52:02', 0, 1),
(9, 'Prodaje se stan u blizini Zelenog venca', 'pedja123', 'agencija', 'Zatim da li su u stanu nekada bili kucni ljubimci', '2021-06-22 10:53:00', 0, 1),
(10, 'Prodaje se stan u blizini Zelenog venca', 'agencija', 'pedja123', 'Ne postoji mogucnost da se spusti cena', '2021-06-22 11:06:00', 0, 1),
(11, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'maremitrovic', 'pedja123', 'Dobar dan, kako ste?', '2021-06-22 11:34:37', 0, 1),
(13, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'maremitrovic', 'pedja123', 'Zeleo bih da posaljem ponudu za ovu nekretninu!', '2021-06-22 12:13:09', 0, 1),
(14, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'maremitrovic', 'pedja123', 'Ponuda je poslata!', '2021-06-22 12:15:24', 0, 1),
(16, 'Izdavanje luksuznih stanova Beograd/Vracar', 'boki123', 'agencija', 'Dobar dan, poslacu vam ponudu za ovu nekretninu', '2021-06-22 12:58:34', 0, 1),
(17, 'Izdavanje luksuznih stanova Beograd/Vracar', 'boki123', 'agencija', 'Ponuda je poslata!', '2021-06-22 12:58:39', 0, 1),
(18, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'boki123', 'pedja123', 'Dobar dan, kako ste?', '2021-06-22 17:54:49', 1, 1),
(19, 'Izdavanje luksuznih stanova Beograd/Vracar', 'agencija', 'boki123', 'Kako ste gospodine', '2021-06-22 16:47:51', 0, 1),
(21, 'Izdavanje luksuznih stanova Beograd/Vracar', 'agencija', 'boki123', 'Ponuda ce biti razmotrena u narednih nekoliko dana', '2021-06-22 22:45:08', 0, 1),
(22, 'Izdavanje luksuznih stanova Beograd/Vracar', 'agencija', 'boki123', 'Idemo gasss!!!!', '2021-06-22 22:49:19', 0, 1),
(23, 'Prodaje se stan u blizini Zelenog venca', 'pedja123', 'agencija', 'Vazi, hvala na odgovoru!', '2021-06-22 23:48:17', 0, 1),
(24, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'boki123', 'dobro smo hvala na pitanju!', '2021-06-23 08:27:38', 1, 1),
(25, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'boki123', 'Kako vam mozemo pomoci?', '2021-06-23 08:27:52', 1, 1),
(26, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'maremitrovic', 'Mrs u picku materinu\n', '2021-06-23 08:37:35', 0, 1),
(27, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'boki123', 'Ok verovatno nista od dogovora', '2021-06-23 10:45:47', 1, 1),
(28, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'maremitrovic', 'Salio sam se malo\n', '2021-06-23 10:47:34', 0, 1),
(29, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'maremitrovic', 'Mirelec', '2021-06-23 10:47:52', 0, 1),
(30, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'boki123', 'Jbg', '2021-06-23 10:49:54', 1, 1),
(31, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'boki123', 'Mrs', '2021-06-23 11:00:14', 1, 1),
(32, 'Izdavanje luksuznih stanova Beograd/Vracar', 'pedja123', 'agencija', 'Dobar dan zeleo bih da iznajmim nekretninu pred kraj sledece godine', '2021-06-23 13:51:16', 0, 1),
(33, 'Izdavanje luksuznih stanova Beograd/Vracar', 'pedja123', 'agencija', 'Ponuda je poslata!', '2021-06-23 13:51:24', 0, 1),
(34, 'Lux Stan u Novom Sadu', 'pedja123', 'maremitrovic', 'Da li ste mozda zainteresovani za kupovinu?', '2021-06-23 15:17:28', 0, 0),
(35, 'Lux Stan u Novom Sadu', 'maremitrovic', 'pedja123', 'Nisam.', '2021-06-23 15:18:21', 0, 0),
(36, 'Prodaje se stan u blizini Zelenog venca', 'pedja123', 'agencija', 'Da li je mozda doslo do promene misljenja?', '2021-06-23 15:24:07', 0, 1),
(37, 'Prodaje se stan u blizini Zelenog venca', 'agencija', 'pedja123', 'Idalje nece biti spustanja cene, bicete obavesteni ukoliko dodje do nekih promena!', '2021-06-23 15:47:57', 0, 1),
(38, 'Prodaje se stan u blizini Zelenog venca', 'agencija', 'pedja123', 'Da li ste zainteresovani?', '2021-06-23 16:17:59', 0, 1),
(39, 'Lux Stan u Novom Sadu', 'maremitrovic', 'pedja123', 'Promenio sam misljenje...kolika je cena?', '2021-06-23 16:19:04', 0, 0),
(40, 'Izdavanje luksuznih stanova Beograd/Vracar', 'maremitrovic', 'agencija', 'Ponuda je poslata!', '2021-06-23 17:18:30', 0, 1),
(41, 'Lux kuća na izdavanje Niš', 'nenad123', 'agencija', 'Dobar dan zelim da vas pitam nesto veano za nekretninu...', '2021-06-24 08:33:47', 0, 1),
(42, 'Lux kuća na izdavanje Niš', 'agencija', 'nenad123', 'Slobodno pitajte sta god zelite!', '2021-06-24 08:36:08', 0, 1),
(43, 'Lux kuća na izdavanje Niš', 'agencija', 'nenad123', 'U kakvom je stanju ova kuca?', '2021-06-24 08:36:51', 0, 1),
(44, 'Lux kuća na Dedinju', 'nenad123', 'maremitrovic', 'Ponuda je poslata!', '2021-06-24 08:37:35', 0, 0),
(45, 'Lux kuća na izdavanje Niš', 'maremitrovic', 'agencija', 'Ponuda je poslata!', '2021-06-24 09:12:58', 0, 1),
(46, 'Prodaje se stan u blizini Zelenog venca', 'maremitrovic', 'agencija', 'Ponuda je poslata!', '2021-06-24 09:15:21', 0, 0),
(47, 'Izdavanje luksuznih stanova Beograd/Vracar', 'maremitrovic', 'agencija', 'Ponuda je poslata!', '2021-06-24 12:03:01', 0, 1),
(48, 'Luksuzan stan Zagreb Hills', 'vesna123', 'pedja123', 'Ponuda je poslata!', '2021-06-24 12:24:39', 0, 0),
(49, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pmoe', 'pedja123', 'Ponuda je poslata!', '2021-06-24 22:26:05', 0, 1),
(50, 'DVOSOBANa STAN NOVOGRADNJA PARK 11', 'pedja123', 'pmoe', 'Dobri Den!!!!!!!', '2021-06-24 22:27:45', 0, 1),
(51, 'Blok 23. Lux Apartman na zadnjem spratu', 'goran1234', 'agencija', 'Dobar dan!!!', '2021-06-26 18:17:04', 0, 0),
(52, 'Blok 23. Lux Apartman na zadnjem spratu', 'goran1234', 'agencija', 'Ponuda je poslata!', '2021-06-26 18:17:23', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `prihodi_agencija`
--

CREATE TABLE `prihodi_agencija` (
  `id` int(11) NOT NULL,
  `IdU` int(11) DEFAULT NULL,
  `income` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prihodi_agencija`
--

INSERT INTO `prihodi_agencija` (`id`, `IdU`, `income`) VALUES
(4, 3, '42.67'),
(6, 4, '5.33'),
(12, 21, '3700.00'),
(16, 26, '53.33'),
(17, 27, '120.83'),
(18, 28, '190000.00');

-- --------------------------------------------------------

--
-- Table structure for table `procenti`
--

CREATE TABLE `procenti` (
  `id` int(11) NOT NULL,
  `percentage` decimal(11,2) NOT NULL COMMENT 'prvi procenat je za prodaju, drugi za izdavanje'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `procenti`
--

INSERT INTO `procenti` (`id`, `percentage`) VALUES
(1, '0.02'),
(2, '0.05');

-- --------------------------------------------------------

--
-- Table structure for table `prodaja`
--

CREATE TABLE `prodaja` (
  `id` int(11) NOT NULL,
  `idN` int(11) NOT NULL,
  `idB` int(11) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prodaja`
--

INSERT INTO `prodaja` (`id`, `idN`, `idB`, `type`) VALUES
(1, 54, 2, 'kredit'),
(4, 54, 24, 'gotovina'),
(6, 51, 24, 'kredit'),
(14, 51, 31, 'gotovina');

-- --------------------------------------------------------

--
-- Table structure for table `stan`
--

CREATE TABLE `stan` (
  `id` int(11) NOT NULL,
  `floor` int(11) DEFAULT NULL,
  `totalFloors` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stan`
--

INSERT INTO `stan` (`id`, `floor`, `totalFloors`) VALUES
(51, 3, 7),
(53, 2, 3),
(54, 2, 4),
(56, 5, 20),
(57, 9, 12),
(64, 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `ugovori`
--

CREATE TABLE `ugovori` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `community` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `m2` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `roomNumber` int(11) NOT NULL,
  `furnished` tinyint(1) NOT NULL,
  `sellRent` tinyint(1) DEFAULT 0,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ugovori`
--

INSERT INTO `ugovori` (`id`, `description`, `city`, `community`, `address`, `m2`, `price`, `roomNumber`, `furnished`, `sellRent`, `idUser`) VALUES
(3, 'Izdavanje luksuznih stanova Beograd/Vracar', 'Beograd', 'Vracar', 'Cara Nikolaja II', 53, 800, 2, 1, 0, 2),
(4, 'Izdavanje luksuznih stanova Beograd/Vracar', 'Beograd', 'Vracar', 'Cara Nikolaja II', 53, 800, 2, 1, 0, 24),
(21, 'Lux kuća na Dedinju', 'Beograd', 'Savski Venac', 'Španskih boraca 70b', 250, 370000, 10, 0, 1, 3),
(26, 'Izdavanje luksuznih stanova Beograd/Vracar', 'Beograd', 'Vracar', 'Cara Nikolaja II', 53, 800, 2, 1, 0, 24),
(27, 'Luksuzan stan Zagreb Hills', 'Zagreb', 'Maksimir', 'Ustanicka 88h', 200, 1250, 6, 0, 0, 4),
(28, 'Blok 23. Lux Apartman na zadnjem spratu', 'Beograd', 'Novi Beograd', 'Bulevar Arsenija Carnojevica 39', 90, 190000, 5, 1, 1, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `izdavanje`
--
ALTER TABLE `izdavanje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idN` (`idN`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `kuca`
--
ALTER TABLE `kuca`
  ADD KEY `id` (`id`);

--
-- Indexes for table `nekretnine`
--
ALTER TABLE `nekretnine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poruke`
--
ALTER TABLE `poruke`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prihodi_agencija`
--
ALTER TABLE `prihodi_agencija`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdU` (`IdU`);

--
-- Indexes for table `procenti`
--
ALTER TABLE `procenti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prodaja`
--
ALTER TABLE `prodaja`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idN` (`idN`),
  ADD KEY `idB` (`idB`);

--
-- Indexes for table `stan`
--
ALTER TABLE `stan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ugovori`
--
ALTER TABLE `ugovori`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `izdavanje`
--
ALTER TABLE `izdavanje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `nekretnine`
--
ALTER TABLE `nekretnine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `poruke`
--
ALTER TABLE `poruke`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `prihodi_agencija`
--
ALTER TABLE `prihodi_agencija`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `procenti`
--
ALTER TABLE `procenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prodaja`
--
ALTER TABLE `prodaja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `stan`
--
ALTER TABLE `stan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `ugovori`
--
ALTER TABLE `ugovori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `izdavanje`
--
ALTER TABLE `izdavanje`
  ADD CONSTRAINT `izdavanje_ibfk_1` FOREIGN KEY (`idN`) REFERENCES `nekretnine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kuca`
--
ALTER TABLE `kuca`
  ADD CONSTRAINT `kuca_ibfk_1` FOREIGN KEY (`id`) REFERENCES `nekretnine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prihodi_agencija`
--
ALTER TABLE `prihodi_agencija`
  ADD CONSTRAINT `prihodi_agencija_ibfk_1` FOREIGN KEY (`IdU`) REFERENCES `ugovori` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prodaja`
--
ALTER TABLE `prodaja`
  ADD CONSTRAINT `prodaja_ibfk_1` FOREIGN KEY (`idN`) REFERENCES `nekretnine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prodaja_ibfk_2` FOREIGN KEY (`idB`) REFERENCES `korisnici` (`id`);

--
-- Constraints for table `stan`
--
ALTER TABLE `stan`
  ADD CONSTRAINT `stan_ibfk_1` FOREIGN KEY (`id`) REFERENCES `nekretnine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
