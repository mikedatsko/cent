import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpService) {}

  getDashboardForChart() {
    return this.http.get('api/dashboard/chart').pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  getDashboardForChartMonth() {
    return this.http.get('api/dashboard/chart/month').pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  getDashboardForTable() {
    return this.http.get('api/dashboard/table').pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }

  getDashboardForTableSources(currency: string) {
    return this.http.get(`api/dashboard/table/sources/${currency}`).pipe(
      map((response) => {
        console.log('response', response);
        return response;
      })
    );
  }
}
