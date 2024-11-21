import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-dialog-add-category',
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
  templateUrl: './dialog-add-category.component.html',
  styleUrl: './dialog-add-category.component.css',
})
export class DialogAddCategoryComponent {
  name = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<DialogAddCategoryComponent>,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {}

  submitAddCategory() {
    console.log(this.name.value);

    const category: Category = {
      name: this.name.value || '',
    };

    this.categoriesService.addCategory(category).subscribe((response: any) => {
      console.log('response', response);
      this.dialogRef.close();
    });
  }
}
