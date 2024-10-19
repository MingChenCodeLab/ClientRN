-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2024 at 03:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test12`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_users`
--

CREATE TABLE `auth_users` (
  `auth_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `verified` varchar(5) DEFAULT 'false',
  `auth_code` int(11) DEFAULT NULL,
  `verificationToken` varchar(500) NOT NULL,
  `role` int(11) DEFAULT 0,
  `refreshtoken` varchar(1000) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_users`
--

INSERT INTO `auth_users` (`auth_id`, `user_id`, `verified`, `auth_code`, `verificationToken`, `role`, `refreshtoken`, `status`) VALUES
(9, 9, 'true', NULL, 'đã xác nhận', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiYWRtaW4iOiJzdWNjZXNzIiwiaWF0IjoxNzAyOTAwMjY3LCJleHAiOjE3MzQ0MzYyNjd9.XT6pYsAgReMlQ9thWLWhCWUUENbkH0RLIeqxmPKwAdo', 1),
(10, 10, 'true', 585763, 'đã xác nhận', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImFkbWluIjoic3VjY2VzcyIsImlhdCI6MTcyNDc5MjY3NiwiZXhwIjoxNzU2MzI4Njc2fQ.PhwHwMpKl-uLJ4uaYhYr90WMVtv9IL6rIskf0KgCCCs', 0),
(11, 11, 'true', NULL, 'đã xác nhận', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImFkbWluIjoic3VjY2VzcyIsImlhdCI6MTcyNDY5MDQwNCwiZXhwIjoxNzU2MjI2NDA0fQ.Mj_KSXQ4CUkVyGhdPO8Om2w5KQyXqYu_Nb4qDdkVAII', 1),
(12, 12, 'true', NULL, 'đã xác nhận', 0, NULL, 1),
(13, 13, 'false', NULL, '02b65fb0bb82ef0b4b045e4bf5a6198ac679149c', 0, NULL, 1),
(14, 14, 'false', NULL, '92110b7f506cbd551751d119f109bdc696c75e38', 0, NULL, 1),
(15, 15, 'false', NULL, 'b1f25ce1065fc57f0e029c621d52071cc7a8ae86', 0, NULL, 1),
(16, 16, 'false', NULL, 'f7b3b993ed15f9183cb5be487f20c08841b1cfbb', 0, NULL, 1),
(17, 17, 'false', NULL, '83af300063f9de9c996cac8031ece837fad95456', 0, NULL, 1),
(18, 18, 'false', 491985, '50c9c6668eec5a2604d02b46c306bac3febe275f', 0, NULL, 1),
(19, 19, 'true', 957964, 'đã xác nhận', 0, NULL, 1),
(20, 20, 'false', 277672, '1d0d587aa7d13d863bfd3f7974b0637f2e730570', 0, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `user_id`) VALUES
(8, 9),
(9, 10),
(10, 11),
(11, 12),
(12, 19);

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `item_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_detail_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `image`) VALUES
(1, 'Giày bóng rổ', 'https://authentic-shoes.com/wp-content/uploads/2023/04/748226_01.jpg_750348a704f6432c8ca93b1d956515bb.jpeg'),
(2, 'Giầy đá bóng', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61d18281-89f5-4a1d-a0a5-3f426a8a5d03/metcon-8-workout-shoes-p9rQzn.png'),
(3, 'Giày chạy', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d646b481-eece-4618-83b6-2aef6bb85047/zoom-metcon-turbo-2-workout-shoes-jPvmwl.png'),
(4, 'Giày gym', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9b2ac01d-e0c0-456c-b4c5-079373ce857f/free-metcon-5-workout-shoes-7wNZNf.png'),
(5, 'Giầy jordon', 'https://shopgiayreplica.com/wp-content/uploads/2021/05/Jordan-1-Retro-High-University-B.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `favorites_products`
--

CREATE TABLE `favorites_products` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites_products`
--

INSERT INTO `favorites_products` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(30, 10, 32, '2024-08-02 19:16:42'),
(33, 10, 31, '2024-08-04 17:28:36'),
(185, 10, 1, '2024-08-18 10:42:48'),
(186, 10, 34, '2024-08-18 10:53:40'),
(189, 10, 40, '2024-08-18 13:05:48'),
(191, 10, 39, '2024-08-19 05:52:59'),
(193, 10, 29, '2024-08-23 00:51:37'),
(194, 19, 29, '2024-08-27 16:41:33'),
(195, 10, 45, '2024-08-27 19:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `title`, `body`, `data`, `time`, `status`) VALUES
(1, 11, '', NULL, NULL, '2023-12-16 07:09:07', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status_id` int(11) NOT NULL DEFAULT 1,
  `shipping_address_id` int(11) NOT NULL,
  `delivered_address` text DEFAULT NULL,
  `payment_method_id` int(11) NOT NULL,
  `freight_cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_status` enum('PAID','UNPAID') NOT NULL DEFAULT 'UNPAID',
  `transaction_code` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `total_amount`, `status_id`, `shipping_address_id`, `delivered_address`, `payment_method_id`, `freight_cost`, `payment_status`, `transaction_code`) VALUES
(38, 10, '2023-12-15 07:31:57', 2879002.00, 4, 4, NULL, 1, 0.00, 'UNPAID', NULL),
(39, 10, '2023-12-15 09:24:03', 5289000.00, 6, 4, NULL, 1, 10000.00, 'UNPAID', NULL),
(40, 10, '2023-12-15 10:54:07', 2939000.00, 6, 4, NULL, 2, 10000.00, 'UNPAID', '15185418'),
(41, 10, '2023-12-15 11:55:29', 2939000.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(42, 10, '2023-12-15 11:58:08', 5818002.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(43, 10, '2023-12-15 14:32:47', 2939000.00, 6, 4, NULL, 2, 10000.00, 'UNPAID', '15213318'),
(44, 10, '2023-12-15 14:55:17', 2939000.00, 5, 4, NULL, 2, 10000.00, 'PAID', '15215542'),
(45, 10, '2023-12-15 14:57:39', 2939000.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(46, 10, '2023-12-16 05:02:33', 5868000.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(47, 10, '2023-12-16 05:06:39', 2939000.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(48, 10, '2023-12-16 05:22:39', 2939000.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(49, 10, '2023-12-16 17:59:42', 8218000.00, 6, 4, NULL, 1, 10000.00, 'UNPAID', NULL),
(50, 12, '2023-12-16 19:38:31', 5737000.00, 6, 5, NULL, 1, 10000.00, 'UNPAID', NULL),
(51, 12, '2023-12-18 10:51:52', 5737000.00, 4, 5, NULL, 1, 10000.00, 'UNPAID', NULL),
(52, 10, '2024-07-25 14:57:34', 5009999.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(53, 10, '2024-07-25 15:09:42', 1939000.00, 5, 4, NULL, 1, 10000.00, 'PAID', NULL),
(54, 10, '2024-07-28 04:02:55', 3818000.00, 6, 4, NULL, 1, 0.00, 'UNPAID', NULL),
(55, 19, '2024-08-28 03:33:05', 7273199.00, 6, 7, NULL, 1, 10000.00, 'UNPAID', NULL),
(56, 19, '2024-08-28 03:33:40', 5868000.00, 1, 7, NULL, 1, 10000.00, 'UNPAID', NULL),
(57, 19, '2024-08-28 03:36:06', 10570000.00, 1, 7, NULL, 1, 10000.00, 'UNPAID', NULL),
(58, 19, '2024-08-28 03:36:55', 5868000.00, 5, 7, NULL, 1, 10000.00, 'PAID', NULL),
(59, 19, '2024-08-28 03:43:32', 9408000.00, 1, 7, NULL, 2, 10000.00, 'UNPAID', NULL),
(60, 19, '2024-08-28 03:51:48', 10009998.00, 1, 7, NULL, 2, 10000.00, 'UNPAID', NULL),
(61, 19, '2024-08-28 03:53:52', 5868000.00, 1, 7, NULL, 2, 10000.00, 'UNPAID', '28035352'),
(62, 19, '2024-08-28 04:12:26', 2939000.00, 1, 7, NULL, 2, 10000.00, 'UNPAID', '28041226'),
(63, 19, '2024-08-28 04:22:52', 86562592.00, 5, 7, NULL, 1, 10000.00, 'PAID', NULL),
(64, 10, '2024-08-28 04:33:05', 3866147.00, 1, 4, NULL, 1, 10000.00, 'UNPAID', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_detail_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_detail_id`, `order_id`, `product_detail_id`, `quantity`, `price`, `discount_amount`) VALUES
(35, 38, 9, 1, 2929000.00, NULL),
(36, 39, 6, 1, 5279000.00, NULL),
(37, 40, 9, 1, 2929000.00, NULL),
(38, 41, 9, 1, 2929000.00, NULL),
(39, 42, 9, 2, 2929000.00, NULL),
(40, 43, 9, 1, 2929000.00, NULL),
(41, 44, 9, 1, 2929000.00, NULL),
(42, 45, 9, 1, 2929000.00, NULL),
(43, 46, 9, 2, 2929000.00, NULL),
(44, 47, 9, 1, 2929000.00, NULL),
(45, 48, 9, 1, 2929000.00, NULL),
(46, 49, 9, 1, 2929000.00, NULL),
(47, 49, 6, 1, 5279000.00, NULL),
(48, 50, 7, 3, 1909000.00, NULL),
(49, 51, 7, 3, 1909000.00, NULL),
(50, 52, 10, 1, 4999999.00, NULL),
(51, 53, 9, 1, 2929000.00, NULL),
(52, 54, 7, 2, 1909000.00, NULL),
(53, 55, 29, 1, 1983199.00, NULL),
(54, 55, 19, 1, 5280000.00, NULL),
(55, 56, 9, 2, 2929000.00, NULL),
(56, 57, 7, 2, 5280000.00, NULL),
(57, 58, 9, 2, 2929000.00, NULL),
(58, 59, 11, 2, 4699000.00, NULL),
(59, 60, 8, 2, 4999999.00, NULL),
(60, 61, 9, 2, 2929000.00, NULL),
(61, 62, 9, 1, 2929000.00, NULL),
(62, 63, 6, 12, 5280000.00, NULL),
(63, 63, 25, 1, 7199000.00, NULL),
(64, 63, 16, 8, 1999199.00, NULL),
(65, 64, 14, 1, 3856147.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `status_id` int(11) NOT NULL,
  `status_code` varchar(20) NOT NULL,
  `status_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`status_id`, `status_code`, `status_name`) VALUES
(1, 'PENDING', 'đã gửi'),
(2, 'PROCESSING', 'đang xử lý'),
(3, 'SHIPPING', 'đang vận chuyển'),
(4, 'SHIPPED', 'đã vận chuyển'),
(5, 'DELIVERED', 'đã nhận'),
(6, 'CANCELED', 'đã hủy');

-- --------------------------------------------------------

--
-- Table structure for table `payment_method_types`
--

CREATE TABLE `payment_method_types` (
  `id` int(11) NOT NULL,
  `payment_method_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_method_types`
--

INSERT INTO `payment_method_types` (`id`, `payment_method_name`) VALUES
(1, 'COD'),
(2, 'VNPAY');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` text DEFAULT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `thumbnail` varchar(1500) DEFAULT NULL,
  `discount_percentage` decimal(5,2) DEFAULT 0.00,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_price`, `category_id`, `thumbnail`, `discount_percentage`, `created_at`, `updated_at`) VALUES
(1, 'Nike G.T. Jump 2 EP', 'Bạn muốn bay cao bao nhiêu? Hãy cất cánh khỏi mặt đất nhanh hơn với thiết kế giúp bạn bay lơ lửng và giữ mình trên không khi hành động theo phương thẳng đứng. Nếu bạn là một vận động viên bắn súng đang cố gắng tăng thêm lực nâng cho cú nhảy của mình, một tòa nhà chọc trời hy vọng bay lơ lửng giữa các vì sao hoặc một con thú trên mặt đất đang cố gắng đánh bại đối thủ để bật ra khỏi vành, chiếc giày này có thể thêm yếu tố bùng nổ cho cú nhảy của bạn. trò chơi. Lực nảy không giống bất cứ điều gì bạn từng cảm nhận trước đây và việc tiếp đất được giảm chấn, giúp bạn bật ngược lên trời sau khi chạm đất. Với đế ngoài bằng cao su siêu bền, phiên bản này mang lại cho bạn lực kéo trên sân ngoài trời.', 5280000.00, 3, 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/40f17abc-8b7e-4756-a768-557750354d61/gt-jump-2-ep-basketball-shoes-1F15Gp.png', 10.00, '2024-08-22 07:37:08', '2024-08-22 22:08:11'),
(27, 'Nike Court Vision Low Next Nature', 'Yêu thích vẻ ngoài cổ điển của bóng rổ thập niên 80 nhưng lại quan tâm đến văn hóa nhịp độ nhanh của trò chơi ngày nay? Gặp gỡ Nike Court Vision Low. Một sản phẩm cổ điển được phối lại với ít nhất 20% vật liệu tái chế tính theo trọng lượng, lớp phủ trên và đường khâu sắc nét vẫn giữ được linh hồn của phong cách nguyên bản. Cổ áo sang trọng, cắt thấp giúp kiểu dáng đẹp và thoải mái cho thế giới của bạn.', 1909000.00, 3, 'https://i.ibb.co/k8y5n7R/e0391e7a-e108-4ecc-bfed-fe53fbf4fe6f.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(28, 'Nike GT Cut 2 EP', 'Trong trò chơi ngày nay, những con sên chậm chân sẽ bị phát hiện và lộ diện. Người tạo không gian vẫn ở trên sàn. GT Cut 2 EP giúp bạn dừng ngay lập tức và tăng tốc trở lại làn đường rộng mở với thiết kế thấp so với mặt đất giúp giảm thiểu sự tiếp xúc với sân khi chuyển hướng. Chúng tôi đã sử dụng những hiểu biết sâu sắc từ các vận động viên nữ để tạo ra một đôi giày giúp bạn chơi nhanh và tự tin—điều mà mọi cầu thủ bóng rổ đều cần. Tách người chơi khỏi người chơi trong một thiết kế được xây dựng dựa trên việc tạo ra sự tách biệt nhưng đủ hỗ trợ để giúp bạn chơi cả ngày. Với đế ngoài bằng cao su siêu bền, phiên bản này mang lại cho bạn lực kéo trên sân ngoài trời.', 4999999.00, 1, 'https://i.ibb.co/5LpTKh1/20fe4aad-81c0-4c0f-81ca-76718194dd83.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(29, 'Nike Air Force 1 \'07', 'PHONG CÁCH HUYỀN THOẠI TINH TẾ.\r\n\r\n\r\nSự rạng rỡ vẫn tồn tại trong Nike Air Force 1 \'07, phiên bản bóng rổ nguyên bản mang đến sự thay đổi mới mẻ về những gì bạn biết rõ nhất: lớp phủ được khâu bền, lớp hoàn thiện gọn gàng và lượng đèn flash hoàn hảo giúp bạn tỏa sáng.\r\n\r\n\r\nNhững lợi ích\r\n\r\nCác lớp phủ được khâu ở phía trên tăng thêm phong cách di sản, độ bền và khả năng hỗ trợ.\r\nĐược thiết kế ban đầu cho các vòng thi đấu, đệm Nike Air tăng thêm trọng lượng nhẹ, sự thoải mái cả ngày.\r\nKiểu dáng cắt thấp mang lại vẻ ngoài gọn gàng, hợp lý.\r\nCổ áo có đệm tạo cảm giác mềm mại và thoải mái.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐế giữa xốp\r\nCác vết thủng ở ngón chân\r\nĐế cao su\r\nMàu sắc hiển thị: Đen/Đen\r\nPhong cách: CW2288-001\r\nQuốc gia/Khu vực xuất xứ: Việt Nam, Ấn Độ\r\n\r\nNguồn gốc của lực lượng không quân 1\r\n\r\nRa mắt lần đầu tiên vào năm 1982, AF-1 là đôi giày bóng rổ đầu tiên có Nike Air, tạo nên một cuộc cách mạng trong môn thể thao này đồng thời nhanh chóng thu hút được sự chú ý trên toàn thế giới. Ngày nay, Air Force 1 vẫn giữ nguyên nguồn gốc của nó với lớp đệm mềm mại và đàn hồi đã làm thay đổi lịch sử giày sneaker.', 2929000.00, 3, 'https://i.ibb.co/0yhM7mb/b7d9211c-26e7-431a-ac24-b0540fb3c00f.webp', 10.00, '2024-08-22 07:37:08', '2024-08-28 04:01:13'),
(30, 'Nike G.T. Hustle 2 EP', 'Một bước có thể tạo ra sự khác biệt hoàn toàn khi đó là điểm của trò chơi, chẳng hạn như một pha đột nhập cửa sau thành công lén lút nhưng bị chặn nếu không có một chút tách biệt hoặc một cú nhảy vào giây cuối cùng của đối thủ khiến 3 người của họ văng ra khỏi vành. Chúng tôi đã sử dụng những hiểu biết sâu sắc từ các vận động viên nữ để tạo nên giải G.T. Hustle 2 mềm mại, hỗ trợ tốt và nhẹ—điều mà mọi người chơi bóng rổ đều cần. Được trang bị lớp đệm ở lõi và Zoom Air, đôi giày này giúp bạn luôn tiến về phía trước—từ kiểm tra đến \"trận đấu đó\". Chạy nước rút, dừng lại và ghi điểm từ đầu đến cuối, tập trung vào việc chiếm ưu thế, không sa sút trong suốt chặng đường. Với đế ngoài bằng cao su siêu bền, phiên bản này mang lại cho bạn lực kéo trên sân ngoài trời.\r\n\r\n\r\nNhẹ, mượt, nhạy\r\n\r\nLớp bọt có chiều dài tối đa hoàn hảo để cung cấp khả năng giảm chấn ở tốc độ cao và giúp chân bạn không bị dịch chuyển trong giày. Chúng tôi kết hợp miếng xốp với đế đúc để tạo nên sự kết hợp mạnh mẽ giữa khả năng phản hồi mềm mại.\r\n\r\n\r\nĐộ nảy và mịn\r\n\r\nChúng tôi đã khâu một bộ Zoom Air có chiều dài đầy đủ vào phần dưới cùng của phần trên để mang lại cho bạn cảm giác đẩy xuống sàn và hoàn trả năng lượng tối ưu từ bước đầu tiên bạn thực hiện đến bước cuối cùng. Cho dù bạn đang bùng nổ trước mối đe dọa gấp ba hay chạy nước rút từ đường cơ sở này sang đường cơ sở khác, nó sẽ mang lại cho bạn khả năng phản hồi ngay dưới chân mình.\r\n\r\n\r\nTối thiểu để bạn có thể di chuyển\r\n\r\nĐược thiết kế giống như một đôi giày chạy bộ hiện đại, phần thân trên tối giản giúp giày nhẹ nhất có thể. Lưới được thiết kế sử dụng các lớp gia cố để tạo sự hỗ trợ xung quanh ngón chân, gót chân và giữa bàn chân, mang lại sự ổn định mà không tăng thêm trọng lượng.\r\n\r\n\r\nHỗ trợ mắt cá chân\r\n\r\nCổ áo có đệm, cao vừa phải giúp hỗ trợ quanh mắt cá chân mà không ảnh hưởng đến sự linh hoạt.\r\n\r\n\r\nNhiều lợi ích hơn\r\n\r\nLưỡi xốp giúp giảm áp lực ren.\r\nMẫu lực kéo xương cá Waffle mang lại cảm giác cắn và chạm tuyệt vời.\r\nMàu sắc hiển thị: Màu đỏ theo dõi/Đỏ huyền bí/linh sam/Bạc kim loại\r\nPhong cách: DJ9404-601\r\nQuốc gia/Khu vực xuất xứ: Trung Quốc', 4999999.00, 1, 'https://i.ibb.co/mN7XW9D/02b23dcb-401d-45d7-a31f-d9a553534126.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(31, 'Nike InfinityRN 4', 'Giày càng hỗ trợ tốt thì nó càng mang lại sự ổn định cho sải bước tự nhiên của bạn. Sự kết hợp giữa hỗ trợ điều chỉnh và đệm được đặt có chủ ý giúp bạn cảm thấy an toàn trong mỗi bước đi. Đế ngoài cong giúp bàn chân của bạn di chuyển nhẹ nhàng từ gót chân đến ngón chân và từ bước tiến đến bước chân. Nó làm cho mỗi bước đi trở nên tự nhiên hơn và tăng thêm hiệu quả cho quá trình chạy của bạn, giúp bạn ít lãng phí năng lượng hơn khi đạt được sải chân. Dải vừa vặn Flyknit bên trong mới (giống như dây cao su quanh giữa bàn chân của bạn) mang lại khả năng hỗ trợ đàn hồi và an toàn.\r\n\r\n\r\nĐộ phản hồi: vừa phải\r\n\r\nGiày càng phản ứng nhanh thì bạn càng nhận được nhiều năng lượng hơn sau mỗi bước đi. Cho dù bạn muốn chạy nhanh hơn một chút hay tốn ít nỗ lực hơn một chút, những đôi giày có độ đàn hồi cao sẽ giúp bạn bước đi uyển chuyển hơn một chút để đạt được hiệu quả cao hơn trong quá trình chạy. Bọt ReactX mang lại cho bạn +13% năng lượng hoàn trả so với bọt React, giúp bạn luôn sảng khoái và bồng bềnh trong suốt quá trình chạy.\r\n\r\n\r\nCó khả năng thở\r\n\r\nLớp lót chống thấm nước ở ngón chân giúp bạn luôn khô ráo khi thời tiết chuyển mùa.\r\n\r\n\r\nNhiều lợi ích hơn\r\n\r\nĐế ngoài hình bánh quế cung cấp lực kéo bền.\r\nLưỡi Flyknit có thể điều chỉnh và sang trọng.\r\nCổ áo xốp mềm mại và hỗ trợ khi chạm vào.\r\nCao su tăng ở đế ngoài mang lại lực kéo và độ bền.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nTrọng lượng: 353g (Nam size 10)\r\nĐộ sâu từ gót đến ngón chân: 9mm\r\nMàu sắc hiển thị: Trắng/Màu bạch kim/Đỏ thẫm nhạt/Nâu nhung\r\nPhong cách: DR2665-100\r\nQuốc gia/Khu vực xuất xứ: Việt Nam', 4699000.00, 3, 'https://i.ibb.co/x3nKXtX/df6a994a-bc85-4637-94bf-3ae4af43a8fe.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(32, 'Nike Invincible 3', 'Khả năng phản hồi: siêu cao\r\n\r\nGiày càng phản ứng nhanh thì bạn càng nhận được nhiều năng lượng hơn sau mỗi bước đi. Cho dù bạn muốn chạy nhanh hơn một chút hay tốn ít nỗ lực hơn một chút, những đôi giày có độ đàn hồi cao sẽ giúp bạn bước đi uyển chuyển hơn một chút để đạt được hiệu quả cao hơn trong quá trình chạy. Bọt Nike ZoomX cực kỳ nhạy và nhẹ, mang lại cho bạn độ nảy và phản ứng linh hoạt với mỗi bước đi.\r\n\r\n\r\nPhù hợp: an toàn, thoáng khí, thoải mái\r\n\r\nCông nghệ Flyknit cải tiến nâng cao vùng thoáng khí nơi chân bạn nóng lên nhiều nhất. Nó chắc chắn và bền bỉ, giúp giữ chân bạn an toàn trên mỗi dặm đường.\r\n\r\n\r\nCó gì mới về Invincible 3?\r\n\r\nĐế giữa rộng hơn mang lại độ ổn định cao hơn so với phiên bản trước của chúng tôi. Ngăn xếp xốp cao hơn phiên bản trước của chúng tôi nâng cao tiêu chuẩn về khả năng giảm chấn và sự thoải mái, trong một thiết kế đẹp mắt hơn. Lớp nhựa chắc chắn quanh gót chân nhỏ hơn so với phiên bản trước của chúng tôi trong khi vẫn mang lại sự vừa vặn, an toàn và thoải mái.\r\n\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nKhông nhằm mục đích sử dụng làm thiết bị bảo hộ cá nhân (PPE)\r\nTrọng lượng: 310g (size 9 của nam)\r\nĐộ sâu từ gót đến ngón chân: 9mm\r\nDo cập nhật thiết kế, dòng chữ ở gót chân của sản phẩm bạn mua có thể khác với dòng chữ ở gót chân được mô tả trên Nike.com. Trong trường hợp có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận dịch vụ tiêu dùng của Nike.\r\nMàu sắc hiển thị: Tiếng ồn Aqua/Đại dương hạnh phúc/Vực thẳm xanh\r\nPhong cách: DR2615-401\r\nQuốc gia/Khu vực xuất xứ: Việt Nam', 1000000.00, 3, 'https://i.ibb.co/QFWQ1C8/478926ab-d0d9-4d8e-a12c-121c4a163200.webp', 1.00, '2024-08-22 07:37:08', '2024-08-23 13:23:26'),
(33, 'Nike Tiempo Legend 10 Club', 'Ngay cả Huyền thoại cũng tìm cách phát triển. Cho dù bạn mới bắt đầu hay chỉ chơi để giải trí, phiên bản mới nhất của giày Câu lạc bộ này sẽ giúp bạn thi đấu trên sân mà không ảnh hưởng đến chất lượng. Các đường viền bằng da tổng hợp ôm sát bàn chân của bạn và không bị giãn quá mức, giúp bạn kiểm soát tốt hơn. Nhẹ hơn và đẹp hơn bất kỳ Tiempo nào khác cho đến nay, Legend 10 dành cho bất kỳ vị trí nào trên sân, cho dù bạn đang gửi một đường chuyền chính xác xuyên qua hàng phòng ngự hay theo dõi để ngăn chặn một pha đột phá.\r\n\r\n\r\nCảm ứng khuếch đại\r\n\r\nDa tổng hợp đúc mô phỏng cảm giác được chần bông để cải thiện cảm giác chạm.\r\n\r\n\r\nTạo đường nét tự nhiên, phù hợp\r\n\r\nKhuôn da tổng hợp ôm sát bàn chân và giúp bạn kiểm soát tốt hơn, giúp bạn luôn thoải mái trong trận đấu.\r\n\r\n\r\nLực kéo cho sân\r\n\r\nTấm đặt các đinh tán hình nón ở gót chân để tạo lực kéo và độ ổn định tối ưu khi phanh và đổi hướng—vừa phải trong mọi điều kiện.\r\n\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐể sử dụng trên bề mặt tự nhiên và tổng hợp\r\nĐế đệm\r\nMàu sắc hiển thị: Trắng/Đỏ tươi/Đen\r\nPhong cách: DV4344-100\r\nQuốc gia/Khu vực xuất xứ: Việt Nam', 1609000.00, 2, 'https://i.ibb.co/52sqsWp/5d6de434-d587-4181-8499-65a539a004ce.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(34, 'Nike Mercurial Superfly 9 Academy', 'Chào mừng đến với sân đấu, Zoom\r\n\r\nLần đầu tiên trong lịch sử của chúng tôi, Nike đã phát triển một bộ Zoom Air hoàn toàn mới. Nó nằm trong tấm đế và mang lại cảm giác đàn hồi dưới chân, giúp bạn di chuyển nhanh hơn trên sân và tạo ra sự tách biệt khi điều đó quan trọng nhất—cho dù bạn đang ghi bàn, là người đầu tiên nhận bóng hay vượt qua các hậu vệ.\r\n\r\n\r\nLái xe tốc độ của bạn\r\n\r\nLồng tốc độ bên trong cấu trúc được làm từ vật liệu mỏng nhưng chắc chắn giúp cố định bàn chân vào đế ngoài mà không tăng thêm trọng lượng để khóa tối ưu.\r\n\r\n\r\nĐào vào, cất cánh\r\n\r\nMẫu lực kéo độc đáo cung cấp lực kéo siêu tích điện với khả năng nhả nhanh để tạo sự tách biệt.\r\n\r\n\r\nCải thiện sự phù hợp\r\n\r\nFlyknit quấn mắt cá chân của bạn bằng vải mềm, co giãn để mang lại cảm giác an toàn. Thiết kế được làm lại giúp cải thiện độ vừa vặn để mô phỏng bàn chân tốt hơn. Chúng tôi đã thực hiện điều này bằng cách tiến hành nhiều cuộc kiểm tra độ mòn trên hàng trăm vận động viên. Kết quả là phần ngón chân có đường nét hơn và khả năng khóa gót chân tốt hơn.\r\n\r\n\r\nCảm giác chân trần\r\n\r\nPhần trên có NikeSkin, một chất liệu lưới mềm và dẻo được liên kết với nhau bằng một lớp phủ mỏng. Nó giúp kiểm soát bóng và thực sự mang lại cho bạn cảm giác như đang chơi bóng bằng chân trần.\r\n\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐể sử dụng trên bề mặt tự nhiên và tổng hợp\r\nĐế đệm\r\nMàu sắc hiển thị: Đen/Hyper Royal/Chrome\r\nPhong cách: DJ5625-040\r\nQuốc gia/Khu vực xuất xứ: Trung Quốc', 3856147.00, 2, 'https://i.ibb.co/BKLWjqL/98fd9b9f-775d-452e-9e91-5135da978368.webp', 99.00, '2024-08-22 07:37:08', '2024-08-28 00:33:37'),
(35, 'Nike Zoom Metcon Turbo 2', 'Nike Zoom Metcon Turbo 2 mang lại tốc độ hưng phấn cho quá trình tập luyện hàng ngày của bạn. Nó kết hợp sự ổn định và khả năng phản hồi trong một gói nhẹ để giúp bạn di chuyển nhanh chóng trong quá trình luyện tập theo mạch, các bài tập cường độ cao trên máy chạy bộ, bài tập tim mạch mà bạn đã thực hiện trên đường về nhà—bất cứ điều gì bạn chọn. Từ đệm Zoom Air dưới chân cho đến dây quấn ở mu bàn chân, mọi chi tiết đều được tinh giản để giảm thiểu trọng lượng đồng thời tối đa hóa chức năng và độ bền. Vật liệu nhẹ hơn, chắc chắn hơn được chế tạo để mang lại tốc độ và sức mạnh.\r\n\r\n\r\nĐệm cho tốc độ\r\n\r\nZoom Air nhẹ và phản hồi nhanh cho các chuyển động nhanh, lặp đi lặp lại như nhảy hộp và nhảy hai lần. Bạn có được lò xo khi cất cánh và cảm giác êm ái khi hạ cánh. Bọt Nike React nhẹ và phản ứng nhanh cho các chuyển động nhanh, lặp đi lặp lại như nhảy hộp và nhảy hai chân. Bạn có được lò xo khi cất cánh và cảm giác êm ái khi hạ cánh.\r\n\r\n\r\nMạnh mẽ nhưng thoáng khí\r\n\r\nMu bàn chân phía trên mỏng và nhẹ nhưng vẫn dẻo dai để chống mài mòn. Lưới ở phần bên ngoài giúp thoáng khí khi tập ở nhiệt độ cao.\r\n\r\n\r\nCàng đơn giản càng đẹp\r\n\r\nCác tính năng mà bạn yêu thích, chẳng hạn như dây quấn và kẹp gót chân trồng cây chuối, đã được thiết kế lại và giảm bớt để giảm bớt trọng lượng. Chúng cung cấp cho bạn chức năng và độ bền tương tự, trừ đi trọng lượng.\r\n\r\n\r\nNhiều lợi ích hơn\r\n\r\nGót chân rộng, phẳng giúp bạn đứng vững.\r\nĐế cao su dẻo dẻo giúp bàn chân uốn cong thoải mái.\r\nMàu sắc hiển thị: Ngọc trong suốt/Mòng mòng Geode/Rừng sâu/Trắng\r\nPhong cách: DH3392-302\r\nQuốc gia/Khu vực xuất xứ: Việt Nam', 4409000.00, 4, 'https://i.ibb.co/1sdNM9L/07d1d2ef-4e45-4474-802c-c5fca3814391.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(36, 'Nike Air Max Alpha Trainer 4', 'ĐỆM ỔN ĐỊNH CHO CÁC CÔNG VIỆC TUYỆT VỜI NHẤT.\r\n\r\n\r\nThực hiện các bài tập cường độ cao nhất của bạn với Nike Air Max Alpha Trainer 4. Đế rộng, phẳng với đệm Nike Air mang lại cho bạn sự ổn định thoải mái khi nâng. Gót chân được thiết kế lại với lớp đệm hỗ trợ giúp giảm tải trong những hiệp đấu nặng nhất của bạn. Mọi thứ kết hợp với nhau trong một chiếc giày bền được thiết kế để chịu được điều kiện khắc nghiệt của phòng tập.\r\n\r\n\r\nTăng cường để hỗ trợ\r\n\r\nPhần bọc gót chân tiếp xúc với dây buộc ở giữa bàn chân, để hỗ trợ trong các động tác bùng nổ. Lưới bền, miếng dán và lớp phủ chắc chắn giúp chân bạn được thở trong khi đáp ứng nhu cầu tập luyện hàng ngày.\r\n\r\n\r\nĐệm cho thoải mái\r\n\r\nBọt với bộ phận Max Air ở gót chân đệm bàn chân của bạn, mang lại sự thoải mái kéo dài suốt thời gian bạn làm việc. Vòng cổ đệm mắt cá chân của bạn từ động tác này sang động tác tiếp theo.\r\n\r\n\r\nNền tảng vững chắc\r\n\r\nĐế phẳng, rộng với mặt đế cao su mang lại cho bạn sự ổn định và lực kéo. Cao su quấn bên hông để giữ chân bạn chắc chắn trên đế trong khi di chuyển sang bên.', 1999199.00, 4, 'https://i.ibb.co/XYpgSVq/2cfa0834-2b63-4b2a-92db-987c2f58428a.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(37, 'Jordan Max Aura 5', 'Khi bạn cần một đôi giày luôn sẵn sàng 24/7, đó phải là Max Aura 5. Lấy cảm hứng từ AJ3, đôi giày này tạo nên nét hiện đại trên nền cổ điển. Chúng được làm từ da và vải bền, bên trên có lớp đệm Nike Air ở gót để bạn có thể đi bộ, chạy hoặc trượt băng cả ngày mà vẫn có cảm giác thoải mái ở đế.\r\n\r\n\r\nNhững lợi ích\r\n\r\nCác đơn vị Nike Air-Sole cung cấp đệm nhẹ.\r\nĐế ngoài cao su tăng thêm lực kéo hàng ngày.\r\nNhựa chắc chắn xung quanh gót chân tăng thêm sự hỗ trợ.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nNhãn Jumpman trên lưỡi\r\nKhoen tham khảo AJ3\r\nPhần gót nhựa chắc chắn lấy cảm hứng từ khuôn AJ3\r\nMàu sắc hiển thị: Trắng/Đỏ Varsity/Xám sói/Đen\r\nPhong cách: DZ4353-101\r\nQuốc gia/Khu vực xuất xứ: Việt Nam', 3829000.00, 5, 'https://i.ibb.co/smJkW15/041d6fbb-f3a5-4e18-906d-b83bf4086587.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(39, 'Nike Full Force Low', 'Một đôi giày mới với nét hấp dẫn cổ điển—giấc mơ cổ điển của bạn vừa trở thành hiện thực. Thiết kế tối giản này lấy cảm hứng từ AF-1 cổ điển, sau đó chuyển sang phong cách thập niên 80 với đường khâu ngược và màu sắc lấy cảm hứng từ trường đại học. Tuy nhiên, không phải mọi thứ đều phải cũ—sự thoải mái và độ bền hiện đại giúp chúng dễ dàng đeo mọi lúc, mọi nơi. Đã đến lúc ném chúng vào và dùng hết sức lực.\r\n\r\n\r\nNhững lợi ích\r\n\r\nDa trên có độ tuổi mềm mại hoàn hảo.\r\nChọn từ nhiều cách phối màu lấy cảm hứng từ trường đại học để phù hợp với mọi tâm trạng và diện mạo.\r\nLớp bọt tiếp xúc cho phép bạn cảm nhận được sự mềm mại chạy hoàn toàn dưới chân.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐế giữa xốp\r\nĐế giày cao su\r\nMàu sắc hiển thị: Trắng/Thiếc/Cánh buồm/Đen\r\nPhong cách: FB1362-101\r\nQuốc gia/Khu vực xuất xứ: Việt Nam', 2649000.00, 3, 'https://i.ibb.co/R7XJ5F3/3f6727f7-0f97-4ab3-978d-e5ab6b1fdfb6.webp', 99.00, '2024-08-22 07:37:08', '2024-08-26 20:22:46'),
(40, 'Nike Phantom GX 2 Elite Electric', 'This product is excluded from site promotions and discounts.\r\nObsessed with perfecting your craft? We made this for you. In the middle of the storm, with chaos swirling all around you, you\'ve calmly found the final third of the pitch, thanks to your uncanny mix of on-ball guile and grace. Go finish the job in the Phantom GX 2 Elite. Revolutionary Nike Gripknit covers the striking area of the boot while Nike Cyclone 360 traction helps guide your unscripted agility. We design Elite boots for you and the world\'s biggest stars to give you high-level quality, because you demand greatness from yourself and your footwear.', 7779000.00, 2, 'https://i.ibb.co/rMhKZGY/PHANTOM-GX-II-ELITE-FG-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(41, 'Nike Tiempo Legend 10 Elite Electric', 'This product is excluded from site promotions and discounts.\r\nEven Legends find ways to evolve. The latest iteration of this Elite boot has all-new FlyTouch Plus engineered leather. Softer than natural leather, it contours to your foot and works with All Conditions Control (a grippy texture even in wet weather) so you can dictate the pace of your game. Lighter and sleeker than any other Tiempo to date, the Legend 10 is for any position on the pitch, whether you\'re sending a pinpoint pass through the defence or tracking back to stop a break-away.\r\n\r\nColour Shown: Multi-Colour/Multi-Colour\r\nStyle: FQ3249-900', 7199000.00, 2, 'https://i.ibb.co/Mf2tHPq/LEGEND-10-ELITE-FG-OLY-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(42, 'Nike Mercurial Vapor 15 Academy', 'This product is made with at least 20% recycled content by weight\r\n\r\n\r\nThe pitch is yours when you lace up in the Vapor 15 Academy IC. It\'s loaded with a Zoom Air unit and flexible NikeSkin at the top for exceptional touch, so you can dominate in the waning minutes of a match—when it matters most. Fast is in the Air.\r\n\r\n\r\nColour Shown: Lemonade/Black\r\nStyle: DJ5633-700', 1983199.00, 2, 'https://i.ibb.co/BqRTm1m/ZOOM-VAPOR-15-ACADEMY-IC-1.webp', 99.00, '2024-08-22 07:37:08', '2024-08-28 00:33:34'),
(43, 'Nike React Gato', 'The Nike React Gato brings a new level of underfoot control and cushioning to the court. Flexible pods improve your feel on the ball and Nike React cushioning keeps you moving as you drag and cut across the court.\r\n\r\n\r\nColour Shown: Fuchsia Dream/Lilac Bloom\r\nStyle: CT0550-500', 4109000.00, 2, 'https://i.ibb.co/g6kWsB2/NIKE-REACTGATO-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(44, 'Nike Phantom Luna 2 Elite', 'We make Elite football boots for those obsessed with the game, the hidden gems that grind in the shadows, behind the scenes, when nobody else is watching. This special-edition Phantom Luna 2 is no exception. Featuring a metallic Swoosh design, they will be on the feet of the best players as they take to the pitch of the world\'s biggest tournaments. Add in game-changing Nike Gripknit for exceptional touch and you have a championship-level boot ready for personal brilliance.\r\n\r\n\r\nColour Shown: Atmosphere Grey/Black\r\nStyle: FN6922-001', 8349000.00, 2, 'https://i.ibb.co/b6f0Nhs/PHANTOM-LUNA-II-ELITE-FG-AS-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(45, 'Nike Pegasus 41', 'Responsive cushioning in the Pegasus provides an energised ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole. Plus, improved engineered mesh on the upper decreases weight and increases breathability.\r\n\r\n\r\nColour Shown: Black/Anthracite/White\r\nStyle: FN4932-002\r\nCountry/Region of Origin: China', 3829000.00, 3, 'https://i.ibb.co/3h048qf/AIR-ZOOM-PEGASUS-41-WIDE-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(46, 'Nike Streakfly', 'Our lightest racing shoe, the Nike Streakfly is all about the speed you need to take on the competition in a mile, 5K or 10K race. Low profile with sleek details, it feels like it disappears on your foot to help you better connect with the road on the way to your personal best.\r\n\r\n\r\nColour Shown: White/Vivid Grape/Purple Agate/Black\r\nStyle: DJ6566-104\r\nCountry/Region of Origin: Vietnam', 4699000.00, 3, 'https://i.ibb.co/wcKvHcB/NIKE-ZOOMX-STREAKFLY-2.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(47, 'Nike Pegasus Trail 5 GORE-TEX', 'The winterized Pegasus Trail 5 provides wet-weather protection for trail running. A waterproof GORE-TEX upper, an all-terrain outsole and reflective design details throughout help you comfortably take on the elements. Combined with an Air Zoom unit and a ReactX foam midsole, it gives you responsive cushioning for an energised ride. This special design sends you to the South Kaibab Trail in the Grand Canyon, as part of our ongoing #IYKYK series.\r\n\r\n\r\nColour Shown: Red Stardust/Bicoastal/Vivid Grape/Green Frost\r\nStyle: FQ0908-600\r\nCountry/Region of Origin: Vietnam', 4999000.00, 3, 'https://i.ibb.co/Jxbd73x/NIKE-PEGASUS-TRAIL-5-GTX-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(48, 'Nike Ultrafly', 'Manifest your mountainous best, when the trail ahead is skiddy and uncertain. Our all-new championship trail-racing shoe melds our best speed components from the running world with what you need to plant your flag first at the finishing line. It offers peak performance, sleek speed and endurance for those who want to summit nature\'s playground.\r\n\r\n\r\nColour Shown: Bright Crimson/White/Black\r\nStyle: DX1978-600\r\nCountry/Region of Origin: China', 7349000.00, 3, NULL, 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(49, 'Nike Zegama Trail 2', 'Up the mountain, through the woods, to the top of the trail you can go. Equipped with an ultra-responsive ZoomX foam midsole, the Zegama Trail 2 is designed to conquer steep ridges, jagged rocks and races from trailhead to tip. Optimal cushioning complements a rugged outsole made for your trail-running journey.\r\n\r\n\r\nColour Shown: Black/Velvet Brown/Metallic Platinum/Anthracite\r\nStyle: FD5190-002\r\nCountry/Region of Origin: China', 5279000.00, 3, 'https://i.ibb.co/3BLBd38/NIKE-ZOOMX-ZEGAMA-TRAIL-2-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(50, 'Freak 5 EP', 'Giannis\'s internal engine revs from deep within, requiring a shoe that can harness his superpower abilities. Enter the Freak 5. Stacked with stunning speed for super-quick first steps, stuffed with that sort of springy cushioning that can withstand the all-game grind, his signature shoe lets you feel like the Greek Freak. Blow past your opponent en route to the rim while sticking with quick-twitch ball-handlers when a defensive stand decides the game. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.\r\n\r\n\r\nColour Shown: Photo Blue/Metallic Silver/Barely Volt/Black\r\nStyle: DX4996-402\r\nCountry/Region of Origin: China', 3669000.00, 1, 'https://i.ibb.co/0mTb4qD/ZOOM-FREAK-5-EP-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(51, 'LeBron Witness 8 EP', 'When you step on the floor, what kind of performance do you want to put on? Stop the show in these LeBron Witness 8s and let them know there are no limits to your flair and full-scale skills. This sleek and boldly sculpted shoe offers stability when exploding and soft landings when you come back to the ground, allowing kingpins like you and LeBron to bound, brake and bolt from baseline to baseline. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.\r\n\r\n\r\nColour Shown: Glacier Blue/Light Armoury Blue/Lilac Bloom/White\r\nStyle: FB2237-401\r\nCountry/Region of Origin: Vietnam', 2343199.00, 1, 'https://i.ibb.co/GkPyHZm/LEBRON-WITNESS-VIII-EP-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(52, 'Tatum 1 \"St. Louis\" PF', '\"Everybody who knows me knows that my love for St. Louis runs deep … \" So deep that we made a special-edition colourway to celebrate Jay\'s hometown. The bold combo of red and white will make anyone from The Lou do a double-take. Fleur-de-lis designs on the heel and insole nod to the city\'s flag. And Archer Avenue? Well, that\'s where it all started for Jayson. Continue the journey by honouring his roots in the Tatum 1 \'St. Louis\'.\r\n\r\n\r\nColour Shown: White/University Blue/University Gold/University Red\r\nStyle: DX6732-100\r\nCountry/Region of Origin: Vietnam', 3519000.00, 1, 'https://i.ibb.co/swLthd0/JORDAN-TATUM-1-PF-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(53, 'Nike G.T. Hustle 2 EP', 'One step can make all the difference when it\'s game point, like a sneaky successful back-door layup that\'s blocked if not for a sliver of separation, or a last-second leap at your opponent that sends their 3 clanking off the rim. We used insights from female athletes to make the G.T. Hustle 2 soft, supportive and lightweight—which every basketball player needs. Loaded with cushioning in the core and Zoom Air, this shoe helps you stay moving forwards—from check-up to \"that\'s game\". Sprint, stop and score from end to end, focusing on dominating, not deteriorating, down the stretch. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.\r\n\r\n\r\nColour Shown: White/Malachite/Pure Platinum/Vintage Green\r\nStyle: DJ9404-103\r\nCountry/Region of Origin: China', 3249349.00, 1, 'https://i.ibb.co/Bjq8mkY/AIR-ZOOM-G-T-HUSTLE-2-EP-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(54, 'LeBron XXI EP', 'Last time around, LeBron flipped the script on his shoe game as only the King can. The encore is even better. The LeBron XXI has a cabling system that works with Zoom Air cushioning and a light, low-to-the-ground design, giving you agile fluidity and explosiveness without excess weight. Created for your ascent, it\'s ideal for Bron-like open-floor attacks and rising towards the rim when the game\'s pace turns up. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.\r\n\r\n\r\nColour Shown: Oil Green/Volt/Volt\r\nStyle: FV2346-302\r\nCountry/Region of Origin: China', 3814849.00, 1, NULL, 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(55, 'Air Jordan Mule', 'Slide into pre- and post-game paradise, whether you\'re sailing to the 19th hole after a career low or ramping up for the round ahead in the all-new Jordan 1 G Mule. It\'s easily accessible, eye-poppingly eccentric and complete with timeless Jordan ethos and comfort.\r\n\r\n\r\nColour Shown: Black/White/Royal\r\nStyle: FJ1214-002\r\nCountry/Region of Origin: China', 2929000.00, 5, 'https://i.ibb.co/X75QqJk/AIR-JORDAN-MULE-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(56, 'Tatum 2 \'Sidewalk Chalk\' PF', 'Pastels swirl, bringing to mind the hype of a new game. And the Tatum 2 has court-ready tech to help you with energy return through the 4th and beyond. So get out there, have some fun—and get that W.\r\n\r\n\r\nColour Shown: Light Soft Pink/Smoke/Lilac/Mint Foam\r\nStyle: FZ2203-600\r\nCountry/Region of Origin: Vietnam', 3669000.00, 5, 'https://i.ibb.co/qD32z5z/JORDAN-TATUM-2-PF-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(57, 'Jordan One Take 5 PF', 'Accelerate, bank, shoot, score—then repeat. Russell Westbrook\'s latest shoe is here to assist your speed game so you can stay unstoppable on the break. The lateral eyestay and wraparound toe piece help you feel contained on the court. Underfoot, you get energy-returning Zoom Air cushioning in the forefoot so you can keep sinkin\' \'em from the first to the fourth.\r\n\r\n\r\nColour Shown: White/Sail/Black/Gym Red\r\nStyle: FD2336-160\r\nCountry/Region of Origin: Vietnam', 2929000.00, 5, 'https://i.ibb.co/pjg2PCt/JORDAN-ONE-TAKE-5-PF-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(58, 'Jordan Spizike Low', 'The Spizike takes elements of five classic Jordans, combines them and gives you one iconic sneaker. It\'s an homage to Spike Lee formally introducing Hollywood and hoops in a culture moment. You get a great-looking pair of kicks with some history. What more can you ask for? Ya dig?\r\n\r\n\r\nColour Shown: White/Armoury Navy/Aegean Storm/Gym Red\r\nStyle: HM3712-164\r\nCountry/Region of Origin: Vietnam', 4699000.00, 5, 'https://i.ibb.co/VS8HZ35/JORDAN-SPIZIKE-LOW-2.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(59, 'Zion 3 \'Rising\' PF', 'Every challenge Zion faces—intense training, the team at the other end of the court or even gravity itself—you know he\'s going to rise above. This version of the Zion 3, with it\'s dreamy gradient fade, channels the energy that comes with every new day. And the performance tech gives you the assist you need when getting low and going high.\r\n\r\n\r\nColour Shown: Bleached Coral/Pale Ivory/Glacier Blue/Crimson Tint\r\nStyle: FZ1322-601\r\nCountry/Region of Origin: Vietnam', 4409000.00, 5, 'https://i.ibb.co/FXSPnG6/JORDAN-ZION-3-NRG-PF-2.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(60, ' Nike Metcon 9 AMP', 'Whatever your \"why\" is for working out, the Metcon 9 makes it all worth it. We improved on the 8 with a larger Hyperlift plate and added rubber rope wrap. Sworn by some of the greatest athletes in the world, intended for lifters, cross-trainers and go-getters, and still the gold standard that delivers day after day.\r\n\r\n\r\nColour Shown: Dark Stucco/Flat Pewter/Phantom/Light Bone\r\nStyle: DZ2616-008\r\nCountry/Region of Origin: Vietnam', 4109000.00, 4, 'https://i.ibb.co/Nt63VQK/NIKE-METCON-9-AMP-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(61, 'Nike Motiva', 'Designed for walking in ultimate comfort, the Nike Motiva provides our highest level of cushioning. A tall foam stack is combined with our Comfortgroove innovation on the outsole to absorb the bumps along the way. And its exaggerated rocker helps propel you forwards.\r\n\r\n\r\nColour Shown: Astronomy Blue/Hyper Crimson/Black/Astronomy Blue\r\nStyle: DV1237-401\r\nCountry/Region of Origin: Vietnam', 3239000.00, 4, 'https://i.ibb.co/618LL68/NIKE-MOTIVA-1.jpg', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(62, 'Nike Metcon 1 OG', 'The Metcon 1 have returned in true minimalist form. From the Flywire cables to the breathable mesh on the upper, this is the exact 2015 iteration that rocked the workout world. As we near their 10-year anniversary, they\'re here for your toughest, hardest workouts.\r\n\r\n\r\nColour Shown: Black/Wolf Grey/Varsity Red\r\nStyle: FQ1854-001\r\nCountry/Region of Origin: Vietnam', 4409000.00, 4, 'https://i.ibb.co/1Ks52h8/NIKE-METCON-1-OG-2.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(63, 'Nike Flex Experience Run 12', 'Stay steady and keep progressing towards your running goals in the Flex Experience 12. Minimal with full range of motion from heel to toe, it\'s made to move with every stride, pace and kick when you find your groove.\r\n\r\n\r\nColour Shown: Astronomy Blue/Black/Hyper Crimson/White\r\nStyle: DV0740-401\r\nCountry/Region of Origin: Indonesia', 2069000.00, 4, 'https://i.ibb.co/1r05F76/FLEX-EXPERIENCE-RN-12-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20'),
(64, 'Nike Air Monarch IV', 'Nike Air Monarch IV sets you up for working out with durable leather on top for support. Lightweight foam teams up with Nike Air cushioning for comfort in every stride.\r\n\r\n\r\nColour Shown: Black/Black\r\nStyle: 415445-001\r\nCountry/Region of Origin: China, Vietnam', 1909000.00, 4, 'https://i.ibb.co/gtCGJV6/AIR-MONARCH-IV-1.webp', 0.00, '2024-08-22 07:37:08', '2024-08-22 07:37:20');

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `detail_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `size` varchar(10) NOT NULL,
  `stock` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`detail_id`, `product_id`, `color`, `size`, `stock`, `quantity`, `time`) VALUES
(6, 1, 'Trắng', '39', 87, 1, '2023-12-14 10:51:09'),
(7, 1, 'red', '40', 95, 1, '2023-12-14 11:21:46'),
(8, 28, 'red', '40', 98, 1, '2023-12-14 11:22:15'),
(9, 29, 'red', '40', 87, 1, '2023-12-14 11:26:12'),
(10, 30, 'red', '40', 99, 1, '2023-12-14 11:28:23'),
(11, 31, 'red', '40', 98, 1, '2023-12-14 11:28:37'),
(12, 32, 'red', '40', 100, 1, '2023-12-14 11:30:40'),
(13, 33, 'red', '40', 100, 1, '2023-12-14 11:31:59'),
(14, 34, 'red', '40', 99, 1, '2023-12-14 11:33:12'),
(15, 35, 'red', '40', 100, 1, '2023-12-14 11:34:16'),
(16, 36, 'red', '40', 92, 1, '2023-12-14 11:37:51'),
(17, 37, 'red', '40', 100, 1, '2023-12-14 11:39:19'),
(18, 39, 'Xám', '40', 100, 400, '2023-12-17 08:36:03'),
(19, 1, 'Đen', '40', 100, 400, '2023-12-17 08:36:03'),
(20, 39, 'Nâu', '40', 100, 400, '2023-12-17 08:36:03'),
(21, 39, 'Xám', '40', 100, 400, '2023-12-17 08:36:03'),
(22, 40, 'Red', '40', 20, 50, '2024-07-29 16:17:09'),
(23, 40, 'Blue', '42', 30, 50, '2024-07-29 16:17:09'),
(24, 41, 'Black', '42', 50, 200, '2024-07-29 16:30:43'),
(25, 41, 'sage', '43', 49, 200, '2024-07-29 16:30:43'),
(26, 41, 'Lime', '40', 50, 200, '2024-07-29 16:30:43'),
(27, 42, 'Red', '41', 30, 300, '2024-07-29 16:41:23'),
(28, 42, 'sage', '39', 30, 300, '2024-07-29 16:41:23'),
(29, 42, 'Lime', '40', 50, 300, '2024-07-29 16:41:23'),
(30, 42, 'Green', '38', 50, 300, '2024-07-29 16:41:23'),
(31, 43, 'Black', '38', 50, 500, '2024-07-29 16:48:46'),
(32, 43, 'Cyan', '39', 50, 500, '2024-07-29 16:48:46'),
(33, 43, 'Maroon', '40', 50, 500, '2024-07-29 16:48:46'),
(34, 44, 'Sky', '41', 60, 500, '2024-07-29 16:52:08'),
(35, 44, 'Sky', '41', 60, 500, '2024-07-29 16:52:08'),
(36, 44, 'Sky', '41', 60, 500, '2024-07-29 16:52:08'),
(37, 44, 'Sky', '41', 1, 500, '2024-07-29 16:52:08'),
(38, 45, 'Black', '39', 50, 300, '2024-08-11 13:46:41'),
(39, 45, 'Beige', '40', 50, 300, '2024-08-11 13:46:41'),
(40, 45, 'Sky blue', '41', 50, 300, '2024-08-11 13:46:41'),
(41, 45, 'Violet', '42', 50, 300, '2024-08-11 13:46:41'),
(42, 46, 'Maroon', '39', 50, 300, '2024-08-11 13:49:19'),
(43, 46, 'Cyan', '43', 50, 300, '2024-08-11 13:49:19'),
(44, 46, 'Charcoal', '40', 50, 300, '2024-08-11 13:49:19'),
(45, 46, 'Sky', '38', 50, 300, '2024-08-11 13:49:19'),
(46, 47, 'Navy blue', '39', 50, 300, '2024-08-11 13:53:07'),
(47, 47, 'Yellow', '40', 50, 300, '2024-08-11 13:53:07'),
(48, 47, 'Orange', '42', 50, 300, '2024-08-11 13:53:07'),
(49, 47, 'Mint green', '37', 50, 300, '2024-08-11 13:53:07'),
(50, 48, 'Red', '37', 50, 300, '2024-08-11 13:57:54'),
(51, 48, 'Cyan', '43', 50, 300, '2024-08-11 13:57:54'),
(52, 48, 'Orange', '41', 50, 300, '2024-08-11 13:57:54'),
(53, 48, 'Violet', '42', 50, 300, '2024-08-11 13:57:54'),
(54, 49, 'Black', '39', 50, 300, '2024-08-11 15:04:59'),
(55, 49, 'sage', '43', 50, 300, '2024-08-11 15:04:59'),
(56, 49, 'Maroon', '40', 50, 300, '2024-08-11 15:04:59'),
(57, 49, 'Mint green', '42', 50, 300, '2024-08-11 15:04:59'),
(58, 50, 'Blue', '40', 50, 300, '2024-08-11 15:13:03'),
(59, 50, 'Red', '38', 50, 300, '2024-08-11 15:13:03'),
(60, 50, 'Charcoal', '41', 50, 300, '2024-08-11 15:13:03'),
(61, 50, 'Dark red', '43', 50, 300, '2024-08-11 15:13:03'),
(62, 51, 'Blue', '41', 50, 300, '2024-08-11 15:18:09'),
(63, 51, 'Beige', '38', 50, 300, '2024-08-11 15:18:09'),
(64, 51, 'Sky blue', '43', 50, 300, '2024-08-11 15:18:09'),
(65, 51, 'Sky', '42', 50, 300, '2024-08-11 15:18:09'),
(66, 52, 'White', '40', 50, 300, '2024-08-11 15:20:23'),
(67, 52, 'Ruby', '39', 50, 300, '2024-08-11 15:20:23'),
(68, 52, 'Orange', '41', 50, 300, '2024-08-11 15:20:23'),
(69, 52, 'Violet', '38', 50, 300, '2024-08-11 15:20:23'),
(70, 53, 'Coral', '37', 50, 300, '2024-08-11 15:24:42'),
(71, 53, 'sage', '39', 50, 300, '2024-08-11 15:24:42'),
(72, 53, 'Charcoal', '41', 50, 300, '2024-08-11 15:24:42'),
(73, 53, 'Sky', '42', 50, 300, '2024-08-11 15:24:42'),
(74, 54, 'Green', '39', 50, 300, '2024-08-11 15:38:27'),
(75, 54, 'Ruby', '43', 50, 300, '2024-08-11 15:38:27'),
(76, 55, 'Blue', '40', 50, 300, '2024-08-11 15:44:27'),
(77, 55, 'Red', '43', 50, 300, '2024-08-11 15:44:27'),
(78, 55, 'Sky blue', '42', 50, 300, '2024-08-11 15:44:27'),
(79, 55, 'Green', '38', 50, 300, '2024-08-11 15:44:27'),
(80, 56, 'Pink', '39', 50, 300, '2024-08-11 15:46:52'),
(81, 56, 'Red', '43', 50, 300, '2024-08-11 15:46:52'),
(82, 56, 'Lime', '41', 50, 300, '2024-08-11 15:46:52'),
(83, 56, 'Dark red', '38', 50, 300, '2024-08-11 15:46:52'),
(84, 57, 'Red', '42', 50, 300, '2024-08-11 15:49:05'),
(85, 57, 'Ruby', '39', 50, 300, '2024-08-11 15:49:05'),
(86, 57, 'Orange', '40', 50, 300, '2024-08-11 15:49:05'),
(87, 58, 'White', '38', 50, 300, '2024-08-11 15:50:59'),
(88, 58, 'Beige', '39', 50, 300, '2024-08-11 15:50:59'),
(89, 58, 'Charcoal', '40', 50, 300, '2024-08-11 15:50:59'),
(90, 58, 'Sky', '41', 50, 300, '2024-08-11 15:50:59'),
(91, 59, 'Coral', '37', 50, 300, '2024-08-11 15:54:40'),
(92, 59, 'Red', '43', 50, 300, '2024-08-11 15:54:40'),
(93, 59, 'Sky blue', '41', 50, 300, '2024-08-11 15:54:40'),
(94, 60, 'Maroon', '39', 50, 300, '2024-08-11 15:57:31'),
(95, 60, 'Cyan', '43', 50, 300, '2024-08-11 15:57:31'),
(96, 60, 'Lime', '42', 50, 300, '2024-08-11 15:57:31'),
(97, 61, 'Blue', '40', 50, 300, '2024-08-11 16:01:14'),
(98, 61, 'Yellow', '43', 50, 300, '2024-08-11 16:01:15'),
(99, 61, 'Sky blue', '41', 50, 300, '2024-08-11 16:01:15'),
(100, 62, 'Red', '39', 50, 300, '2024-08-11 16:04:16'),
(101, 62, 'Black', '40', 50, 300, '2024-08-11 16:04:16'),
(102, 62, 'Maroon', '41', 50, 300, '2024-08-11 16:04:16'),
(103, 63, 'Blue', '38', 50, 300, '2024-08-11 16:06:22'),
(104, 63, 'Cyan', '39', 50, 300, '2024-08-11 16:06:22'),
(105, 63, 'Sky blue', '40', 50, 300, '2024-08-11 16:06:22'),
(106, 64, 'Black', '39', 50, 300, '2024-08-11 16:10:44'),
(107, 64, 'Red', '38', 50, 300, '2024-08-11 16:10:44'),
(108, 64, 'Sky blue', '40', 50, 300, '2024-08-11 16:10:44');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `image_url` text DEFAULT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `image_url`, `product_id`) VALUES
(1, '[\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/efa43a76-b684-484d-8629-3061a14db85f/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/91f8727e-f7b3-4df3-a5ef-729825a7a8e4/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d7cb3d69-d45c-46dd-90a1-a042b67b8bf6/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ed9491b1-a617-414f-902f-d27c596ef6be/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/371731b0-2e72-49d5-bbce-415c0d67afca/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f99a351a-3986-4c46-9e4c-0eba66575847/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3b0b267e-586a-4ff2-9dc9-0505fd9a5913/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bcd11a99-db00-40e4-a2ba-c482576e259d/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/907a2e34-49e3-4f28-93e4-eda8188ecb0e/gt-jump-2-ep-basketball-shoes-1F15Gp.png\"]', 1),
(7, '[\"https://i.ibb.co/k8y5n7R/e0391e7a-e108-4ecc-bfed-fe53fbf4fe6f.webp\"]', 27),
(8, '[\"https://i.ibb.co/5LpTKh1/20fe4aad-81c0-4c0f-81ca-76718194dd83.webp\",\"https://i.ibb.co/py5gCcK/92f12e02-d2ec-4f7a-bcf3-941c3b311fea.webp\",\"https://i.ibb.co/s1R8L57/586eaebb-8b45-4315-9d89-645bc5a1db0c.webp\",\"https://i.ibb.co/wpb0DtC/3455c414-a1f2-44e0-ba40-23d156b7875e.webp\",\"https://i.ibb.co/GsnV5dH/b21a1966-f853-4216-9cc3-43ed536ed2a6.webp\",\"https://i.ibb.co/fGbCG4Q/c9602d2a-8aca-43eb-b242-e5e623f40325.webp\",\"https://i.ibb.co/5Fyvm5C/e1cf6fd0-7f65-4737-8b23-515d29c306cb.webp\",\"https://i.ibb.co/fVghjvh/gt-cut-2-ep-basketball-shoes-M7jcxn.jpg\"]', 28),
(9, '[\"https://i.ibb.co/0yhM7mb/b7d9211c-26e7-431a-ac24-b0540fb3c00f.webp\",\"https://i.ibb.co/frfwjTQ/fc4622c4-2769-4665-aa6e-42c974a7705e.webp\"]', 29),
(10, '[\"https://i.ibb.co/mN7XW9D/02b23dcb-401d-45d7-a31f-d9a553534126.webp\",\"https://i.ibb.co/s9SbJGw/558b410d-2ce2-4de4-94f5-7f371c5284c3.webp\",\"https://i.ibb.co/v3N6ynF/ebe3adbd-0e86-4c4c-9789-0cba0936cbe5.webp\",\"https://i.ibb.co/tpPGCNb/gt-hustle-2-ep-basketball-shoes-Njc3-Q0-1.jpg\",\"https://i.ibb.co/Xt9S2vG/gt-hustle-2-ep-basketball-shoes-Njc3-Q0-2.jpg\",\"https://i.ibb.co/nn7qzGp/gt-hustle-2-ep-basketball-shoes-Njc3-Q0.jpg\"]', 30),
(11, '[\"https://i.ibb.co/x3nKXtX/df6a994a-bc85-4637-94bf-3ae4af43a8fe.webp\",\"https://i.ibb.co/Xj33ydw/e01eb9e0-ddc1-48bf-a516-bcbd40c78e39.webp\",\"https://i.ibb.co/64zS7Fr/infinityrn-4-road-running-shoes-m-LRjcz-1.jpg\",\"https://i.ibb.co/VH9Py9G/infinityrn-4-road-running-shoes-m-LRjcz.jpg\"]', 31),
(12, '[\"https://i.ibb.co/QFWQ1C8/478926ab-d0d9-4d8e-a12c-121c4a163200.webp\",\"https://i.ibb.co/kBG3s7p/invincible-3-road-running-shoes-Wwmmlp-1.jpg\",\"https://i.ibb.co/HhH6rcT/invincible-3-road-running-shoes-Wwmmlp-2.jpg\",\"https://i.ibb.co/sF7ftfC/invincible-3-road-running-shoes-Wwmmlp-3.jpg\",\"https://i.ibb.co/HYKX14g/invincible-3-road-running-shoes-Wwmmlp-4.jpg\",\"https://i.ibb.co/hYJ6nXk/invincible-3-road-running-shoes-Wwmmlp.jpg\"]', 32),
(13, '[\"https://i.ibb.co/52sqsWp/5d6de434-d587-4181-8499-65a539a004ce.webp\",\"https://i.ibb.co/6Y2qznn/9ea6b77d-8ceb-4d2c-8f53-09432b41fc63.webp\",\"https://i.ibb.co/SKGSKLr/94b95619-651a-42fc-83d0-07182b97b98c.webp\",\"https://i.ibb.co/TB7PRPr/524b79d8-5569-4ad6-8695-522bab6cf442.webp\",\"https://i.ibb.co/DfhcR16/9879c202-fff4-4949-98a5-b287267d9e26.webp\",\"https://i.ibb.co/hZqS6Ts/b820c152-2dd5-4589-a5ac-86bd20087362.webp\",\"https://i.ibb.co/wYcNbzL/bde541ad-9a35-4066-b471-02be89282049.webp\",\"https://i.ibb.co/NF1FHdK/dc874e61-c2ea-47dd-adaf-2911556b4cc7.webp\"]', 33),
(14, '[\"https://i.ibb.co/BKLWjqL/98fd9b9f-775d-452e-9e91-5135da978368.webp\",\"https://i.ibb.co/j6ZNf7k/8381da7c-769d-43c4-a9bc-e80db72724ed.webp\",\"https://i.ibb.co/c61nCRS/cc8cefcd-cfb4-4e3a-aec8-447617422737-1.webp\",\"https://i.ibb.co/zScd9t3/cc8cefcd-cfb4-4e3a-aec8-447617422737.webp\"]', 34),
(15, '[\"https://i.ibb.co/1sdNM9L/07d1d2ef-4e45-4474-802c-c5fca3814391.webp\",\"https://i.ibb.co/GVrHd9L/69e87ac5-5ae6-4ba1-b6ac-1d33b631255a.webp\",\"https://i.ibb.co/2yds7Yk/559150c4-fedb-4676-bf2e-17714d69c613.webp\",\"https://i.ibb.co/x8rYpBv/dd8538d2-f47b-403b-bc7d-50d148ffa954.webp\",\"https://i.ibb.co/SxcMD3h/df7fa56c-0731-41df-9d80-4cf7b680e354.webp\",\"https://i.ibb.co/56hxfgF/zoom-metcon-turbo-2-workout-shoes-j-Pvmwl.jpg\"]', 35),
(16, '[\"https://i.ibb.co/XYpgSVq/2cfa0834-2b63-4b2a-92db-987c2f58428a.webp\",\"https://i.ibb.co/JK1mMLy/176c2fca-f004-4c5a-9e0c-ad8cb7d79678.webp\",\"https://i.ibb.co/GcJ9YDR/716addb1-81b2-4983-8ba7-c4fe312e03de.webp\",\"https://i.ibb.co/R2H0bDR/a3ba7907-29a4-44c1-96c2-cfce805fa04b.webp\",\"https://i.ibb.co/gDKnB5S/e2b4711c-9a38-4832-9021-d3a30d80334f.webp\",\"https://i.ibb.co/m07Hg8D/f67ef8ea-64cb-40db-ae97-800a3e91b94d.webp\"]', 36),
(17, '[\"https://i.ibb.co/smJkW15/041d6fbb-f3a5-4e18-906d-b83bf4086587.webp\",\"https://i.ibb.co/pXpCw72/35817c62-6ed8-461a-8d1e-38ce255c7b13.webp\",\"https://i.ibb.co/VvQVrrQ/d1134792-094e-43e1-8799-38aa2abb9c43.webp\",\"https://i.ibb.co/XbSwwVW/jordan-max-aura-5-shoes-ZBZ4-Pz-1.jpg\",\"https://i.ibb.co/KzFvQrR/jordan-max-aura-5-shoes-ZBZ4-Pz-2.jpg\",\"https://i.ibb.co/SyCPkHQ/jordan-max-aura-5-shoes-ZBZ4-Pz.jpg\"]', 37),
(18, '[\"https://i.ibb.co/R7XJ5F3/3f6727f7-0f97-4ab3-978d-e5ab6b1fdfb6.webp\",\"https://i.ibb.co/hgdmFsH/8de36952-de2f-48ba-b7f4-6048f870007c.webp\",\"https://i.ibb.co/zPt4fN0/074bce19-79ac-42d8-b880-6c89c0373107.webp\",\"https://i.ibb.co/BgTnKwB/3535fef2-42c0-4683-a71d-a291fe40a9b5.webp\",\"https://i.ibb.co/sq7qZYP/8a6ca92e-3475-42dc-9797-4b49c778123c.webp\"]', 39),
(19, '[\"https://i.ibb.co/rMhKZGY/PHANTOM-GX-II-ELITE-FG-1.webp\",\"https://i.ibb.co/mXFXdHd/PHANTOM-GX-II-ELITE-FG-2.webp\",\"https://i.ibb.co/ZfDgBQp/PHANTOM-GX-II-ELITE-FG-3.webp\",\"https://i.ibb.co/JC1MSTK/PHANTOM-GX-II-ELITE-FG-4.webp\",\"https://i.ibb.co/54zkZNJ/PHANTOM-GX-II-ELITE-FG-5.webp\",\"https://i.ibb.co/9syK4sD/PHANTOM-GX-II-ELITE-FG-6.webp\",\"https://i.ibb.co/z4w9k8d/PHANTOM-GX-II-ELITE-FG-7.webp\"]', 40),
(20, '[\"https://i.ibb.co/Mf2tHPq/LEGEND-10-ELITE-FG-OLY-1.webp\",\"https://i.ibb.co/Yf8gGtQ/LEGEND-10-ELITE-FG-OLY-2.webp\",\"https://i.ibb.co/N2VMyTx/LEGEND-10-ELITE-FG-OLY-3.webp\",\"https://i.ibb.co/1Z7Mm9m/LEGEND-10-ELITE-FG-OLY-4.webp\",\"https://i.ibb.co/dBn8wNN/LEGEND-10-ELITE-FG-OLY-5.webp\",\"https://i.ibb.co/TkcBMY6/LEGEND-10-ELITE-FG-OLY-6.webp\",\"https://i.ibb.co/c82tGRB/LEGEND-10-ELITE-FG-OLY-7.webp\",\"https://i.ibb.co/mTM87kk/LEGEND-10-ELITE-FG-OLY-8.webp\",\"https://i.ibb.co/fp8b2FS/LEGEND-10-ELITE-FG-OLY-9.webp\",\"https://i.ibb.co/TWQvLmZ/LEGEND-10-ELITE-FG-OLY.jpg\",\"https://i.ibb.co/LPzSCQ6/LEGEND-10-ELITE-FG-OLY.webp\"]', 41),
(21, '[\"https://i.ibb.co/BqRTm1m/ZOOM-VAPOR-15-ACADEMY-IC-1.webp\",\"https://i.ibb.co/4ZTxLMZ/ZOOM-VAPOR-15-ACADEMY-IC-2.webp\",\"https://i.ibb.co/R7MR6pf/ZOOM-VAPOR-15-ACADEMY-IC-3.webp\",\"https://i.ibb.co/5MCdjfx/ZOOM-VAPOR-15-ACADEMY-IC-4.webp\",\"https://i.ibb.co/qFsw1BT/ZOOM-VAPOR-15-ACADEMY-IC-5.webp\",\"https://i.ibb.co/JnHW4fS/ZOOM-VAPOR-15-ACADEMY-IC-6.webp\",\"https://i.ibb.co/nPXM7M7/ZOOM-VAPOR-15-ACADEMY-IC-7.webp\",\"https://i.ibb.co/t30pW4b/ZOOM-VAPOR-15-ACADEMY-IC.webp\"]', 42),
(22, '[\"https://i.ibb.co/g6kWsB2/NIKE-REACTGATO-1.jpg\",\"https://i.ibb.co/SfvG1rx/NIKE-REACTGATO-1.webp\",\"https://i.ibb.co/nRgWz8w/NIKE-REACTGATO-2.jpg\",\"https://i.ibb.co/9T6VkT7/NIKE-REACTGATO-2.webp\",\"https://i.ibb.co/gz7DwsW/NIKE-REACTGATO-3.jpg\",\"https://i.ibb.co/fDjNr86/NIKE-REACTGATO-3.webp\",\"https://i.ibb.co/VBNN8nz/NIKE-REACTGATO.jpg\",\"https://i.ibb.co/vxrcQ4V/NIKE-REACTGATO.webp\"]', 43),
(23, '[\"https://i.ibb.co/b6f0Nhs/PHANTOM-LUNA-II-ELITE-FG-AS-1.jpg\",\"https://i.ibb.co/brvWkm3/PHANTOM-LUNA-II-ELITE-FG-AS-1.webp\",\"https://i.ibb.co/BCKbBXs/PHANTOM-LUNA-II-ELITE-FG-AS-2.jpg\",\"https://i.ibb.co/hg8DTBN/PHANTOM-LUNA-II-ELITE-FG-AS-2.webp\",\"https://i.ibb.co/qnPY2wD/PHANTOM-LUNA-II-ELITE-FG-AS-3.jpg\",\"https://i.ibb.co/KmbQN9j/PHANTOM-LUNA-II-ELITE-FG-AS-3.webp\",\"https://i.ibb.co/5LkbdNP/PHANTOM-LUNA-II-ELITE-FG-AS-4.jpg\",\"https://i.ibb.co/nsZ8DCq/PHANTOM-LUNA-II-ELITE-FG-AS-4.webp\",\"https://i.ibb.co/ncS7sSf/PHANTOM-LUNA-II-ELITE-FG-AS.jpg\",\"https://i.ibb.co/X2RGLqN/PHANTOM-LUNA-II-ELITE-FG-AS.webp\"]', 44),
(24, '[\"https://i.ibb.co/3h048qf/AIR-ZOOM-PEGASUS-41-WIDE-1.jpg\",\"https://i.ibb.co/pXc9jHv/AIR-ZOOM-PEGASUS-41-WIDE-1.webp\",\"https://i.ibb.co/Gp8JR31/AIR-ZOOM-PEGASUS-41-WIDE-2.jpg\",\"https://i.ibb.co/qFq0QbN/AIR-ZOOM-PEGASUS-41-WIDE-2.webp\",\"https://i.ibb.co/qJ4mm49/AIR-ZOOM-PEGASUS-41-WIDE-3.webp\",\"https://i.ibb.co/c1DSdzR/AIR-ZOOM-PEGASUS-41-WIDE-4.webp\",\"https://i.ibb.co/zQVK1t4/AIR-ZOOM-PEGASUS-41-WIDE.jpg\",\"https://i.ibb.co/6RJqb5j/AIR-ZOOM-PEGASUS-41-WIDE.webp\"]', 45),
(25, '[\"https://i.ibb.co/wcKvHcB/NIKE-ZOOMX-STREAKFLY-2.webp\",\"https://i.ibb.co/prXXzRH/NIKE-ZOOMX-STREAKFLY-3.webp\",\"https://i.ibb.co/CV4B3YN/NIKE-ZOOMX-STREAKFLY-4.webp\",\"https://i.ibb.co/2qtQJR4/NIKE-ZOOMX-STREAKFLY-5.webp\",\"https://i.ibb.co/yQ56T21/NIKE-ZOOMX-STREAKFLY.webp\"]', 46),
(26, '[\"https://i.ibb.co/Jxbd73x/NIKE-PEGASUS-TRAIL-5-GTX-1.jpg\",\"https://i.ibb.co/5YRfcFy/NIKE-PEGASUS-TRAIL-5-GTX-1.webp\",\"https://i.ibb.co/TmdGTfX/NIKE-PEGASUS-TRAIL-5-GTX-2.jpg\",\"https://i.ibb.co/wN0Jg8B/NIKE-PEGASUS-TRAIL-5-GTX-2.webp\",\"https://i.ibb.co/VNvFD7X/NIKE-PEGASUS-TRAIL-5-GTX.jpg\",\"https://i.ibb.co/VYFSJt7/NIKE-PEGASUS-TRAIL-5-GTX.webp\"]', 47),
(27, '[]', 48),
(28, '[\"https://i.ibb.co/3BLBd38/NIKE-ZOOMX-ZEGAMA-TRAIL-2-1.webp\",\"https://i.ibb.co/m9yRdZZ/NIKE-ZOOMX-ZEGAMA-TRAIL-2-2.webp\",\"https://i.ibb.co/zhFgWZZ/NIKE-ZOOMX-ZEGAMA-TRAIL-2-3.webp\",\"https://i.ibb.co/Np7GSrB/NIKE-ZOOMX-ZEGAMA-TRAIL-2-4.webp\",\"https://i.ibb.co/kDPSBQZ/NIKE-ZOOMX-ZEGAMA-TRAIL-2.jpg\",\"https://i.ibb.co/2M0BTmd/NIKE-ZOOMX-ZEGAMA-TRAIL-2.webp\"]', 49),
(29, '[\"https://i.ibb.co/0mTb4qD/ZOOM-FREAK-5-EP-1.webp\",\"https://i.ibb.co/XYx4Hk7/ZOOM-FREAK-5-EP-2.webp\",\"https://i.ibb.co/yNZKs15/ZOOM-FREAK-5-EP-3.webp\",\"https://i.ibb.co/qx35VxP/ZOOM-FREAK-5-EP-4.webp\",\"https://i.ibb.co/ygdKTCb/ZOOM-FREAK-5-EP.jpg\",\"https://i.ibb.co/ZNMBYrr/ZOOM-FREAK-5-EP.webp\"]', 50),
(30, '[\"https://i.ibb.co/GkPyHZm/LEBRON-WITNESS-VIII-EP-1.webp\",\"https://i.ibb.co/74rHL79/LEBRON-WITNESS-VIII-EP-2.webp\",\"https://i.ibb.co/zVkHFTC/LEBRON-WITNESS-VIII-EP-3.webp\",\"https://i.ibb.co/8dwYpxz/LEBRON-WITNESS-VIII-EP-4.webp\"]', 51),
(31, '[\"https://i.ibb.co/swLthd0/JORDAN-TATUM-1-PF-1.jpg\",\"https://i.ibb.co/0Jx79jK/JORDAN-TATUM-1-PF-1.webp\",\"https://i.ibb.co/x267MQy/JORDAN-TATUM-1-PF-2.webp\",\"https://i.ibb.co/cTbngnY/JORDAN-TATUM-1-PF-3.webp\",\"https://i.ibb.co/nrsLY9H/JORDAN-TATUM-1-PF.jpg\",\"https://i.ibb.co/PN5DzY6/JORDAN-TATUM-1-PF.webp\"]', 52),
(32, '[\"https://i.ibb.co/Bjq8mkY/AIR-ZOOM-G-T-HUSTLE-2-EP-1.webp\",\"https://i.ibb.co/CHY8hKG/AIR-ZOOM-G-T-HUSTLE-2-EP-2.webp\",\"https://i.ibb.co/DWGQkD1/AIR-ZOOM-G-T-HUSTLE-2-EP-3.webp\",\"https://i.ibb.co/Z8tFP1r/AIR-ZOOM-G-T-HUSTLE-2-EP-4.webp\",\"https://i.ibb.co/dfG768N/AIR-ZOOM-G-T-HUSTLE-2-EP-5.webp\",\"https://i.ibb.co/wcR35vk/AIR-ZOOM-G-T-HUSTLE-2-EP.webp\"]', 53),
(33, '[]', 54),
(34, '[\"https://i.ibb.co/X75QqJk/AIR-JORDAN-MULE-1.jpg\",\"https://i.ibb.co/MkY66vC/AIR-JORDAN-MULE-1.webp\",\"https://i.ibb.co/NnHMd1r/AIR-JORDAN-MULE-2.jpg\",\"https://i.ibb.co/vJRwX8p/AIR-JORDAN-MULE-3.jpg\",\"https://i.ibb.co/yFSGbhZ/AIR-JORDAN-MULE.jpg\",\"https://i.ibb.co/F079HK3/AIR-JORDAN-MULE.webp\"]', 55),
(35, '[\"https://i.ibb.co/qD32z5z/JORDAN-TATUM-2-PF-1.jpg\",\"https://i.ibb.co/Tksx3GC/JORDAN-TATUM-2-PF-2.jpg\",\"https://i.ibb.co/Sn0SKnJ/JORDAN-TATUM-2-PF-3.jpg\",\"https://i.ibb.co/MDM33JH/JORDAN-TATUM-2-PF-4.jpg\",\"https://i.ibb.co/c83ScNT/JORDAN-TATUM-2-PF.jpg\",\"https://i.ibb.co/tJ3QdSW/JORDAN-TATUM-2-PF.webp\"]', 56),
(36, '[\"https://i.ibb.co/pjg2PCt/JORDAN-ONE-TAKE-5-PF-1.jpg\",\"https://i.ibb.co/WW4txfS/JORDAN-ONE-TAKE-5-PF-1.webp\",\"https://i.ibb.co/sQ20qZd/JORDAN-ONE-TAKE-5-PF-2.webp\",\"https://i.ibb.co/cgyLfvn/JORDAN-ONE-TAKE-5-PF-3.webp\",\"https://i.ibb.co/L5JZ1c5/JORDAN-ONE-TAKE-5-PF.jpg\",\"https://i.ibb.co/P5q8mG0/JORDAN-ONE-TAKE-5-PF.webp\"]', 57),
(37, '[\"https://i.ibb.co/VS8HZ35/JORDAN-SPIZIKE-LOW-2.webp\",\"https://i.ibb.co/g7sW8j4/JORDAN-SPIZIKE-LOW-3.webp\",\"https://i.ibb.co/K7DpJp5/JORDAN-SPIZIKE-LOW-4.webp\",\"https://i.ibb.co/pXRn9yS/JORDAN-SPIZIKE-LOW.jpg\",\"https://i.ibb.co/7W22FcC/JORDAN-SPIZIKE-LOW.webp\"]', 58),
(38, '[\"https://i.ibb.co/FXSPnG6/JORDAN-ZION-3-NRG-PF-2.webp\",\"https://i.ibb.co/HX5vZQt/JORDAN-ZION-3-NRG-PF-3.webp\",\"https://i.ibb.co/WpdhgTf/JORDAN-ZION-3-NRG-PF-4.webp\",\"https://i.ibb.co/8YtvMb4/JORDAN-ZION-3-NRG-PF.jpg\",\"https://i.ibb.co/HdnGL9t/JORDAN-ZION-3-NRG-PF.webp\"]', 59),
(39, '[\"https://i.ibb.co/Nt63VQK/NIKE-METCON-9-AMP-1.jpg\",\"https://i.ibb.co/PGdWdbr/NIKE-METCON-9-AMP-1.webp\",\"https://i.ibb.co/bW0SbKm/NIKE-METCON-9-AMP-2.jpg\",\"https://i.ibb.co/p3HRS8y/NIKE-METCON-9-AMP-3.jpg\",\"https://i.ibb.co/Qj00qpB/NIKE-METCON-9-AMP.jpg\",\"https://i.ibb.co/fxdm1W0/NIKE-METCON-9-AMP.webp\"]', 60),
(40, '[\"https://i.ibb.co/618LL68/NIKE-MOTIVA-1.jpg\",\"https://i.ibb.co/q73LkMW/NIKE-MOTIVA-1.webp\",\"https://i.ibb.co/4PSZTH1/NIKE-MOTIVA-2.jpg\",\"https://i.ibb.co/zSmW0HS/NIKE-MOTIVA-2.webp\",\"https://i.ibb.co/7yKc6T7/NIKE-MOTIVA.jpg\",\"https://i.ibb.co/59PY3nk/NIKE-MOTIVA.webp\"]', 61),
(41, '[\"https://i.ibb.co/1Ks52h8/NIKE-METCON-1-OG-2.webp\",\"https://i.ibb.co/1bkV6VK/NIKE-METCON-1-OG-3.webp\",\"https://i.ibb.co/5hmwXPN/NIKE-METCON-1-OG-4.webp\",\"https://i.ibb.co/Ldnc10h/NIKE-METCON-1-OG-5.webp\",\"https://i.ibb.co/C75d8X9/NIKE-METCON-1-OG.webp\"]', 62),
(42, '[\"https://i.ibb.co/1r05F76/FLEX-EXPERIENCE-RN-12-1.webp\",\"https://i.ibb.co/Xt1pxF9/FLEX-EXPERIENCE-RN-12-2.jpg\",\"https://i.ibb.co/Sxdpq3t/FLEX-EXPERIENCE-RN-12-2.webp\",\"https://i.ibb.co/B4fMnWv/FLEX-EXPERIENCE-RN-12.jpg\",\"https://i.ibb.co/44SwdRM/FLEX-EXPERIENCE-RN-12.webp\"]', 63),
(43, '[\"https://i.ibb.co/gtCGJV6/AIR-MONARCH-IV-1.webp\",\"https://i.ibb.co/MVnfjGM/AIR-MONARCH-IV-2.webp\",\"https://i.ibb.co/fNZNxBL/AIR-MONARCH-IV-3.webp\",\"https://i.ibb.co/FJxgdVr/AIR-MONARCH-IV.jpg\",\"https://i.ibb.co/M2Qzg4T/AIR-MONARCH-IV.webp\"]', 64);

-- --------------------------------------------------------

--
-- Table structure for table `product_ratings`
--

CREATE TABLE `product_ratings` (
  `rating_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `rating_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_ratings`
--

INSERT INTO `product_ratings` (`rating_id`, `user_id`, `product_id`, `rating`, `rating_date`) VALUES
(4, 10, 1, 3, '2023-12-15 20:25:47'),
(5, 11, 1, 5, '2024-07-28 11:00:54'),
(6, 10, 29, 5, '2024-08-18 11:02:26'),
(7, 10, 30, 1, '2024-07-26 21:35:09');

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `review_text` text NOT NULL,
  `review_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_history`
--

CREATE TABLE `purchase_history` (
  `purchase_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_detail_id` int(11) NOT NULL,
  `purchase_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `recipient_numberphone` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_addresses`
--

INSERT INTO `shipping_addresses` (`address_id`, `user_id`, `recipient_name`, `street_address`, `city`, `state`, `postal_code`, `recipient_numberphone`) VALUES
(4, 10, 'Nguyễn Văn Huy', 'Quận Ba Đình', 'Thành phố Hà Nội', 'Phường Phúc Xá', 'chưa cập nhật', '0374786779'),
(5, 12, 'Minh', 'Quận Bắc Từ Liêm', 'Thành phố Hà Nội', 'Phường Quán Thánh', 'chưa cập nhật', '0389119966'),
(6, 19, 'Mai Thế Quyết', '23tt27 khu đô thị văn phú, Phường Phú La, Quận Hà Đông', 'Thành phố Hà Nội', 'Phường Phú La', 'chưa cập nhật', '0365512453'),
(7, 19, 'Mai Thế Quyết', '27 Phan Đình Giót, Phường Quang Trung, Quận Hà Đông', 'Thành phố Hà Nội', 'Phường Quang Trung', 'chưa cập nhật', '0365512456');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `notify_token` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `full_name`, `phone`, `address`, `date_of_birth`, `gender`, `avatar`, `notify_token`) VALUES
(9, 'mingchen1', '$2b$10$1fwO1QO06GA.MzEp5ECYCO99f4HLbE/vh/NmR/UCctyJdzpufnt5a', 'tminh400@gmail.com', 'Nguyễn Văn Huy', '0384675898', 3, '2023-12-16', NULL, 'https://bizweb.dktcdn.net/100/438/408/files/avatar-hai-yody-vn-12.jpg?v=1700119238352', NULL),
(10, 'huyph20687', '$2b$10$G8dPXmV7j4a.8HQ5aW9S9unaMydTupM6BVI.9rfxTeX2gHVmz3HvW', 'huymaxpro123@gmail.com', 'Nguyễn Văn A', '0374786775', 4, '2003-12-17', 'female', NULL, 'ExponentPushToken[ToWetJOEwoMlQzmWtmP64k]'),
(11, 'huydz23', '$2b$10$J2P7vY0bn9mH.FnjjeMXuOYyXNS9x3GV/SUT7QeiK4MmYA.p0k1yG', 'huy339093@gmail.com', 'Huy', NULL, NULL, '2023-12-16', NULL, NULL, NULL),
(12, 'mingchen', '$2b$10$atb9HEot/LBIz4EOxuNPVOg9rqce/xLp5/xx3FviPMh5gNpy8uCja', 'tminh401@gmail.com', NULL, NULL, 5, NULL, NULL, NULL, 'ExponentPushToken[un5g0DFUqG0cgJ2Fw0fOyo]'),
(13, NULL, '$2b$10$9HAW1LGLKfYeFPeqN7YKJuNcDHKHChNgD0FlIuoQYzY9s1nUuV5Aq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, '$2b$10$7K36rHOqmGfrPz.M4EmdJuwv4Ghgk3aS2hbXGwSUfaHdhfJgjLqdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, NULL, '$2b$10$nonapbIxLkkUnRbqvBy8auu9l.zfJuY8FmQNgat7beqL.nV.0nQ/y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'hhjj', '$2b$10$CE5YNlDLC0LGaTlCpr.UGOg/7/gpHwIO6nqFxqw2Oues2PWiz045C', 'huy339@gmail.com', 'njjj', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'ghghb', '$2b$10$R076ibMXZtbbwllpCy0UmeVDmEmiarIbeAYemgLkVMka6N6oA0c0.', 'huy33909@gmail.com', 'huypro23', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'huydz234', '$2b$10$RG6zfq4xQYG0mByC.Wwy6./QNSz8lWWXGBx.iYvJvREvmTGvqKZGy', 'huy337@gmail.com', 'huh', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'a123456', '$2b$10$l/DOkW5py8DKpyzjCzajfexS201xg5YXoHtaA.UrpLbxNkPArVdG.', 'quyetmtph28802@fpt.edu.vn', 'Mai Thế quyết', NULL, 7, NULL, NULL, NULL, NULL),
(20, 'admin', '$2b$10$9OByCkiZ7mqZGKoqBmNO2OXGxH6Dvo5gGSGrs8FxLat7rgyC.TdmG', 'admin@gmail.com', 'admin', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `voucher_id` int(11) NOT NULL,
  `voucher_code` varchar(255) NOT NULL,
  `voucher_name` varchar(255) NOT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `min_order_value` decimal(10,2) DEFAULT NULL,
  `max_discount_value` decimal(10,2) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `used_count` int(11) DEFAULT 0,
  `status` enum('active','inactive','expired') NOT NULL DEFAULT 'active',
  `user_limit` int(11) DEFAULT NULL,
  `applicable_products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`applicable_products`)),
  `applicable_users` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`applicable_users`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`voucher_id`, `voucher_code`, `voucher_name`, `discount_type`, `discount_value`, `min_order_value`, `max_discount_value`, `start_date`, `end_date`, `usage_limit`, `used_count`, `status`, `user_limit`, `applicable_products`, `applicable_users`) VALUES
(1, 'SUMMER2024', 'Summer Discount', 'percentage', 10.00, 100.00, NULL, '2024-06-01 00:00:00', '2024-08-31 23:59:59', 100, 0, 'active', 5, '[1, 2, 3]', '[1001, 1002, 1003]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_users`
--
ALTER TABLE `auth_users`
  ADD PRIMARY KEY (`auth_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_detail_id` (`product_detail_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `favorites_products`
--
ALTER TABLE `favorites_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `orders_ibfk_2_idx` (`status_id`),
  ADD KEY `order_ibfk_3_idx` (`shipping_address_id`),
  ADD KEY `order_ibfk_4_idx` (`payment_method_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`) USING BTREE,
  ADD KEY `order_details_ibfk_1` (`order_id`),
  ADD KEY `order_details_ibfk_2` (`product_detail_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `payment_method_types`
--
ALTER TABLE `payment_method_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_detail_id` (`order_detail_id`);

--
-- Indexes for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `notify_token_UNIQUE` (`notify_token`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucher_id`),
  ADD UNIQUE KEY `voucher_code_UNIQUE` (`voucher_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_users`
--
ALTER TABLE `auth_users`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `favorites_products`
--
ALTER TABLE `favorites_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payment_method_types`
--
ALTER TABLE `payment_method_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `product_ratings`
--
ALTER TABLE `product_ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_history`
--
ALTER TABLE `purchase_history`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `voucher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_users`
--
ALTER TABLE `auth_users`
  ADD CONSTRAINT `auth_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`);

--
-- Constraints for table `favorites_products`
--
ALTER TABLE `favorites_products`
  ADD CONSTRAINT `favorites_products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `favorites_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `order_ibfk_37` FOREIGN KEY (`shipping_address_id`) REFERENCES `shipping_addresses` (`address_id`),
  ADD CONSTRAINT `order_ibfk_47` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method_types` (`id`),
  ADD CONSTRAINT `orders_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `orders_ibfk_27` FOREIGN KEY (`status_id`) REFERENCES `order_status` (`status_id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD CONSTRAINT `product_ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `product_ratings_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD CONSTRAINT `purchase_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `purchase_history_ibfk_2` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`order_detail_id`);

--
-- Constraints for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
