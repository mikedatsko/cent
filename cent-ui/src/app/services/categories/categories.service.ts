import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpService) {}

  getCategories() {
    return this.http.get('api/categories').pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  addCategory(category: Category) {
    return this.http.post('api/categories', category).pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }
}
