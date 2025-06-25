-- CreateTable
CREATE TABLE "LimitedSimulation" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LimitedSimulation_pkey" PRIMARY KEY ("id")
);
