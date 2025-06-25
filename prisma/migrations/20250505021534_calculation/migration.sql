-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);
