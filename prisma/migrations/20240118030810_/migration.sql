/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_user_id_fkey`;

-- DropTable
DROP TABLE `session`;

-- DropTable
DROP TABLE `verificationtoken`;
