/*
  Warnings:

  - Made the column `product_id` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guestEmail` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_bakery_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "product_id" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "guestEmail" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_bakery_id_fkey" FOREIGN KEY ("bakery_id") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
