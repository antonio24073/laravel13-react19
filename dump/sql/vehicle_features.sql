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
-- Estrutura da tabela `vehicle_features`
--

CREATE TABLE IF NOT EXISTS `vehicle_features` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` bigint(20) DEFAULT NULL,
  `vehicle_type_id` smallint(6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `vehicle_features`
--

INSERT INTO `vehicle_features` (`id`, `label`, `value`, `vehicle_type_id`, `created_at`, `updated_at`) VALUES
(1, 'Air bag', 5, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(2, 'Alarme', 6, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(3, 'Ar condicionado', 1, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(4, 'Trava elétrica', 4, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(5, 'Vidro elétrico', 3, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(6, 'Som', 7, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(7, 'Sensor de ré', 8, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(8, 'Câmera de ré', 9, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(9, 'Blindado', 10, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(10, 'Direção hidráulica', 2, 2020, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(11, 'ABS', 1, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(12, 'Computador de bordo', 2, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(13, 'Escapamento esportivo', 3, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(14, 'Bolsa / Baú / Bauleto', 4, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(15, 'Contra peso no guidon', 5, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(16, 'Alarme', 6, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(17, 'Amortecedor de direção', 7, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(18, 'Faróis de neblina', 8, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(19, 'GPS', 9, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36'),
(20, 'Som', 10, 2060, '2020-12-08 05:27:36', '2020-12-08 05:27:36');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `vehicle_features`
--
-- ALTER TABLE `vehicle_features`
--   ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `vehicle_features`
--
ALTER TABLE `vehicle_features`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
