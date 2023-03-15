/*
  Warnings:

  - You are about to drop the `LegacyProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LegacyProject";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "showcase" INTEGER,
    "pageIndex" INTEGER NOT NULL,
    "itemIndexInPage" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "district" TEXT,
    "city" TEXT,
    "title" TEXT NOT NULL,
    "program" TEXT,
    "legacyCategories" TEXT[],
    "categories" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
