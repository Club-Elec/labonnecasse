CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`create_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`disabled` integer DEFAULT false
);
