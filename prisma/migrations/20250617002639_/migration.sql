/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `JurosCompostosValuesMensal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JurosCompostosValuesMensal_userId_key" ON "JurosCompostosValuesMensal"("userId");
