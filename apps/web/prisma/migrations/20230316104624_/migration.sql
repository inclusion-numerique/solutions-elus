/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageAlt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `itemIndexInPage` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `legacyCategories` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `pageIndex` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gristId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coverImage` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localization` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "imageAlt",
DROP COLUMN "imagePath",
DROP COLUMN "itemIndexInPage",
DROP COLUMN "legacyCategories",
DROP COLUMN "pageIndex",
ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "characteristics" TEXT[],
ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "coverImageAlt" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "funding" TEXT,
ADD COLUMN     "goals" TEXT[],
ADD COLUMN     "gristId" INTEGER,
ADD COLUMN     "inaugurationDate" TIMESTAMP(3),
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "localization" TEXT NOT NULL,
ADD COLUMN     "localizationDescription" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedBy" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Quote" (
    "id" UUID NOT NULL,
    "localQuoteForId" UUID,
    "partnerQuoteForId" UUID,
    "order" INTEGER NOT NULL,
    "by" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_gristId_key" ON "Project"("gristId");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_localQuoteForId_fkey" FOREIGN KEY ("localQuoteForId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_partnerQuoteForId_fkey" FOREIGN KEY ("partnerQuoteForId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
