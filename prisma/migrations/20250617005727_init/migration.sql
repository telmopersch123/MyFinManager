/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `LimitedSimulation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JurosCompostosValuesMensal_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "LimitedSimulation_userId_key" ON "LimitedSimulation"("userId");
