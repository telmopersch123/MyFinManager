/*
  Warnings:

  - You are about to alter the column `mes` on the `JurosCompostosValuesMensal` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "JurosCompostosValuesMensal" ALTER COLUMN "mes" SET DEFAULT 0,
ALTER COLUMN "mes" SET DATA TYPE INTEGER;
