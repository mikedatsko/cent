import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chart: any;
  incomeList: any[] = [];
  outcomeList: any[] = [];
  monthList: number[] = [];

  constructor() {
    this.monthList = [201806, 201807, 201808, 201809, 201810, 201811, 201812, 201901];
  }

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    console.log('getMonthList', this.getMonthList());
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.getMonthList(),
        datasets: [
          {
            label: 'Income',
            data: this.getChartData(this.incomeList),
            borderColor: '#009900',
            fill: false
          },
          {
            label: 'Outcome',
            data: this.getChartData(this.outcomeList),
            borderColor: '#ff0000',
            fill: false
          },
        ],
        backgroundColor: ['white']
      },
      options: {
        legend: {
          display: true,
          labels: {
            fontColor: '#666'
          }
        },
        scales: {
          xAxes: [{
            display: true,
            autoSkip: false
          }],
          yAxes: [{
            display: true
          }],
        },
        fill: 'white'
      }
    });
  }

  getSum(data) {
    if (!data.length) {
      return 0;
    }

    return data.reduce((a, b) => a + b.value, 0);
  }

  getChartData(data) {
    return this.monthList.map(month => {
      const valueList = data.filter(item => item.month === month);

      if (!valueList.length) {
        return null;
      }

      return valueList.reduce((a, b) => a + b.value, 0);
    });
  }

  getMonthList() {
    const valueList = [...this.incomeList, ...this.outcomeList].map(value => value.month);
    valueList.sort((a, b) => a - b);
    return valueList;
  }

  addValue(form) {
    const { name, type, value } = form.value;
    const created = new Date();

    this[`${type}List`].push({
      name: name,
      value: parseFloat(value),
      created: created.getTime() + created.getTimezoneOffset() * 1000,
      month: parseInt(`${created.getFullYear()}${('0' + (created.getMonth() + 1)).substr(-2)}`, 10)
    });

    form.reset({type: 'income'});
    this.drawChart();
    console.log(this.incomeList, this.outcomeList);
  }
}
