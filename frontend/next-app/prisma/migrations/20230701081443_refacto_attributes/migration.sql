/*
  Warnings:

  - You are about to drop the column `clerk_id` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `clerk_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `clerk_id` on the `UserMembership` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserMembership` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `UserMembership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `UserMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Organization_clerk_id_key";

-- DropIndex
DROP INDEX "User_clerk_id_key";

-- DropIndex
DROP INDEX "UserMembership_clerk_id_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "clerk_id",
ADD COLUMN     "clerkId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerk_id",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "clerkId" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- AlterTable
ALTER TABLE "UserMembership" DROP COLUMN "clerk_id",
DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
ADD COLUMN     "clerkId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_clerkId_key" ON "Organization"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMembership_clerkId_key" ON "UserMembership"("clerkId");
