import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RdsService } from '../rds.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})



export class OverviewComponent implements OnInit {
  
  isSpinning = true;

  constructor(
    private http: HttpClient,
    private rdsService: RdsService
  ) { }

  amazonData = [];
  salesData:any = [0,0,0,0];

  chartAmount = [];
  chartDate = [];


  
  /* line chart option */
  lineOption:EChartsOption = {


    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: "0",
      right:"0",
      bottom:"0"
    },
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

  /* pie chart option */
  /* pieOption: EChartsOption = {

    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }; */


  chartLineOption: any;
  echartsLineInstance: any;

  onChartLineInit(ec:any) {
    this.echartsLineInstance = ec;
  }


/*   abcIn($event:any){
    //console.log($event);
    $event.target.classList.remove("animate__fadeInDown");
    $event.target.classList.add("animate__bounce");
  }
  abcOut($event:any){
   // console.log($event);
    $event.target.classList.remove("animate__bounce");
  }
 */
  refreshCharts(){
    
    this.isSpinning = true;

    /** config charts  */
    const itemLine = [];
    itemLine.push({
      type: 'line',
      tooltip: {
        trigger: 'axis',
        axisPointer:{
          type:'line'
        }

      },
      smooth: 0.6,
      data: this.chartAmount,
      //symbol: "none",
      areaStyle:{
        //color: 'rgb(3,201,215)',
        opacity: 0.2
      },
      lineStyle:{
        //color: 'rgb(3,201,215)'
      }
    });

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


    /*******************************/
    this.rdsService.url = 'https://flsoftdemo-apiv2.azurewebsites.net/dashboard';
    this.rdsService.post('20','1').subscribe(data => {
    
      this.amazonData = data['amazonSales'][0];
      this.salesData = [];
      this.salesData.push(this.amazonData[0]['amount']);
      this.salesData.push(this.amazonData[0]['ItemCostTotal']);
      this.salesData.push(this.amazonData[0]['profitTotal']);
      this.salesData.push(this.amazonData[0]['NumOfOrders']);

      this.amazonData.forEach((value,index,array) => {
        this.chartAmount.push(value['amount']);
        this.chartDate.push(value['reportDate']);
        }
    
      );

      if (this.echartsLineInstance) {
        //this.echartsLineInstance.clear();
        this.echartsLineInstance.setOption(this.chartLineOption, true);
      }
    
        
      setTimeout(() => {
        this.isSpinning = false;
      }, 500);
      this.chartAmount = [];
      this.chartDate = [];

    });
    /*******************************/

    
  }

 

  ngOnInit(): void {
    this.refreshCharts();
    //this.getAmazonData();
  }



}
