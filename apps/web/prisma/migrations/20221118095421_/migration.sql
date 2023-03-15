/*
  Warnings:

  - You are about to drop the column `category` on the `LegacyProject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LegacyProject" DROP COLUMN "category",
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "program" TEXT;
