-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `applicant` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`first_name` varchar(20) NOT NULL,
	`last_name` varchar(20) NOT NULL,
	`designation` varchar(30) NOT NULL DEFAULT 'Intern',
	`full_address` varchar(255),
	`email` varchar(100),
	`phone` varchar(20) NOT NULL,
	`country` char(2),
	`city` varchar(30),
	`state` char(2),
	`gender` enum('male','female','other') NOT NULL,
	`zip_code` char(6),
	`relationship_status` enum('single','committed'),
	`dob` date NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`deleted_at` datetime,
	CONSTRAINT `applicant_id` PRIMARY KEY(`id`),
	CONSTRAINT `phone` UNIQUE(`phone`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `kysely_migration` (
	`name` varchar(255) NOT NULL,
	`timestamp` varchar(255) NOT NULL,
	CONSTRAINT `kysely_migration_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `kysely_migration_lock` (
	`id` varchar(255) NOT NULL,
	`is_locked` int NOT NULL DEFAULT 0,
	CONSTRAINT `kysely_migration_lock_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `technologies` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`applicant_id` int unsigned NOT NULL,
	`label` varchar(50) NOT NULL,
	`proficiency` enum('beginner','intermediate','expert'),
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime,
	CONSTRAINT `technologies_id` PRIMARY KEY(`id`),
	CONSTRAINT `applicant_id` UNIQUE(`applicant_id`,`label`)
);
--> statement-breakpoint
ALTER TABLE `technologies` ADD CONSTRAINT `fk_technologies_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_technologies_applicant_id` ON `technologies` (`applicant_id`);
*/