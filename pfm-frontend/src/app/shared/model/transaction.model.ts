import { TransactionCategory } from "../enum/transactionCategory.enum";
import { TransactionType } from "../enum/transactionType.enum";


export class Transaction {
  id?: number;
  description?: string;
  amount?: number;
  date?: Date;
  dateEnd?: Date;
  type?: TransactionType;
  category?: TransactionCategory;
  createdAt?: Date;
  createdAtEnd?: Date;
  updatedAt?: Date;
  updatedAtEnd?: Date;
}
