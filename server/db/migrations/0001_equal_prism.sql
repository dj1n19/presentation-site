CREATE TABLE `documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`filename` text NOT NULL,
	`mimeType` text NOT NULL,
	`uploadedAt` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `messages` ADD `userId` integer REFERENCES users(id);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `userId` integer REFERENCES users(id);