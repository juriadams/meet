CREATE TABLE `slack_users` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (cast (unixepoch () as int)),
	`updatedAt` integer DEFAULT (cast (unixepoch () as int)),
	`user` text NOT NULL,
	`slack_team` text NOT NULL,
	`slack_user` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (cast (unixepoch () as int)),
	`updatedAt` integer DEFAULT (cast (unixepoch () as int)),
	`email` text NOT NULL,
	`firstName` text,
	`lastName` text,
	`picture` text,
	`accessToken` text NOT NULL,
	`refreshToken` text NOT NULL,
	`token` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `id_index` ON `slack_users` (`id`);--> statement-breakpoint
CREATE INDEX `id_index` ON `users` (`id`);