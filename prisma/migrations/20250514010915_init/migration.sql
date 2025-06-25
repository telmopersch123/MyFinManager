-- CreateTable
CREATE TABLE "Parcelamento" (
    "id" TEXT NOT NULL,
    "valorDivida" TEXT NOT NULL,
    "parcelas" TEXT NOT NULL,
    "jurosMes" TEXT NOT NULL,
    "jurosUnidade" TEXT NOT NULL,
    "primeiroVencimento" TIMESTAMP(3) NOT NULL,
    "valorFinanciado" TEXT NOT NULL,
    "parcelasResultado" TEXT NOT NULL,
    "taxaMensal" TEXT NOT NULL,
    "prestacaoMensal" TEXT NOT NULL,
    "totalJuros" TEXT NOT NULL,
    "totalPagar" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parcelamento_pkey" PRIMARY KEY ("id")
);
