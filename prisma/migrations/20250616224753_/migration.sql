/*
  Warnings:

  - Added the required column `userId` to the `LimitedSimulation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LimitedSimulation" ADD COLUMN     "userId" TEXT NOT NULL;
