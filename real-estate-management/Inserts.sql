INSERT INTO `roles` (`role_name`) VALUES
('Property Manager'),
('Property Seeker');

INSERT INTO `users` (`name`, `email`, `password`, `role_id`) VALUES
('David Cohen', 'david@example.com', 'hashed_password1', 2),
('Sarah Levy', 'sarah@example.com', 'hashed_password2', 1),
('Michael Bar', 'michael@example.com', 'hashed_password3', 2),
('Ruth Shmuel', 'ruth@example.com', 'hashed_password4', 1),
('Avi Rosenthal', 'avi@example.com', 'hashed_password5', 2);

INSERT INTO `properties` (`name`, `location`, `price`, `description`, `manager_id`) VALUES
('Luxury Apartment in Tel Aviv', 'Tel Aviv, Israel', 15000000.00, 'A luxurious 3-bedroom apartment in the heart of Tel Aviv.', 1),
('Spacious Villa in Haifa', 'Haifa, Israel', 9500000.00, 'A beautiful villa with a sea view in the northern city of Haifa.', 3),
('Modern Flat in Jerusalem', 'Jerusalem, Israel', 12000000.00, 'A modern and spacious flat near the Old City.', 1),
('Penthouse in Herzliya', 'Herzliya, Israel', 18000000.00, 'A stunning penthouse with sea views in Herzliya.', 3),
('Countryside Cottage in Karmiel', 'Karmiel, Israel', 5000000.00, 'A peaceful countryside cottage with a large garden.', 1);

INSERT INTO `applications` (`user_id`, `property_id`, `status`) VALUES
(2, 1, 'Pending'),
(2, 2, 'Approved'),
(5, 3, 'Pending'),
(5, 4, 'Rejected');

#INSERT INTO `property_audios` (`property_id`, `audio_path`) VALUES
#(1, 'audios/tel_aviv_property_audio.mp3'),
#(2, 'audios/haifa_property_audio.mp3'),
#(3, 'audios/jerusalem_property_audio.mp3');

#INSERT INTO `property_videos` (`property_id`, `video_path`) VALUES
#(1, 'videos/tel_aviv_property_video.mp4'),
#(2, 'videos/haifa_property_video.mp4'),
#(3, 'videos/jerusalem_property_video.mp4');

INSERT INTO `property_features` (`property_id`, `feature_name`, `feature_value`) VALUES
(1, 'Bedrooms', '3'),
(1, 'Bathrooms', '2'),
(2, 'Bedrooms', '5'),
(2, 'Bathrooms', '3'),
(3, 'Bedrooms', '4'),
(3, 'Bathrooms', '2');

INSERT INTO `property_images` (`property_id`, `image_path`) VALUES
(1, '"C:\Users\kallu\Desktop\Fullstack6\Fullstack6\real-estate-management\Backend\uploads\images\apartment1.jpeg"'),
(1, '"C:\Users\kallu\Desktop\Fullstack6\Fullstack6\real-estate-management\Backend\uploads\images\apartment2.jpeg'),
(2, '"C:\Users\kallu\Desktop\Fullstack6\Fullstack6\real-estate-management\Backend\uploads\images\beachHouse3.jpeg"'),
(3, '"C:\Users\kallu\Desktop\Fullstack6\Fullstack6\real-estate-management\Backend\uploads\images\apartment3.jpeg"');

INSERT INTO `messages` (`sender_id`, `receiver_id`, `message_text`, `property_id`, `sent_at`) VALUES
(2, 1, 'I am interested in the Tel Aviv property. Please provide more details.', 1, NOW()),
(5, 3, 'Can I schedule a viewing for the Jerusalem property?', 3, NOW()),
(3, 2, 'The Haifa property application has been approved.', 2, NOW());



