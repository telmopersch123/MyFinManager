/*
  Warnings:

  - You are about to drop the column `valor` on the `JurosCompostosValuesMensal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JurosCompostosValuesMensal" DROP COLUMN "valor",
ADD COLUMN     "jurosMensal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "mes" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "totalInvestido" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "totalJuros" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "valorAcumulado" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
