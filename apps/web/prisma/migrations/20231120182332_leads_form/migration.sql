-- CreateTable
CREATE TABLE "GetLeadFormSubmission" (
    "id" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "GetLeadFormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GetLeadFormSubmission_reference_key" ON "GetLeadFormSubmission"("reference");

-- AddForeignKey
ALTER TABLE "GetLeadFormSubmission" ADD CONSTRAINT "GetLeadFormSubmission_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
