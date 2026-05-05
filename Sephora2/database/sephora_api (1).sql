-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 05-05-2026 a las 17:32:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sephora_api`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_producto`
--

CREATE TABLE `carrito_producto` (
  `carrito_id` bigint(20) UNSIGNED NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL,
  `pxq` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'cepillos', '2026-05-01 13:03:30', '2026-05-01 13:03:30'),
(2, 'champus', '2026-05-01 13:03:30', '2026-05-01 13:03:30'),
(3, 'makeup', '2026-05-01 13:03:30', '2026-05-01 13:03:30'),
(4, 'perfume', '2026-05-01 13:03:30', '2026-05-01 13:03:30'),
(5, 'skincare', '2026-05-01 13:03:30', '2026-05-01 13:03:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'anna@gmail.com', '$2y$12$l.mLjeXNThBeCyPbki0xv.2gaB63d7BZl.ff09TZeTneRUYkZMT9C', '2026-05-04 12:26:17', '2026-05-04 12:26:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles`
--

CREATE TABLE `detalles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pedido_id` bigint(20) UNSIGNED NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unit` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000000_create_categorias_table', 1),
(5, '2024_01_01_000001_create_productos_table', 1),
(6, '2024_01_01_000002_create_personas_table', 1),
(7, '2024_01_01_000003_create_clientes_table', 1),
(8, '2024_01_01_000004_create_empleados_table', 1),
(9, '2024_01_01_000005_create_transportistas_table', 1),
(10, '2024_01_01_000006_create_carritos_table', 1),
(11, '2024_01_01_000007_create_carrito_producto_table', 1),
(12, '2024_01_01_000008_create_pedidos_table', 1),
(13, '2024_01_01_000009_create_detalles_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_mora` date DEFAULT NULL,
  `fecha_envio` date DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `empleado_id` bigint(20) UNSIGNED DEFAULT NULL,
  `transportista_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `telf` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `nombre`, `apellido`, `telf`, `direccion`, `created_at`, `updated_at`) VALUES
(1, 'anna', 'anna', '697259804', 'asfdkas', '2026-05-04 12:26:16', '2026-05-04 12:26:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `categoria_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `img`, `categoria_id`, `created_at`, `updated_at`) VALUES
(1, 'FENTY BEAUTY - Fine Linez', 25.00, 'cepillo1.webp', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(2, 'Tangle Teezer - Desenredante', 20.00, 'cepillo2.avif', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(3, 'Denman - Definidor de Rizos', 18.00, 'cepillo3.jpg', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(4, 'GHD - Cepillo volumen', 25.50, 'cepillo4.avif', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(5, 'AVEDA - Cepillo de madera', 35.00, 'cepillo5.avif', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(6, 'GHD - Cepillo secador', 419.00, 'cepillo6.avif', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(7, 'FENTY HAIR - 3 en 1', 16.50, 'cepillo7.avif', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(8, 'HAIR RITUEL BY SISLEY - Redondo', 80.00, 'cepillo8.webp', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(9, 'SEPHORA COLLECTION - Cepillo de aire', 69.00, 'cepillo9.avif', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(10, 'TANGLE TEEZER - Compacto', 16.50, 'cepillo10.avif', 1, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(11, 'FENTY HAIR - Estuche', 55.00, 'champu1.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(12, 'OUAI - Detox', 14.80, 'champu2.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(13, 'KÉRASTASE - Bain Nutri', 34.20, 'champu3.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(14, 'GOA ORGANICS - Graso', 25.00, 'champu4.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(15, 'GOA ORGANICS - Grueso', 34.70, 'champu5.webp', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(16, 'SOL DE JANEIRO - Reparador + Fortalecedor', 14.50, 'champu6.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(17, 'FENTY HAIR - Reparador Hidratante', 16.00, 'champu7.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(18, 'OUAI - Cabello y Cuerpo', 43.90, 'champu8.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(19, 'OUAI - Cabello Fino', 35.20, 'champu9.avif', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(20, 'CHAMPO - Voluminizante', 12.00, 'champu10.webp', 2, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(21, 'BENEFIT COSMETICS - Colorete Líquido', 32.50, 'makeup1.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(22, 'GUERLAIN - Polvos Iluminadores', 60.00, 'makeup2.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(23, 'GUERLAIN - Tratamiento Con Color Protector', 52.00, 'makeup3.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(24, 'SEPHORA COLLECTION - Estrás Individuales', 8.50, 'makeup4.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(25, 'CLINIQUE - Bronceador', 30.00, 'makeup5.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(26, 'GUERLAIN - Barra De Labios', 49.90, 'makeup6.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(27, 'ARMANI - Fondo De Maquillaje', 60.00, 'makeup7.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(28, 'REM BEAUTY - Colorete Iluminador', 38.00, 'makeup8.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(29, 'GIVENCHY - Corrección De Rojeces', 54.00, 'makeup9.webp', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(30, 'PRADA - Corrector', 38.50, 'makeup10.avif', 3, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(31, 'CHANEL - N5 (Mujer)', 150.00, 'perfume1.avif', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(32, 'CHANEL - Splendide', 80.00, 'perfume2.avif', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(33, 'GIORGIO ARMANI - Acqua Di Gio (Hombre)', 85.50, 'perfume3.webp', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(34, 'CAROLINA HERRERA - Good Girl (Mujer)', 110.00, 'perfume4.avif', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(35, 'PACO RABANNE - 1 Million (Hombre)', 78.00, 'perfume5.avif', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(36, 'YVES SAINT LAURENT - Libre (Mujer)', 105.00, 'perfume6.avif', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(37, 'HUGO BOSS - Boss Bottled (Hombre)', 72.00, 'perfume7.webp', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(38, 'LANCÔME - La Vie Est Belle (Mujer)', 98.00, 'perfume8.avif', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(39, 'VERSACE - Eros (Hombre)', 82.00, 'perfume9.avif', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(40, 'MARC JACOBS - Perfect', 88.00, 'perfume10.webp', 4, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(41, 'ANUA - Limpiador Purificante', 14.50, 'skincare1.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(42, 'ANUA - Tónico Iluminador', 17.80, 'skincare2.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(43, 'CAUDALIE - Set Serum & Gelatina', 29.50, 'skincare3.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(44, 'AESTURA - Limpiador En Espuma', 16.00, 'skincare4.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(45, 'BYOMA - Gel Limpiador', 12.00, 'skincare5.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(46, 'BIODANCE - Mascarilla Iluminadora', 25.50, 'skincare6.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(47, 'BIODANCE - Mascarilla Calmante', 24.00, 'skincare7.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(48, 'NUXE - Desmaquillante Ojos Y Labios', 28.50, 'skincare8.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(49, 'DIOR - Loción De Rostro', 42.00, 'skincare9.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37'),
(50, 'SISLEY - Limpiador Facial', 94.00, 'skincare10.avif', 5, '2026-05-04 16:03:37', '2026-05-04 16:03:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transportistas`
--

CREATE TABLE `transportistas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carritos_cliente_id_foreign` (`cliente_id`);

--
-- Indices de la tabla `carrito_producto`
--
ALTER TABLE `carrito_producto`
  ADD PRIMARY KEY (`carrito_id`,`producto_id`),
  ADD KEY `carrito_producto_producto_id_foreign` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clientes_email_unique` (`email`);

--
-- Indices de la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detalles_pedido_id_foreign` (`pedido_id`),
  ADD KEY `detalles_producto_id_foreign` (`producto_id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedidos_cliente_id_foreign` (`cliente_id`),
  ADD KEY `pedidos_empleado_id_foreign` (`empleado_id`),
  ADD KEY `pedidos_transportista_id_foreign` (`transportista_id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_categoria_id_foreign` (`categoria_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `transportistas`
--
ALTER TABLE `transportistas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalles`
--
ALTER TABLE `detalles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `transportistas`
--
ALTER TABLE `transportistas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `carritos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `carrito_producto`
--
ALTER TABLE `carrito_producto`
  ADD CONSTRAINT `carrito_producto_carrito_id_foreign` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carrito_producto_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_id_foreign` FOREIGN KEY (`id`) REFERENCES `personas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD CONSTRAINT `detalles_pedido_id_foreign` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalles_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_id_foreign` FOREIGN KEY (`id`) REFERENCES `personas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pedidos_empleado_id_foreign` FOREIGN KEY (`empleado_id`) REFERENCES `empleados` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pedidos_transportista_id_foreign` FOREIGN KEY (`transportista_id`) REFERENCES `transportistas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
