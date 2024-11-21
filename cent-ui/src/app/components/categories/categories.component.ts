import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories/categories.service';
import { DialogAddCategoryComponent } from '../dialog-add-category/dialog-add-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CurrencyPipe, MatIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories: Category[] = [];
  displayedColumns: string[] = [];

  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService
  ) {
    this.displayedColumns = ['categories-name'];
  }

  ngOnInit() {
    // this.dataSource = this.ELEMENT_DATA;
    this.categoriesService.getCategories().subscribe((categories: any) => {
      console.log('categories', categories);
      this.categories = [...categories];
    });
  }

  getTotal(prop: string) {
    return this.categories
      .map((s: any) => s[prop])
      .reduce((acc, value) => acc + value, 0);
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(DialogAddCategoryComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
