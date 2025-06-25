-- CreateTable
CREATE TABLE "Juros" (
    "id" TEXT NOT NULL,
    "capitalinicial" TEXT NOT NULL,
    "valorMensal" TEXT,
    "taxajuros" TEXT NOT NULL,
    "taxajurosUnidade" TEXT NOT NULL,
    "tempo" INTEGER NOT NULL,
    "tempoUnidade" TEXT NOT NULL,
    "valorInvestido" TEXT NOT NULL,
    "totalganhoemjuros" TEXT NOT NULL,
    "valortotalfinal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Juros_pkey" PRIMARY KEY ("id")
);
