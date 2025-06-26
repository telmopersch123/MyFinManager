"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const openDialog = (
  type: string,
  setTitle: (open: string) => void,
  setDescription: (open: string) => void,
) => {
  switch (type) {
    case "alert-1":
      setTitle("Você tem certeza disso?");
      setDescription(
        "Após clicar em confirmar, essa transação será completamente removida do sistema!",
      );
      break;
    case "alert-2":
      setTitle("Algo está errado!");
      setDescription(
        "Por favor, insira uma data válida no formato DD/MM/AAAA, que não esteja no passado nem muito distante no futuro.",
      );
      break;
    case "alert-3":
      setTitle("Algo está errado!");
      setDescription(
        "Por favor, insira valores válidos para valor inicial e prazo.",
      );
      break;
    case "alert-4":
      setTitle("Algo está errado!");
      setDescription(
        "Por favor, insira uma taxa de retorno válida (maior que 0).",
      );
      break;
    case "alert-5":
      setTitle("Algo está errado!");
      setDescription("O aporte mensal não pode ser negativo.");
      break;
    case "alert-6":
      setTitle("Algo está errado!");
      setDescription("Erro na simulação. Verifique os valores inseridos.");
      break;
    case "alert-7":
      setTitle("Algo está errado!");
      setDescription("Erro na simulação. É necessário efetuar uma simulação.");
    case "alert-8":
      setTitle("Algo está errado!");
      setDescription("Erro na simulação. Nome da transação duplicado!");
      break;
  }
};

interface openProps {
  open: { type: string; isOpen: boolean };
  setOpenAction: Dispatch<SetStateAction<{ type: string; isOpen: boolean }>>;
  handleConfirm?: () => void | Promise<void>;
}
export default function Alert_Dialog({
  open,
  setOpenAction,
  handleConfirm,
}: openProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    openDialog(open.type, setTitle, setDescription);
  }, [open.type]);
  return (
    <div>
      <AlertDialog
        open={open.isOpen}
        onOpenChange={(setOpen) => {
          if (setOpen) {
            openDialog(open.type, setTitle, setDescription);
          }
        }}
      >
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpenAction({ type: "", isOpen: false })}
            >
              {open.type === "alert-1" ? "Cancelar" : "Ok"}
            </AlertDialogCancel>
            {open.type === "alert-1" && (
              <AlertDialogAction onClick={() => handleConfirm?.()}>
                Confirmar
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
