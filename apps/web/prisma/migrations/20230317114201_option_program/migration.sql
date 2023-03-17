-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_programId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "programId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("gristId") ON DELETE SET NULL ON UPDATE CASCADE;
