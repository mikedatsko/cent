import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    MatTableModule,
    MatButtonModule,
    CurrencyPipe,
    MatIconModule,
    MatGridListModule,
  ],
})
export class DashboardComponent {
  chart: any = [];
  dashboardTable: any[] = [];
  dataDashboardTableSourcesUah: any[] = [];
  dataDashboardChart: any[] = [];
  dataDashboardChartMonth: any[] = [];
  displayedColumns: string[] = [];
  displayedColumnsSourcesUah: string[] = [];

  constructor(private dashboardService: DashboardService) {
    this.displayedColumns = [
      'dashboard-type',
      'dashboard-category',
      'dashboard-source',
      'dashboard-date',
      'dashboard-name',
      'dashboard-amount',
      'dashboard-currency',
      'dashboard-rate',
    ];
    this.displayedColumnsSourcesUah = [
      'dashboard-sources-name',
      'dashboard-sources-balance',
      'dashboard-sources-currency',
    ];
    Chart.register(ChartDataLabels);
  }

  ngOnInit() {
    this.dashboardService.getDashboardForChart().subscribe((data: any) => {
      this.dataDashboardChart = [...data];
      this.initChart();
    });
    this.dashboardService.getDashboardForChartMonth().subscribe((data: any) => {
      this.dataDashboardChartMonth = [...data];
      this.initChartMonth();
    });
    this.dashboardService
      .getDashboardForTableSources('UAH')
      .subscribe((data: any) => {
        this.dataDashboardTableSourcesUah = [...data];
      });
  }

  initChart() {
    console.log('dataDashboardChart', this.dataDashboardChart);
    // const data = [
    //   { y: 'Jan', INC: 100, EXP: 50 },
    //   { y: 'Feb', INC: 80, EXP: 125 },
    //   { y: 'Mar', INC: 120, EXP: 75 },
    //   { y: 'Apr', INC: 220, EXP: 95 },
    //   { y: 'May', INC: 150, EXP: 30 },
    // ];
    const data = this.dataDashboardChart;
    const datasetsLabels = ['INC', 'EXP', 'TFI', 'TFE'];

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [...new Set(data.map((d) => d.y))],
        datasets: [
          {
            label: 'Income',
            data: data,
            parsing: {
              xAxisKey: 'INC',
            },
            datalabels: {
              display: false,
            },
            borderColor: '#080',
            backgroundColor: '#3D8',
          },
          {
            label: 'Expenses',
            data: data,
            parsing: {
              xAxisKey: 'EXP',
            },
            datalabels: {
              display: false,
            },
            borderColor: '#f00',
            backgroundColor: '#ff6f6f',
          },
          {
            label: 'Transfer In',
            data: data,
            parsing: {
              xAxisKey: 'TFI',
            },
            datalabels: {
              display: false,
            },
            borderColor: '#00f',
            backgroundColor: '#5cf',
          },
          {
            label: 'Transfer Ex',
            data: data,
            parsing: {
              xAxisKey: 'TFE',
            },
            datalabels: {
              display: false,
            },
            borderColor: '#009',
            backgroundColor: '#11c',
          },
        ],
      },
      options: {
        indexAxis: 'y',
        animation: {
          onComplete: function (animation) {
            const self: any = this;
            const ctx = animation.chart.ctx;
            // ctx.font = this.scale.font;
            // ctx.fillStyle = this.scale.textColor;
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'bottom';

            // console.log('animation', animation, self.data);

            self.data.datasets.forEach(function (dataset: any, i: number) {
              var meta = animation.chart.getDatasetMeta(i);
              meta.data.forEach(function (bar: any, index: number) {
                var data = dataset.data[index];
                // console.log('bar', datasetsLabels[i], data[datasetsLabels[i]]);
                ctx.fillText(data[datasetsLabels[i]], bar.x + 5, bar.y);
              });
            });

            // animation.datasets.forEach(function (dataset) {
            //   dataset.points.forEach(function (points) {
            //     ctx.fillText(points.value, points.x, points.y - 10);
            //   });
            // });
          },
        },
        // parsing: {
        //   xAxisKey: 'key',
        //   yAxisKey: 'value',
        // },
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        // scales: {
        //   y: {
        //     beginAtZero: true,
        //   },
        // },
      },
    });
  }

  initChartMonth() {
    console.log('dataDashboardChartMonth', this.dataDashboardChartMonth);
    // const data = [
    //   { y: 'Jan', INC: 100, EXP: 50 },
    //   { y: 'Feb', INC: 80, EXP: 125 },
    //   { y: 'Mar', INC: 120, EXP: 75 },
    //   { y: 'Apr', INC: 220, EXP: 95 },
    //   { y: 'May', INC: 150, EXP: 30 },
    // ];
    const data = this.dataDashboardChartMonth;
    const datasetsLabels = ['INC', 'EXP'];

    this.chart = new Chart('canvasmonth', {
      type: 'bar',
      data: {
        labels: [...new Set(data.map((d) => d.y))],
        datasets: [
          {
            label: 'Income',
            data: data,
            parsing: {
              xAxisKey: 'INC',
            },
            datalabels: {
              display: false,
            },
            borderColor: '#080',
            backgroundColor: '#3D8',
          },
          {
            label: 'Expenses',
            data: data,
            parsing: {
              xAxisKey: 'EXP',
            },
            datalabels: {
              display: false,
            },
            borderColor: '#f00',
            backgroundColor: '#ff6f6f',
          },
        ],
      },
      options: {
        indexAxis: 'y',
        animation: {
          onComplete: function (animation) {
            const self: any = this;
            const ctx = animation.chart.ctx;
            // ctx.font = this.scale.font;
            // ctx.fillStyle = this.scale.textColor;
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'bottom';

            // console.log('animation', animation, self.data);

            self.data.datasets.forEach(function (dataset: any, i: number) {
              var meta = animation.chart.getDatasetMeta(i);
              meta.data.forEach(function (bar: any, index: number) {
                var data = dataset.data[index];
                // console.log('bar', datasetsLabels[i], data[datasetsLabels[i]]);
                ctx.fillText(data[datasetsLabels[i]], bar.x + 5, bar.y);
              });
            });

            // animation.datasets.forEach(function (dataset) {
            //   dataset.points.forEach(function (points) {
            //     ctx.fillText(points.value, points.x, points.y - 10);
            //   });
            // });
          },
        },
        // parsing: {
        //   xAxisKey: 'key',
        //   yAxisKey: 'value',
        // },
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        // scales: {
        //   y: {
        //     beginAtZero: true,
        //   },
        // },
      },
    });
  }

  getTotal(data: any[], prop: string) {
    return data.map((d) => d[prop]).reduce((acc, value) => acc + value, 0);
  }
}
