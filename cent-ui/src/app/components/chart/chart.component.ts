import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  chart: any = [];
  style: string = '';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() type: string = 'bar';

  constructor() {}

  ngOnInit() {
    this.style = [
      'position: relative',
      `width: ${this.width || 'auto'}`,
      `height: ${this.height || 'auto'}`,
    ].join('; ');
    console.log('style', this.style);

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
