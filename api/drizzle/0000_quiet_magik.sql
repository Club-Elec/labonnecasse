CREATE TABLE `categories` (
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE TABLE `sale_schema_specifications` (
	`name` text,
	`specification` text,
	FOREIGN KEY (`name`) REFERENCES `categories`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`specification`) REFERENCES `specifications`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` integer DEFAULT 0 NOT NULL,
	`category` text NOT NULL,
	`create_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`category`) REFERENCES `categories`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sales_images` (
	`sale` integer,
	`url` text NOT NULL,
	FOREIGN KEY (`sale`) REFERENCES `sales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sales_specifications` (
	`sale` integer,
	`specification` text,
	`value` text NOT NULL,
	FOREIGN KEY (`sale`) REFERENCES `sales`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`specification`) REFERENCES `specifications`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `specifications` (
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `specifications_name_unique` ON `specifications` (`name`);--> statement-breakpoint
CREATE TABLE `specifications_values` (
	`specification` text,
	`value` text NOT NULL,
	FOREIGN KEY (`specification`) REFERENCES `specifications`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`create_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`disabled` integer DEFAULT false
);
