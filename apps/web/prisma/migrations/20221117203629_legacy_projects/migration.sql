-- CreateTable
CREATE TABLE "LegacyProject" (
    "id" TEXT NOT NULL,
    "pageIndex" INTEGER NOT NULL,
    "itemIndexInPage" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "LegacyProject_pkey" PRIMARY KEY ("id")
);
