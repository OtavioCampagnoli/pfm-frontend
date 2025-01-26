import { Transaction } from "../model/transaction.model";

export class TransactionSearchDTO extends Transaction {
  dateEnd?: Date;
  createdAtEnd?: Date;
  updatedAtEnd?: Date;
}
