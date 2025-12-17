CREATE TABLE `custom_auth` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`pin` varchar(6) NOT NULL,
	`name` text,
	`is_active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp,
	CONSTRAINT `custom_auth_id` PRIMARY KEY(`id`),
	CONSTRAINT `custom_auth_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `reset_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`token` varchar(64) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`used` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reset_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `reset_tokens_token_unique` UNIQUE(`token`)
);
