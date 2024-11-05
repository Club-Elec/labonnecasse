CREATE TABLE `sale_schema` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sale_schema_specifications` (
	`schema` integer,
	`specification` integer,
	`required` integer DEFAULT 0,
	FOREIGN KEY (`schema`) REFERENCES `sale_schema`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`specification`) REFERENCES `specifications`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sales_images` (
	`sale` integer,
	`url` text NOT NULL,
	FOREIGN KEY (`sale`) REFERENCES `sales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `specifications_values` (
	`specification` integer,
	`value` text NOT NULL,
	FOREIGN KEY (`specification`) REFERENCES `specifications`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `sales` ADD `schema` integer REFERENCES sale_schema(id);--> statement-breakpoint
ALTER TABLE `sales_specifications` ADD `value` text NOT NULL;