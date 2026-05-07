CREATE TABLE `useCaseSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`status` enum('draft','ready','archived') NOT NULL DEFAULT 'draft',
	`currentStep` varchar(80) NOT NULL DEFAULT 'friction',
	`answers` json NOT NULL,
	`guidanceHistory` json NOT NULL,
	`problemStatement` json,
	`architectureConfig` json,
	`calculationSnapshot` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `useCaseSessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `useCaseSessions` ADD CONSTRAINT `useCaseSessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;