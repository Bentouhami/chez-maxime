/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `admin_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `admin_id` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firtName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_role_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_admin_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "admin_id";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "admin_id";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "admin_id",
ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firtName" VARCHAR(20) NOT NULL,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "lastName" VARCHAR(20) NOT NULL,
ADD COLUMN     "phoneNumber" VARCHAR(255) NOT NULL,
ADD COLUMN     "role" "Role" DEFAULT 'USER',
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
