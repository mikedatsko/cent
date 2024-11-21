import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Source } from '../../interfaces/source';

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  constructor(private http: HttpService) {}

  getSources() {
    return this.http.get('api/sources').pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  addSource(source: Source) {
    return this.http.post('api/sources', source).pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }
}
