/*
  Warnings:

  - You are about to drop the column `projectId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectSubmissionId` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_communityId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "projectId",
ADD COLUMN     "projectSubmissionId" UUID NOT NULL;

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "ShareProjectFormSubmission" (
    "id" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "domain" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dates" TEXT NOT NULL,
    "partners" TEXT NOT NULL,
    "tech" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "ShareProjectFormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareProjectFormSubmission_reference_key" ON "ShareProjectFormSubmission"("reference");

-- AddForeignKey
ALTER TABLE "ShareProjectFormSubmission" ADD CONSTRAINT "ShareProjectFormSubmission_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_projectSubmissionId_fkey" FOREIGN KEY ("projectSubmissionId") REFERENCES "ShareProjectFormSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
