import { Component,Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RdsService } from '../rds.service';

import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})



export class ProductsComponent implements OnInit {

  
  constructor(
    private rdsService: RdsService
  ) { }
  
   

  total = 1;
  listOfRandomUser: any = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  recordDetails = '';
  chartDate = [];
  chartQty = [];
  chartAmount = [];
  chartOrders = [];


  chartLineOption: any;
  echartsInstance: any;
  onChartPieInit(ec:any) {
    this.echartsInstance = ec;
    this.echartsInstance.showLoading();
  }


  
  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.rdsService.url = "https://flsoftdemo-apiv2.azurewebsites.net/dashboard";
    this.loading = true;
    //

    this.rdsService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading = false;
      this.total = 50; // mock the total data here
      this.listOfRandomUser = data['amazonSales'];
      console.log(this.listOfRandomUser[0]);

      this.listOfRandomUser[0].forEach((value,index,array) => {
        
        this.chartDate.push(value['reportDate']);
        this.chartQty.push(value['qty']);
        this.chartAmount.push(value['amount']);
        this.chartOrders.push(value['NumOfOrders']);
       }
    
      );
      /********************************* */
        const itemLine = [];
        itemLine.push(
          {
            name: 'Qty',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value: number) {
                return value + '';
              }
            },
            data: this.chartQty
          },
          {
            name: 'Amount',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value: number) {
                return value + '';
              }
            },
            data: this.chartAmount
          },
          {
          name: 'Orders',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + '';
            }
          },
          data: this.chartOrders
        });

        //xAxis
        const itemX = [];
        itemX.push(
          {
            type : 'category',
            axisPointer: {
              type: 'shadow'
            },
            data: this.chartDate
          }
        );


        this.chartLineOption = this.chartOption;
        this.chartLineOption.series = itemLine;
        this.chartLineOption.xAxis = itemX;

        if (this.echartsInstance) {
          //this.echartsLineInstance.clear();
          //this.echartsInstance.hideLoading();
          this.echartsInstance.setOption(this.chartLineOption, true);
          this.echartsInstance.hideLoading();
        }
        /********************************* */

    });
  }


  

  /* chart option */
  chartOption:EChartsOption = {

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      left: "50",
      right:"20"
    },
    legend: {
      data: ['Qty','Amount','Orders'],
      left:'right'
    },
    xAxis: [
      {
        type : 'category',
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      
      {
        type: 'value',
        name: 'Qty',
        show:true,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            dashOffset: 2,
            width: 1
          }
        }
      },
      {
        type: 'value',
        name: 'Amount',
        show:false,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            dashOffset: 2,
            width: 1
          }
        }
      },
      
    ],
    series: [
      {
        name: 'Qty',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' ml';
          }
        }
      },
      {
        name: 'Amount',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' ml';
          }
        }
      },
      {
        name: 'Orders',
        type: 'line',
        smooth: true,
        tooltip: {
          valueFormatter: function (value: number) {
            return value + '';
          }
        }
      }
      ]
  };


  showDetails(details: any) {
    this.recordDetails = details;
    this.showModal();
    console.log(this.recordDetails);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  ngOnInit(): void {


  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
