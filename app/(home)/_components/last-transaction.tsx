import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { ClientTransaction } from "@/app/transactions/_columns/schema";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransaction: ClientTransaction[];
}

const LastTransactions = ({ lastTransaction }: LastTransactionsProps) => {
  const getPriceColo = (transaction: ClientTransaction) => {
    switch (transaction.type) {
      case "DEPOSIT":
        return "text-green-500";
      case "INVESTMENT":
        return "text-white";
      case "EXPENSE":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getAmoutPrefix = (transaction: ClientTransaction) => {
    switch (transaction.type) {
      case "DEPOSIT":
        return "+ ";
      case "INVESTMENT":
        return "? ";
      case "EXPENSE":
        return "- ";
    }
  };

  return (
    <div className="flex h-full flex-col rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="space-y-6 p-4">
          {lastTransaction.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nenhuma transação encontrada.
            </p>
          ) : (
            lastTransaction
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-black bg-opacity-[3%] p-3 dark:bg-white dark:bg-opacity-[3%]">
                      <Image
                        src={
                          TRANSACTION_PAYMENT_METHOD_ICONS[
                            transaction.paymentMethod
                          ]
                        }
                        width={20}
                        height={20}
                        alt="pix"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm font-bold ${getPriceColo(transaction)}`}
                  >
                    {getAmoutPrefix(transaction)}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))
              .slice(0, 30)
          )}
        </CardContent>
      </ScrollArea>
    </div>
  );
};

export default LastTransactions;
