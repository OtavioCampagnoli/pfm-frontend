import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  listAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiURL}/api/transaction/listAll`);
  }

  getById (id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${environment.apiURL}/api/transaction/${id}`);
  }

  search (transaction: Transaction): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`${environment.apiURL}/api/transaction/search`, transaction);
  }

  save (transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiURL}/api/transaction`, transaction);
  }

  delete (id?: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${environment.apiURL}/api/transaction/${id}`);
  }

}
