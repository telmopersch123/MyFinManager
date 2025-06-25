import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function Sucess({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute z-50 w-full"
        >
          <Alert
            className="absolute left-1/2 top-5 z-10 w-[90%] -translate-x-1/2 rounded-md border border-primary/50 p-4 shadow-lg sm:w-[50%]"
            variant="default"
          >
            <CheckCircle className="h-5 w-5 !text-primary" />
            <AlertTitle className="font-semibold">
              Plano Premium Ativado!
            </AlertTitle>
            <AlertDescription className="opacity-50">
              Sua assinatura foi concluída com sucesso. Agora você possui acesso
              completo a todos os benefícios do plano Premium.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
