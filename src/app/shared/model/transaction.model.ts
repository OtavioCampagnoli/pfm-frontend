import { Classifier } from "./classifier.model";


export class Transaction {
  id?: number;
  description?: string;
  amount?: number;
  date?: Date;
  typeCla?: Classifier;
  categoryCla?: Classifier;
  createdAt?: Date;
  updatedAt?: Date;
}
