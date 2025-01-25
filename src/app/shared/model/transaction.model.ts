import { Classifier } from "./classifier.model";


export class Transaction {
  id?: number;
  description?: string;
  amount?: number;
  date?: Date;
  dateEnd?: Date;
  typeCla?: Classifier;
  categoryCla?: Classifier;
  createdAt?: Date;
  createdAtEnd?: Date;
  updatedAt?: Date;
  updatedAtEnd?: Date;
}
