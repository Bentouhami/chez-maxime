-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_bakery_id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "bakery_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_bakery_id_fkey" FOREIGN KEY ("bakery_id") REFERENCES "Bakery"("id") ON DELETE SET NULL ON UPDATE CASCADE;
