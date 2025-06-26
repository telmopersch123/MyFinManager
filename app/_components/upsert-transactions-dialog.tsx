"use client";
import useSWR, { mutate } from "swr";
import {
  transactionCategoryOptionsMap,
  transactionPaymentMethodsMap,
  transactionTypeMethodsMap,
} from "../_constants/transactions";
import { MoneyInput } from "./money-inputs";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../(home)/_components/loading";
import { upsertTransactions } from "../_actions/add-transactions";
import Alert_Dialog from "../transactions/_components/components/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  amount: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor é obrigatório.",
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatória.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "A categoria é obrigatória.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatória.",
  }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;
interface UpsertTransactionDialogProps {
  month?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: FormSchema;
  transactionId?: string;
  handleFunctionAlert?: () => void;
  handleMessage?: (message: string, color: string) => void;
  hasPremiumPlan: boolean | null;
}

const UpsertTransactionDialog = ({
  month,
  isOpen,
  setIsOpen,
  defaultValues,
  transactionId,
  handleFunctionAlert,
  handleMessage,
  hasPremiumPlan,
}: UpsertTransactionDialogProps) => {
  const [open, setOpen] = useState<{ type: string; isOpen: boolean }>({
    type: "",
    isOpen: false,
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 10,
      category: TransactionCategory.OTHER,
      date: new Date(),
      name: "",
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      form.reset(defaultValues);
    }
  }, [isOpen, defaultValues, form]);

  const { data, error, isLoading } = useSWR(
    `/api/subscription`,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  );
  if (error) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-50/80 px-4 py-3 text-sm text-red-700 shadow-sm dark:border-red-600/30 dark:bg-red-900/20 dark:text-red-300">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 dark:text-red-400" />
          <span>
            Ops! Algo deu errado ao carregar os dados. Atualize a página
          </span>
        </div>
      </div>
    );
  }
  if (isLoading || !data)
    return (
      <div>
        <Loading />
      </div>
    );
  const currentMonthTransactions = data.count;

  const onSubmit = async (data: FormSchema) => {
    try {
      if (currentMonthTransactions >= 30 && !hasPremiumPlan) return;
      const response = await fetch(`/api/transactions/${transactionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Erro na requisição:", response.statusText);
        return;
      }
      const dateTransaction = await response.json();

      const typedName = form.getValues("name").trim();
      const isDuplicated = dateTransaction.some(
        (item: { name: string; id: string }) =>
          (transactionId ? item.id !== transactionId : true) &&
          item.name.trim() === typedName,
      );
      if (isDuplicated) {
        setOpen({ type: "alert-8", isOpen: true });
        return;
      }

      await upsertTransactions({ ...data, id: transactionId });
      mutate(`/api/dashboard?month=${month}`);
      handleConstAlerts();
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  const isUpdate = Boolean(transactionId);

  const handleConstAlerts = () => {
    handleFunctionAlert?.();
    handleMessage?.(
      isUpdate
        ? "Transação atualizada com sucesso!"
        : "Transação criada com sucesso!",
      "green",
    );
    form.reset();
  };

  return (
    <>
      <Dialog
        open={
          isOpen && (!hasPremiumPlan ? currentMonthTransactions < 30 : true)
        }
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            form.reset();
          }
        }}
      >
        <DialogContent className="w-[80%] sm:w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? "Editar" : "Adicionar"} transação
            </DialogTitle>
            <DialogDescription>Insira as informaçõers abaixo</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <MoneyInput
                        placeholder="Digite o valor"
                        value={field.value}
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue ?? 0)
                        }
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionTypeMethodsMap.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionCategoryOptionsMap.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de pagamento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona método de pagamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionPaymentMethodsMap.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={() => {
                    if (
                      form.getValues().name === "" ||
                      form.getValues().amount === 0 ||
                      !form.getValues().date
                    ) {
                      return;
                    }
                    setIsOpen(false);
                  }}
                >
                  {isUpdate ? "Editar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Alert_Dialog open={open} setOpenAction={setOpen} />
    </>
  );
};

export default UpsertTransactionDialog;
