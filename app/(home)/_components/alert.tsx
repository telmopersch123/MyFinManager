import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface ValuesAlert {
  isVisible: boolean;
  message: string;
  alertColor: string;
}

export default function AlertComponent({
  isVisible,
  message,
  alertColor,
}: ValuesAlert) {
  const colorStyles = {
    green: {
      bg: "bg-green-900 bg-opacity-10",
      text: "text-green-800",
      title: "Sucesso!",
      icon: <CheckCircleIcon className={`mt-1 h-5 w-5 !text-green-800`} />,
    },
    red: {
      bg: "bg-red-900 bg-opacity-10",
      text: "text-red-800",
      title: "Erro!",
      icon: <XCircleIcon className={`mt-1 h-5 w-5 !text-red-800`} />,
    },
  };

  const styles =
    colorStyles[alertColor as keyof typeof colorStyles] || colorStyles.green;
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ x: 200, opacity: 0 }} // começa da direita e invisível
            animate={{ x: 0, opacity: 1 }} // vai para o lugar certo e aparece
            exit={{ x: 200, opacity: 0 }} // quando sair, volta pra direita e some
            transition={{ duration: 0.5, ease: "easeOut" }} // meio segundinho suave
            className="fixed bottom-4 right-4 z-50"
          >
            <Alert
              className={`${styles.bg} ${styles.text} flex items-start gap-2 rounded-lg bg-opacity-10 p-4 shadow-lg`}
            >
              {styles.icon}
              <div>
                <AlertTitle className="font-bold">{styles.title}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </div>
            </Alert>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
