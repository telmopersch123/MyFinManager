-- CreateTable
CREATE TABLE "CronogramaItem" (
    "id" TEXT NOT NULL,
    "parcela" TEXT NOT NULL,
    "dataVencimento" TEXT NOT NULL,
    "prestacao" TEXT NOT NULL,
    "juros" TEXT NOT NULL,
    "amortizacao" TEXT NOT NULL,
    "saldo" TEXT NOT NULL,
    "parcelamentoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CronogramaItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CronogramaItem" ADD CONSTRAINT "CronogramaItem_parcelamentoId_fkey" FOREIGN KEY ("parcelamentoId") REFERENCES "Parcelamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
