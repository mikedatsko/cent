import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SourcesService } from '../../services/sources/sources.service';
import { Source } from '../../interfaces/source';

@Component({
  selector: 'app-dialog-add-source',
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
  templateUrl: './dialog-add-source.component.html',
  styleUrl: './dialog-add-source.component.css',
})
export class DialogAddSourceComponent {
  name = new FormControl('');
  balance = new FormControl(0);
  credit = new FormControl(0);
  debit = new FormControl(0);
  currency = new FormControl('UAH');

  constructor(
    public dialogRef: MatDialogRef<DialogAddSourceComponent>,
    private sourcesService: SourcesService
  ) {}

  ngOnInit() {}

  submitAddSource() {
    console.log(this.name.value, this.balance.value, this.currency.value);

    const source: Source = {
      name: this.name.value || '',
      balance: this.balance.value || 0,
      credit: this.credit.value || 0,
      debit: this.debit.value || 0,
      currency: this.currency.value || 'UAH',
    };

    this.sourcesService.addSource(source).subscribe((response: any) => {
      console.log('response', response);
      this.dialogRef.close();
    });
  }
}
