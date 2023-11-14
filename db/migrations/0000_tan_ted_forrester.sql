CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`email` text,
	`firstName` text,
	`lastName` text,
	`picture` text,
	`accessToken` text,
	`refreshToken` text
);
--> statement-breakpoint
CREATE INDEX `id_index` ON `user` (`id`);