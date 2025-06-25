import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
};

export const transactionCategoryMap = {
  HOUSING: "Moradia",
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  OTHER: "Outros",
  SALARY: "Sálario",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
};
export const transactionPaymentMap = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const transactionTypeMethodsMap = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const transactionPaymentMethodsMap = [
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label: transactionPaymentMap[TransactionPaymentMethod.BANK_TRANSFER],
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label: transactionPaymentMap[TransactionPaymentMethod.BANK_SLIP],
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: transactionPaymentMap[TransactionPaymentMethod.CASH],
  },
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label: transactionPaymentMap[TransactionPaymentMethod.CREDIT_CARD],
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label: transactionPaymentMap[TransactionPaymentMethod.DEBIT_CARD],
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: transactionPaymentMap[TransactionPaymentMethod.PIX],
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: transactionPaymentMap[TransactionPaymentMethod.OTHER],
  },
];

export const transactionCategoryOptionsMap = [
  {
    value: TransactionCategory.EDUCATION,
    label: transactionCategoryMap[TransactionCategory.EDUCATION],
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: transactionCategoryMap[TransactionCategory.ENTERTAINMENT],
  },
  {
    value: TransactionCategory.FOOD,
    label: transactionCategoryMap[TransactionCategory.FOOD],
  },
  {
    value: TransactionCategory.HEALTH,
    label: transactionCategoryMap[TransactionCategory.HEALTH],
  },
  {
    value: TransactionCategory.HOUSING,
    label: transactionCategoryMap[TransactionCategory.HOUSING],
  },
  {
    value: TransactionCategory.OTHER,
    label: transactionCategoryMap[TransactionCategory.OTHER],
  },
  {
    value: TransactionCategory.SALARY,
    label: transactionCategoryMap[TransactionCategory.SALARY],
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: transactionCategoryMap[TransactionCategory.TRANSPORTATION],
  },
  {
    value: TransactionCategory.UTILITY,
    label: transactionCategoryMap[TransactionCategory.UTILITY],
  },
];
