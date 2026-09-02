-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Dez-2020 às 05:45
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `carcrm`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `vehicle_motorpowers`
--

CREATE TABLE IF NOT EXISTS `vehicle_motorpowers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `vehicle_motorpowers`
--

INSERT INTO `vehicle_motorpowers` (`id`, `label`, `value`, `created_at`, `updated_at`) VALUES
(1, '1.0', 1, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(2, '1.2', 2, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(3, '1.3', 3, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(4, '1.4', 4, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(5, '1.5', 5, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(6, '1.6', 6, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(7, '1.7', 7, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(8, '1.8', 8, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(9, '1.9', 9, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(10, '2.0 - 2.9', 10, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(11, '3.0 - 3.9', 11, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(12, '4.0 ou mais', 12, '2020-12-08 05:27:36', '2020-12-08 05:27:36');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `vehicle_motorpowers`
--
-- ALTER TABLE `vehicle_motorpowers`
--   ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `vehicle_motorpowers`
--
ALTER TABLE `vehicle_motorpowers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
