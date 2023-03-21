-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "location" TEXT,
    "title" TEXT,
    "description" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "token" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("token")
);

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

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "scale" TEXT NOT NULL,
    "zipcodes" TEXT[],

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectSubmissionId" UUID NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "gristId" INTEGER,
    "showcase" INTEGER,
    "coverImage" TEXT NOT NULL,
    "coverImageAlt" TEXT,
    "slug" TEXT NOT NULL,
    "district" TEXT,
    "city" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "localizationId" INTEGER NOT NULL,
    "localizationDescription" TEXT,
    "goals" TEXT[],
    "characteristics" TEXT[],
    "description" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,
    "funding" TEXT,
    "inaugurationDate" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "programId" INTEGER,
    "categories" TEXT[],
    "localActor1Name" TEXT,
    "localActor1Text" TEXT,
    "localActor1Image" TEXT,
    "localActor2Name" TEXT,
    "localActor2Text" TEXT,
    "localActor2Image" TEXT,
    "partner1Name" TEXT,
    "partner1Text" TEXT,
    "partner1Image" TEXT,
    "partner2Name" TEXT,
    "partner2Text" TEXT,
    "partner2Image" TEXT,
    "createdBy" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localization" (
    "id" UUID NOT NULL,
    "gristId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "insee" TEXT,
    "echelon" TEXT NOT NULL,
    "department" TEXT,
    "departmentName" TEXT,
    "region" TEXT,
    "regionName" TEXT,
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
    "description" TEXT NOT NULL,
    "territoire" TEXT[],

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ShareProjectFormSubmission_reference_key" ON "ShareProjectFormSubmission"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Project_gristId_key" ON "Project"("gristId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Localization_gristId_key" ON "Localization"("gristId");

-- CreateIndex
CREATE UNIQUE INDEX "Program_gristId_key" ON "Program"("gristId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareProjectFormSubmission" ADD CONSTRAINT "ShareProjectFormSubmission_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_projectSubmissionId_fkey" FOREIGN KEY ("projectSubmissionId") REFERENCES "ShareProjectFormSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "Localization"("gristId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("gristId") ON DELETE SET NULL ON UPDATE CASCADE;
