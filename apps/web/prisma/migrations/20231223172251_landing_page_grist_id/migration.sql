/*
  Warnings:

  - A unique constraint covering the columns `[gristId]` on the table `LandingPageSEO` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gristId` to the `LandingPageSEO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LandingPageSEO" ADD COLUMN     "gristId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LandingPageSEO_gristId_key" ON "LandingPageSEO"("gristId");
