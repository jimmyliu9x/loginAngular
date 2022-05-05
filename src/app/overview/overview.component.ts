import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})



export class OverviewComponent implements OnInit {
  
  isSpinning = true;

  /* random int numbers */
 
  getRandomNumInt(min: number, max: number){
    var Range = max - min;
    var Rand  = Math.random();
    return (min + Math.round(Rand * Range));
  }
  
  

  /* intial random data for charts */
  getRandomArr(num:number): number[]{
    var array:number[] = new Array;
    var i: number;
    for (i=0;i<num;i++){
      array[i] = i;
    }
    array.sort(
      function(){
        return 0.5 - Math.random();
      }
    );
    return array;
  }

  /* line chart option */
  lineOption:EChartsOption = {

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
        {
            type : 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }
    ],
    yAxis: [
        {
            type : 'value'
        }
    ],
    series: [
      {
        type: 'line',
        data:this.getRandomArr(7),
        areaStyle:{}
        }
      ]
  };

  /* pie chart option */
  pieOption: EChartsOption = {
    title: {
      text: 'Sample Pie Chart'
    },
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
  };


  chartLineOption: any;
  echartsLineInstance: any;

  chartPieOption: any;
  echartsPieInstance: any;

  onChartLineInit(ec:any) {
    this.echartsLineInstance = ec;
  }
  
  onChartPieInit(ec:any) {
    this.echartsPieInstance = ec;
  }

/* Reload data and refresh charts. 
This function for reload button.
 */
  a:number = 0;
  b:number = 0;
  c:number = 0;

  refreshCharts(){
    
    this.isSpinning = true;
    //this.createBasicMessage(); //dislay a waiting msg.

    this.a = this.getRandomNumInt(1000000,9000000);
    this.b = this.getRandomNumInt(100000,900000);
    this.c = this.getRandomNumInt(10000,90000);

    /** config charts  */
    const itemLine = [];
    itemLine.push({
      type: 'bar',
      smooth: 0.3,
      data: this.getRandomArr(7),
      areaStyle:{},
      itemStyle: {
        barBorderRadius: 20
      }
    });
    this.chartLineOption = this.lineOption;
    this.chartLineOption.series = itemLine;
    if (this.echartsLineInstance) {
      //this.echartsLineInstance.clear();
      this.echartsLineInstance.setOption(this.chartLineOption, true);
    }

    const itemPie = [];
    itemPie.push({
      type: 'pie',
      radius: ['50%', '70%'],
      label:{show:false},
      data: this.getRandomArr(7)
    });
    this.chartPieOption = this.pieOption;
    this.chartPieOption.series = itemPie;
    if (this.echartsPieInstance) {
      //this.echartsLineInstance.clear();
      this.echartsPieInstance.setOption(this.chartPieOption, true);
    }
    
    setTimeout(() => {
      this.isSpinning = false;
    }, 500);
    
  }


  ngOnInit(): void {
    this.refreshCharts();
    
  }

  ngAfterViewInit(){
    
    
  }

}
