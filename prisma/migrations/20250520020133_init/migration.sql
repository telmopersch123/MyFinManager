/*
  Warnings:

  - The `mes` column on the `JurosCompostosValuesMensal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "JurosCompostosValuesMensal" DROP COLUMN "mes",
ADD COLUMN     "mes" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
