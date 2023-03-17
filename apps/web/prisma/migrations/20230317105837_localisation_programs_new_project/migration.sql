/*
  Warnings:

  - You are about to drop the column `localization` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `localizationId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_localQuoteForId_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_partnerQuoteForId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "localization",
DROP COLUMN "program",
ADD COLUMN     "localActor1Image" TEXT,
ADD COLUMN     "localActor1Name" TEXT,
ADD COLUMN     "localActor1Text" TEXT,
ADD COLUMN     "localActor2Image" TEXT,
ADD COLUMN     "localActor2Name" TEXT,
ADD COLUMN     "localActor2Text" TEXT,
ADD COLUMN     "localizationId" INTEGER NOT NULL,
ADD COLUMN     "partner1Image" TEXT,
ADD COLUMN     "partner1Name" TEXT,
ADD COLUMN     "partner1Text" TEXT,
ADD COLUMN     "partner2Image" TEXT,
ADD COLUMN     "partner2Name" TEXT,
ADD COLUMN     "partner2Text" TEXT,
ADD COLUMN     "programId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Quote";

-- CreateTable
CREATE TABLE "Localization" (
    "id" UUID NOT NULL,
    "gristId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "insee" TEXT,
    "echelon" TEXT NOT NULL,
    "department" TEXT,
    "region" TEXT,
    "population" INTEGER,
    "siren" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "ncc" TEXT NOT NULL,

    CONSTRAINT "Localization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" UUID NOT NULL,
    "gristId" INTEGER NOT NULL,
    "politique" TEXT NOT NULL,
    "name" TEXT,
    "territoire" TEXT[],

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Localization_gristId_key" ON "Localization"("gristId");

-- CreateIndex
CREATE UNIQUE INDEX "Program_gristId_key" ON "Program"("gristId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "Localization"("gristId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("gristId") ON DELETE RESTRICT ON UPDATE CASCADE;
