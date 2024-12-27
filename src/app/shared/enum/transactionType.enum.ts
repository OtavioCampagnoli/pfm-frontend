export enum TransactionType {
  INCOME,
  EXPENSE
}

export const TransactionTypeLabelMap = new Map<TransactionType, string>([
  [TransactionType.INCOME, 'Entrada'],
  [TransactionType.EXPENSE, 'Saída'],
]);
