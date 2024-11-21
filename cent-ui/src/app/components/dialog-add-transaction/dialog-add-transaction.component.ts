import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { SourcesService } from '../../services/sources/sources.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { Transaction } from '../../interfaces/transaction';
import { Source } from '../../interfaces/source';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-dialog-add-transaction',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-transaction.component.html',
  styleUrl: './dialog-add-transaction.component.css',
})
export class DialogAddTransactionComponent {
  sources: Source[] = [];
  categories: Category[] = [];
  sourceId = new FormControl('');
  categoryId = new FormControl('');
  type = new FormControl('EXP');
  date = new FormControl(new Date());
  currency = new FormControl('UAH');
  value = new FormControl(0);
  rate = new FormControl(0);
  name = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<DialogAddTransactionComponent>,
    private transactionsService: TransactionsService,
    private sourcesService: SourcesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.sourcesService.getSources().subscribe((sources: any) => {
      this.sources = [...sources];
    });

    this.categoriesService.getCategories().subscribe((categories: any) => {
      this.categories = [...categories];
    });
  }

  submitAddTransaction() {
    console.log(
      this.sourceId.value,
      this.categoryId.value,
      this.type.value,
      this.date.value,
      this.currency.value,
      this.value.value,
      this.rate.value,
      this.name.value
    );

    const dateNow = new Date();
    const dateSelected = this.date.value || new Date();
    const dateTransaction = `${dateSelected.getFullYear()}-${`0${
      dateSelected.getMonth() + 1
    }`.slice(-2)}-${`0${dateSelected.getDate()}`.slice(
      -2
    )} ${`0${dateNow.getHours()}`.slice(-2)}:${`0${dateNow.getMinutes()}`.slice(
      -2
    )}:${`0${dateNow.getSeconds()}`.slice(-2)}`;
    console.log('date', dateTransaction);
    const transaction: Transaction = {
      sourceId: this.sourceId.value || '',
      categoryId: this.categoryId.value || '',
      type: this.type.value || 'EXP',
      date: dateTransaction,
      currency: this.currency.value || 'UAH',
      value: this.value.value || 0,
      rate: this.rate.value || 0,
      name: this.name.value || '',
    };

    this.transactionsService
      .addTransaction(transaction)
      .subscribe((response) => {
        console.log('response', response);
        this.dialogRef.close();
      });
  }
}
