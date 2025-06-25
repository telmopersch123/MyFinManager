/*
  Warnings:

  - Made the column `userId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;
