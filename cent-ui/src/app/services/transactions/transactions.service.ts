import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs';
import { Transaction } from '../../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpService) {}

  getTransactions() {
    return this.http.get('api/transactions').pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  getTransaction(transactionId: string) {
    return this.http.get(`api/transactions/${transactionId}`).pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  addTransaction(transaction: Transaction) {
    return this.http.post(`api/transactions/`, transaction).pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  updateTransaction(transaction: Transaction) {
    return this.http.put(`api/transactions/`, transaction).pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete(`api/transactions/${transactionId}`).pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }
}
