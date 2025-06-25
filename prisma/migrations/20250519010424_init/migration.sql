-- CreateTable
CREATE TABLE "JurosCompostosValuesMensal" (
    "id" TEXT NOT NULL,
    "jurosId" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JurosCompostosValuesMensal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JurosCompostosValuesMensal" ADD CONSTRAINT "JurosCompostosValuesMensal_jurosId_fkey" FOREIGN KEY ("jurosId") REFERENCES "Juros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
