/*
  Warnings:

  - Made the column `title` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `yearId` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL;

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "yearId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Year" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Year_name_key" ON "Year"("name");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
