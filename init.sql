-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 25 2024 г., 17:24
-- Версия сервера: 10.6.7-MariaDB-2ubuntu1
-- Версия PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;a
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `market`
--
CREATE DATABASE IF NOT EXISTS `market` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `market`;

-- --------------------------------------------------------

--
-- Структура таблицы `Order`
--

CREATE TABLE IF NOT EXISTS `Order` (
  `id` varchar(36) NOT NULL,
  `total_price` int(11) DEFAULT NULL,
  `products` varchar(500) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `products` (`products`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Order`
--

INSERT INTO `Order` (`id`, `total_price`, `products`, `user_id`, `created_at`) VALUES
('857194b7-1810-4109-bd71-78c4d3ba6f65', 2000, '[{\"id\":3,\"name\":\"product1_name_default\",\"description\":\"this is a product\",\"price\":1000,\"provider_id\":null,\"created_at\":\"2024-05-22T20:12:17.000Z\"},{\"id\":3,\"name\":\"product1_name_default\",\"description\":\"this is a product\",\"price\":1000,\"provider_id\":null,\"created_at\":\"2024-05-22T20:12:17.000Z\"}]', 2, '2024-05-23 18:10:42');

-- --------------------------------------------------------

--
-- Структура таблицы `Product`
--

CREATE TABLE IF NOT EXISTS `Product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `provider_id` (`provider_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Product`
--

INSERT INTO `Product` (`id`, `name`, `description`, `price`, `provider_id`, `created_at`) VALUES
(3, 'product1_name_default', 'this is a product', 1000, NULL, '2024-05-22 20:12:17');

-- --------------------------------------------------------

--
-- Структура таблицы `Provider`
--

CREATE TABLE IF NOT EXISTS `Provider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `region` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `transaction_id` varchar(12) DEFAULT NULL,
  `lastName` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transaction_id` (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`id`, `name`, `password`, `email`, `transaction_id`, `lastName`) VALUES
(2, 'Ivan', '$2a$05$WP1T48peKwntnjY4/pfTi.s1DNpk.N6yxaRMMdv0mSgdHQY7c88vG', 'test@mail.com', NULL, 'Ivanovich'),
(3, 'Ivan', '$2a$05$/KtYtTFkSdkTX8PCqe7/ku0CdH1MsSys5T31xo6zqDsXBZUaytvjO', 'test_example@mail.com', NULL, 'Ivanovich');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `Order_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `Provider` (`id`);

--
-- Ограничения внешнего ключа таблицы `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `Order` (`id`);


--
-- Метаданные
--
USE `phpmyadmin`;

--
-- Метаданные для таблицы Order
--

--
-- Метаданные для таблицы Product
--

--
-- Метаданные для таблицы Provider
--

--
-- Метаданные для таблицы User
--

--
-- Метаданные для базы данных market
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;