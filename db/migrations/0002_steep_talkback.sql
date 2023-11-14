ALTER TABLE `users` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE users ADD `updatedAt` integer DEFAULT (cast (unixepoch () as int));