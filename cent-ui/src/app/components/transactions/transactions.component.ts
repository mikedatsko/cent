import { Component } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  registerLocaleData,
} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import uk from '@angular/common/locales/uk';
import { Transaction } from '../../interfaces/transaction';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { DialogAddTransactionComponent } from '../dialog-add-transaction/dialog-add-transaction.component';

registerLocaleData(uk);

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CurrencyPipe,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  ELEMENT_DATA: Transaction[] = [];
  displayedColumns: string[] = [];
  transactions: Transaction[] = [];

  constructor(
    public dialog: MatDialog,
    private transactionsService: TransactionsService
  ) {
    this.displayedColumns = [
      'tr-type',
      'tr-category',
      'tr-source',
      'tr-date',
      'tr-name',
      'tr-value',
      'tr-currency',
      'tr-rate',
    ];
  }

  ngOnInit() {
    // this.dataSource = this.ELEMENT_DATA;
    this.transactionsService
      .getTransactions()
      .subscribe((transactions: any) => {
        console.log('transactions', transactions);
        this.transactions = [...transactions].sort((a, b) =>
          a.date < b.date ? 1 : -1
        );
      });
  }

  getTotal() {
    return this.transactions
      .map((t) => t.value)
      .reduce((acc, value) => acc + value, 0);
  }

  openAddTransactionDialog() {
    const dialogRef = this.dialog.open(DialogAddTransactionComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
