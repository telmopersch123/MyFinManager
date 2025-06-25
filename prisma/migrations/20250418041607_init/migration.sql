/*
  Warnings:

  - You are about to drop the column `created` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Changed the type of `paymentMethod` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionPaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "created",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "TransactionPaymentMethod" NOT NULL;

-- DropEnum
DROP TYPE "TransactionPaymentCategory";
