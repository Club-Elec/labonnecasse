CREATE TABLE `categories` (
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
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
CREATE TABLE `sales_specifications` (
	`sale` integer,
	`specification` integer,
	FOREIGN KEY (`sale`) REFERENCES `sales`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`specification`) REFERENCES `specifications`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `specifications` (
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `specifications_name_unique` ON `specifications` (`name`);