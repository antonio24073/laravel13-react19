-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Dez-2020 às 05:44
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
-- Estrutura da tabela `vehicle_car_steerings`
--

CREATE TABLE IF NOT EXISTS `vehicle_car_steerings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `vehicle_car_steerings`
--

INSERT INTO `vehicle_car_steerings` (`id`, `label`, `value`, `created_at`, `updated_at`) VALUES
(1, 'Hidráulica', 1, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(2, 'Elétrica', 2, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(3, 'Mecânica', 3, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(4, 'Assistida', 4, '2020-12-08 05:27:36', '2020-12-08 05:27:36');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `vehicle_car_steerings`
--
-- ALTER TABLE `vehicle_car_steerings`
--   ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `vehicle_car_steerings`
--
ALTER TABLE `vehicle_car_steerings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
