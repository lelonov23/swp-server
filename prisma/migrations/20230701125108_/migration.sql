/*
  Warnings:

  - You are about to drop the column `alias` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chatId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_alias_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "alias",
ADD COLUMN     "chatId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_chatId_key" ON "users"("chatId");
