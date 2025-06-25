interface Props {
  controlMSGEmpty: boolean;
  tipo: string;
}

export default function MensagemEmpty({ controlMSGEmpty, tipo }: Props) {
  return (
    <div>
      {" "}
      {controlMSGEmpty && (tipo === "" || tipo === "0,00") && (
        <p className="text-xs text-red-400">Por favor, insira um valor</p>
      )}
    </div>
  );
}
