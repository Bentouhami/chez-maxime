/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `phone` to the `Bakery` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('KG', 'G', 'MG', 'L', 'ML', 'T');

-- AlterTable
ALTER TABLE "Bakery" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" "Unit",
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
