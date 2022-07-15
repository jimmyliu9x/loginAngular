import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

import { HttpClient, HttpParams } from '@angular/common/http';
import { RdsService } from '../rds.service';
import {overviewService} from '../_services/overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})



export class OverviewComponent implements OnInit {
  
  isSpinning = true;

  constructor(
    private http: HttpClient,
    private overviewService: overviewService
  ) { }

  amazonData = [];
  salesData:any = [0,0,0,0,0];

  chartAmount = [];
  chartCost = [];
  chartProfit = [];
  chartOrders = [];
  chartReturn = [];
  chartDate = [];


  
  /* line chart option */
  lineOption:EChartsOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: "30",
      right:"30",
      bottom:"0"
    },
    /* legend: {
      data: ['revenue']
    }, */
    xAxis: [
        {
            type : 'category',
            axisTick: {
              show: false
            },
            show: false,
            boundaryGap: false
        }
    ],
    yAxis: [
        {
            type : 'value',
            show:false,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            boundaryGap: false
        }
    ],
    series: [
      {
        name: 'line',
        type: 'line'
        }
      ]
  };

  /* orders chart option */
  ordersEchartsOption: EChartsOption = {
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {show:false,boundaryGap: false},
    grid: {
      left: "0",
      right:"0",
      bottom:"0"
    }
  }; 
  ordersEchartsInstance: any;
  onOrdersChartInit(ec:any) {
    this.ordersEchartsInstance = ec;
  }

  /* line chart option */
  chartLineOption: any;
  echartsLineInstance: any;

  onChartLineInit(ec:any) {
    this.echartsLineInstance = ec;
    this.ordersEchartsInstance = ec;
  }

  refreshCharts(){
    
    this.isSpinning = true;

    /** config charts  */
    const itemLine = [];
    itemLine.push({
      type: 'line',
      name:'revenue',
      tooltip: {
        trigger: 'axis'

      },
        axisPointer:{
          type:'line'
        },
      smooth: 0.5,
      data: this.chartAmount,
      itemStyle:{
        color:'rgb(0, 194, 146)'
      }
     // symbol: "circle", //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      /* areaStyle:{
        color: 'rgb(3,201,215)',
        opacity: 0.2
      }, */
    } ,
     {
      type: 'bar',
      name:'cost',
      //stack:'one',
      tooltip: {
        trigger: 'axis'
      },
      smooth: 0.5,
      data: this.chartCost,
      symbol: "none",
      itemStyle:{
        color: 'rgb(251,150,120)',
        barBorderRadius: 2,
      }
    },
    {
      type: 'bar',
      name:'profit',
      //stack:'one',
      tooltip: {
        trigger: 'axis'
      },
      smooth: 0.5,
      data: this.chartProfit,
      symbol: "none",
      itemStyle:{
        color: 'rgb(3,201,215)',
        barBorderRadius: 2,
      }
    }
    );

    //xAxis
    const itemX = [];
    itemX.push(
      {
        type : 'category',
        boundaryGap: false,
        data: this.chartDate
      }
    );

    this.chartLineOption = this.lineOption;
    this.chartLineOption.series = itemLine;
    this.chartLineOption.xAxis = itemX;
    
    const ordersSeries = [];
    const ordersXaxis = [];
    ordersSeries.push({
      type: 'line',
      name:'orders',
      barGap: '20%',
      itemStyle: {
        color: 'rgb(3,201,215)',
      },
      areaStyle:{
        color: 'rgb(3,201,215)',
        opacity: 0.1
      },
      symbol: "none",
      data: this.chartOrders
    });
    ordersXaxis.push({
      type : 'category',
      show: false,
      boundaryGap: false,
      data: this.chartDate
    });
    this.ordersEchartsOption.series = ordersSeries;
    this.ordersEchartsOption.xAxis = ordersXaxis;

    /*******************************/
    
    this.overviewService.getDashboard('20','1').subscribe(
      data => {
        this.amazonData = data;
        this.salesData = [];
        this.salesData.push(this.amazonData[0]['SalesTotal']);
        this.salesData.push(this.amazonData[0]['ItemCostTotal']);
        this.salesData.push(this.amazonData[0]['GrossProfit']);
        this.salesData.push(this.amazonData[0]['OrderCount']);
        this.salesData.push(this.amazonData[0]['QtyCustomerReturn']);
  
        this.amazonData.forEach((value,index,array) => {
            this.chartAmount.push(array[index].salesTotal);
            this.chartCost.push(array[index].ItemCostTotal);
            this.chartProfit.push(value['GrossProfit']);
            this.chartOrders.push(value['OrderCount']);
            this.chartReturn.push(value['QtyCustomerReturn']);
            this.chartDate.push(array[index]._date);
          }
        );
        console.log(this.chartAmount);
        setTimeout(() => {
          this.isSpinning = false;
        }, 500);
        this.chartAmount = [];
        this.chartDate = [];
        this.chartCost = [];
      },
      error => {
        
        console.log(error);
      }
    );
    
    
    /*******************************/

    
  }

 

  ngOnInit(): void {
    this.refreshCharts();
    //this.getAmazonData();
  }



}
