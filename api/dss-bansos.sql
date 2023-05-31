/*
 Navicat Premium Data Transfer

 Source Server         : Bappeda
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : localhost:3306
 Source Schema         : dss-bansos

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 31/05/2023 09:23:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bobots
-- ----------------------------
DROP TABLE IF EXISTS `bobots`;
CREATE TABLE `bobots`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_kepala_keluargas` bigint(20) NOT NULL,
  `id_kriterias` bigint(20) NOT NULL,
  `id_subkriterias` bigint(20) NOT NULL,
  `bobot` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bobots
-- ----------------------------

-- ----------------------------
-- Table structure for calon_penerimas
-- ----------------------------
DROP TABLE IF EXISTS `calon_penerimas`;
CREATE TABLE `calon_penerimas`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_kepala_keluargas` bigint(20) NOT NULL,
  `periode` int(11) NOT NULL,
  `nilai` float(20, 6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 161 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of calon_penerimas
-- ----------------------------
INSERT INTO `calon_penerimas` VALUES (45, 15, 3, 0.956925, '2023-05-10 03:48:42', '2023-05-10 03:48:42');
INSERT INTO `calon_penerimas` VALUES (46, 16, 3, 0.747940, '2023-05-10 03:48:42', '2023-05-10 03:48:42');
INSERT INTO `calon_penerimas` VALUES (47, 17, 3, 0.746271, '2023-05-10 03:48:42', '2023-05-10 03:48:42');
INSERT INTO `calon_penerimas` VALUES (48, 19, 3, 0.746271, '2023-05-10 03:48:42', '2023-05-10 03:48:42');
INSERT INTO `calon_penerimas` VALUES (56, 15, 4, 0.830001, '2023-05-10 15:22:03', '2023-05-10 15:22:03');
INSERT INTO `calon_penerimas` VALUES (57, 16, 4, 0.745074, '2023-05-10 15:22:03', '2023-05-10 15:22:03');
INSERT INTO `calon_penerimas` VALUES (58, 17, 4, 0.773331, '2023-05-10 15:22:03', '2023-05-10 15:22:03');
INSERT INTO `calon_penerimas` VALUES (59, 19, 4, 0.387086, '2023-05-10 15:22:03', '2023-05-10 15:22:03');
INSERT INTO `calon_penerimas` VALUES (60, 20, 4, 0.421305, '2023-05-10 15:22:03', '2023-05-10 15:22:03');
INSERT INTO `calon_penerimas` VALUES (61, 21, 4, 0.461422, '2023-05-10 15:22:03', '2023-05-10 15:22:03');
INSERT INTO `calon_penerimas` VALUES (62, 22, 4, 0.461422, '2023-05-10 15:22:03', '2023-05-10 15:22:03');
INSERT INTO `calon_penerimas` VALUES (129, 20, 5, 0.873269, '2023-05-28 10:51:18', '2023-05-28 10:51:18');
INSERT INTO `calon_penerimas` VALUES (130, 21, 5, 0.703975, '2023-05-28 10:51:18', '2023-05-28 10:51:18');
INSERT INTO `calon_penerimas` VALUES (131, 22, 5, 0.703975, '2023-05-28 10:51:18', '2023-05-28 10:51:18');
INSERT INTO `calon_penerimas` VALUES (132, 15, 6, 0.830001, '2023-05-28 12:24:40', '2023-05-28 12:24:40');
INSERT INTO `calon_penerimas` VALUES (133, 16, 6, 0.745074, '2023-05-28 12:24:40', '2023-05-28 12:24:40');
INSERT INTO `calon_penerimas` VALUES (134, 17, 6, 0.773331, '2023-05-28 12:24:40', '2023-05-28 12:24:40');
INSERT INTO `calon_penerimas` VALUES (135, 19, 6, 0.387086, '2023-05-28 12:24:40', '2023-05-28 12:24:40');
INSERT INTO `calon_penerimas` VALUES (136, 20, 6, 0.421305, '2023-05-28 12:24:40', '2023-05-28 12:24:40');
INSERT INTO `calon_penerimas` VALUES (137, 21, 6, 0.461422, '2023-05-28 12:24:40', '2023-05-28 12:24:40');
INSERT INTO `calon_penerimas` VALUES (138, 22, 6, 0.461422, '2023-05-28 12:24:40', '2023-05-28 12:24:40');
INSERT INTO `calon_penerimas` VALUES (139, 15, 7, 1.000000, '2023-05-30 13:04:41', '2023-05-30 13:04:41');
INSERT INTO `calon_penerimas` VALUES (140, 16, 7, 1.000000, '2023-05-30 13:04:41', '2023-05-30 13:04:41');
INSERT INTO `calon_penerimas` VALUES (141, 15, 8, 0.830001, '2023-05-30 13:05:25', '2023-05-30 13:05:25');
INSERT INTO `calon_penerimas` VALUES (142, 16, 8, 0.745074, '2023-05-30 13:05:25', '2023-05-30 13:05:25');
INSERT INTO `calon_penerimas` VALUES (143, 17, 8, 0.773331, '2023-05-30 13:05:25', '2023-05-30 13:05:25');
INSERT INTO `calon_penerimas` VALUES (144, 19, 8, 0.387086, '2023-05-30 13:05:25', '2023-05-30 13:05:25');
INSERT INTO `calon_penerimas` VALUES (145, 20, 8, 0.421305, '2023-05-30 13:05:25', '2023-05-30 13:05:25');
INSERT INTO `calon_penerimas` VALUES (146, 21, 8, 0.461422, '2023-05-30 13:05:25', '2023-05-30 13:05:25');
INSERT INTO `calon_penerimas` VALUES (147, 22, 8, 0.461422, '2023-05-30 13:05:25', '2023-05-30 13:05:25');
INSERT INTO `calon_penerimas` VALUES (148, 20, 9, 0.873269, '2023-05-30 13:10:44', '2023-05-30 13:10:44');
INSERT INTO `calon_penerimas` VALUES (149, 21, 9, 0.703975, '2023-05-30 13:10:44', '2023-05-30 13:10:44');
INSERT INTO `calon_penerimas` VALUES (150, 22, 9, 0.703975, '2023-05-30 13:10:44', '2023-05-30 13:10:44');
INSERT INTO `calon_penerimas` VALUES (151, 20, 10, 0.873269, '2023-05-30 13:10:45', '2023-05-30 13:10:45');
INSERT INTO `calon_penerimas` VALUES (152, 21, 10, 0.703975, '2023-05-30 13:10:45', '2023-05-30 13:10:45');
INSERT INTO `calon_penerimas` VALUES (153, 22, 10, 0.703975, '2023-05-30 13:10:45', '2023-05-30 13:10:45');
INSERT INTO `calon_penerimas` VALUES (154, 15, 11, 0.830001, '2023-05-30 13:32:20', '2023-05-30 13:32:20');
INSERT INTO `calon_penerimas` VALUES (155, 16, 11, 0.745074, '2023-05-30 13:32:20', '2023-05-30 13:32:20');
INSERT INTO `calon_penerimas` VALUES (156, 17, 11, 0.773331, '2023-05-30 13:32:20', '2023-05-30 13:32:20');
INSERT INTO `calon_penerimas` VALUES (157, 19, 11, 0.387086, '2023-05-30 13:32:20', '2023-05-30 13:32:20');
INSERT INTO `calon_penerimas` VALUES (158, 20, 11, 0.421305, '2023-05-30 13:32:20', '2023-05-30 13:32:20');
INSERT INTO `calon_penerimas` VALUES (159, 21, 11, 0.461422, '2023-05-30 13:32:20', '2023-05-30 13:32:20');
INSERT INTO `calon_penerimas` VALUES (160, 22, 11, 0.461422, '2023-05-30 13:32:20', '2023-05-30 13:32:20');

-- ----------------------------
-- Table structure for daerahs
-- ----------------------------
DROP TABLE IF EXISTS `daerahs`;
CREATE TABLE `daerahs`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nama_daerah` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of daerahs
-- ----------------------------
INSERT INTO `daerahs` VALUES (1, 'Tuah Madani', '2023-02-12 09:03:19', '2023-04-08 18:08:59');
INSERT INTO `daerahs` VALUES (3, 'Tampan', '2023-02-12 09:03:59', '2023-02-12 09:03:59');
INSERT INTO `daerahs` VALUES (4, 'Tenayan Raya', '2023-04-08 18:08:35', '2023-04-08 18:08:35');
INSERT INTO `daerahs` VALUES (5, 'Bukit Raya', '2023-05-30 13:07:10', '2023-05-30 13:07:10');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for kepala_keluargas
-- ----------------------------
DROP TABLE IF EXISTS `kepala_keluargas`;
CREATE TABLE `kepala_keluargas`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_daerahs` bigint(20) NOT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `NIK` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_lahir` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_kelamin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `bobot` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `kepala_keluargas_nik_unique`(`NIK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kepala_keluargas
-- ----------------------------
INSERT INTO `kepala_keluargas` VALUES (15, 3, 'messi', '1824284676455', '19-10-1991', 'waria', 'jl. titid sakti II', '2023-05-09 07:51:38', '2023-05-09 07:51:38', '[\"3\",\"70\",\"1\",\"2\"]');
INSERT INTO `kepala_keluargas` VALUES (16, 3, 'Kurnial', '1824284676457', '19-10-1991', 'laki laki', 'jl. titid sakti II', '2023-05-09 07:52:38', '2023-05-09 07:52:38', '[\"6\",\"60\",\"3\",\"4\"]');
INSERT INTO `kepala_keluargas` VALUES (17, 4, 'Yusniar', '1824284676447', '19-10-1991', 'perempuan', 'jl. titid sakti IV', '2023-05-09 07:54:03', '2023-05-09 07:54:03', '[\"5\",\"50\",\"2\",\"6\"]');
INSERT INTO `kepala_keluargas` VALUES (19, 4, 'Hengki', '1824284676443', '19-10-1991', 'waria', 'jl. titid sakti IV', '2023-05-09 07:54:41', '2023-05-09 07:54:41', '[\"9\",\"70\",\"4\",\"6\"]');
INSERT INTO `kepala_keluargas` VALUES (20, 1, 'Ipo', '1824284676373', '19-10-1991', 'perempuan', 'jl. titid sakti IV', '2023-05-10 03:54:28', '2023-05-10 03:54:28', '[\"3\",\"80\",\"1\",\"1\"]');
INSERT INTO `kepala_keluargas` VALUES (21, 1, 'Test1', '1824284876373', '19-10-1991', 'perempuan', 'jl. titid sakti IV', '2023-05-10 03:54:53', '2023-05-10 03:54:53', '[\"3\",\"60\",\"1\",\"6\"]');
INSERT INTO `kepala_keluargas` VALUES (22, 1, 'Test2', '1824184876373', '19-10-1991', 'perempuan', 'jl. titid sakti IV', '2023-05-10 03:55:12', '2023-05-10 03:55:12', '[\"7\",\"60\",\"5\",\"6\"]');

-- ----------------------------
-- Table structure for kriterias
-- ----------------------------
DROP TABLE IF EXISTS `kriterias`;
CREATE TABLE `kriterias`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_kriteria` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bobot_kriteria` int(11) NOT NULL,
  `atribut` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `list` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '1',
  `isDeleted` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `kriterias_code_unique`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kriterias
-- ----------------------------
INSERT INTO `kriterias` VALUES (8, 'C1', 'Jumlah ART', 5, 'true', '2023-04-26 12:53:54', '2023-04-26 12:53:54', '0', '0');
INSERT INTO `kriterias` VALUES (9, 'C2', 'Luas Lantai', 4, 'false', '2023-04-26 12:54:27', '2023-04-26 12:54:27', '0', '0');
INSERT INTO `kriterias` VALUES (10, 'C3', 'Jenis Lantai', 3, 'true', '2023-04-26 12:55:16', '2023-04-26 12:55:16', '1', '0');
INSERT INTO `kriterias` VALUES (11, 'C4', 'Sumber Air Minum', 3, 'true', '2023-04-26 12:55:59', '2023-04-26 12:55:59', '1', '0');
INSERT INTO `kriterias` VALUES (12, 'C5', 'Listrik', 3, 'BENEFIT', '2023-05-30 13:02:55', '2023-05-30 13:03:16', '1', '1');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (5, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (6, '2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` VALUES (7, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (8, '2019_12_14_000001_create_personal_access_tokens_table', 1);
INSERT INTO `migrations` VALUES (9, '2023_01_23_162423_create_kriterias_table', 1);
INSERT INTO `migrations` VALUES (10, '2023_01_24_065536_create_daerahs_table', 1);
INSERT INTO `migrations` VALUES (11, '2023_01_24_065853_create_kepala_keluargas_table', 1);
INSERT INTO `migrations` VALUES (12, '2023_01_24_065854_create_sub_kriterias_table', 1);
INSERT INTO `migrations` VALUES (13, '2023_01_24_065934_create_bobots_table', 1);
INSERT INTO `migrations` VALUES (14, '2023_01_24_065950_create_calon_penerimas_table', 1);

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token`) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for sub_kriterias
-- ----------------------------
DROP TABLE IF EXISTS `sub_kriterias`;
CREATE TABLE `sub_kriterias`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_kriterias` bigint(20) NOT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sub_kriterias
-- ----------------------------
INSERT INTO `sub_kriterias` VALUES (5, 10, 'Marmet/ranit', 1, '2023-04-26 12:58:56', '2023-04-26 12:58:56');
INSERT INTO `sub_kriterias` VALUES (6, 10, 'Keramik', 2, '2023-04-26 12:59:17', '2023-04-26 12:59:17');
INSERT INTO `sub_kriterias` VALUES (7, 10, 'Parket', 3, '2023-04-26 12:59:34', '2023-04-26 12:59:34');
INSERT INTO `sub_kriterias` VALUES (8, 10, 'Ubin', 4, '2023-04-26 12:59:47', '2023-04-26 12:59:47');
INSERT INTO `sub_kriterias` VALUES (9, 10, 'Kayu', 5, '2023-04-26 13:00:01', '2023-04-26 13:00:01');
INSERT INTO `sub_kriterias` VALUES (10, 10, 'Semen', 6, '2023-04-26 13:00:31', '2023-04-26 13:00:31');
INSERT INTO `sub_kriterias` VALUES (11, 10, 'Bambu', 7, '2023-04-26 13:00:39', '2023-04-26 13:00:39');
INSERT INTO `sub_kriterias` VALUES (12, 11, 'air kemasan bermerek', 1, '2023-04-26 13:01:10', '2023-04-26 13:01:10');
INSERT INTO `sub_kriterias` VALUES (13, 11, 'air isi ulang', 2, '2023-04-26 13:01:41', '2023-04-26 13:01:41');
INSERT INTO `sub_kriterias` VALUES (14, 11, 'leding meteran', 3, '2023-04-26 13:02:00', '2023-04-26 13:02:00');
INSERT INTO `sub_kriterias` VALUES (15, 11, 'leding eceran', 4, '2023-04-26 13:02:15', '2023-04-26 13:02:15');
INSERT INTO `sub_kriterias` VALUES (16, 11, 'sumur berpompa', 5, '2023-04-26 13:02:41', '2023-04-26 13:02:41');
INSERT INTO `sub_kriterias` VALUES (17, 11, 'sumur terlindung', 6, '2023-04-26 13:02:56', '2023-04-26 13:02:56');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'azwan1', 'azwan1@bansos.com', NULL, '$2y$10$VxYeXIoLdGPW.yz.rMRTK.fuLM3t7v9dIyvEtLv6yloUCRljKez3m', NULL, '2023-01-26 19:27:22', '2023-01-26 19:27:22');
INSERT INTO `users` VALUES (2, 'azwan', 'azwan@bansos.com', NULL, '$2y$10$etmIC7hHaQ7p4cMvVjPcOulh.vk831W5CMDGH48UFKM0FnOv5Pzgy', NULL, '2023-01-26 19:27:35', '2023-01-26 19:27:35');

SET FOREIGN_KEY_CHECKS = 1;
