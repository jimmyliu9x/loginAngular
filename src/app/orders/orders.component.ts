import { Component,Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderService  } from '@app/_services/order.service';
import { number } from 'echarts';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {

  loading = false;
  
  constructor(
    private orderService: OrderService
  ) { }
    
  unshippedOrders: any = [];
  ddlMailServices: any = [];
  ddlStore: any = [];
  
  mailService: string;
  storeId: number;
  orderId: number;
  pendingLabel:number;
  labelFile: any = [];
  
  public filters: Array<any>  = [
    { mailService: String , storeId: String }
  ];
   

  ngOnInit(): void {
    

  /*     edit by caonan at 2022-07-07 
    
    this.rdsService.url = 'https://flsoftdemo-apiv3.azurewebsites.net/unshippedOrders';
    this.rdsService.post('20','1').subscribe(data => {
      console.log(data['order_GetUnShipped']);
      this.unshippedOrders = data['order_GetUnShipped'];
    });

    this.rdsService.url = 'https://flsoftdemo-apiv3.azurewebsites.net/labelreport';
    this.rdsService.post('20','1').subscribe(data => {
      this.labelFile = data['singleItem'];
      this.loading = false;
    }); 
    */
    // dropdown list
    this.orderService.getDropdownMenu().subscribe(
      data => { 
        this.ddlMailServices = data['ddlMailServices'];
        this.ddlStore = data['ddlStore'];
        console.log(data);
      },
      error => {
        
      }
    );
    
    // unshippedOrders list
    /* this.orderService.getUnShippedOrders(this.filters).subscribe(
      data => { 
        this.loading = false;
        this.unshippedOrders = data['unShipped'];
        console.log(this.unshippedOrders);
      },
      error => {
        
      }
    ); */

    
    this.filterUnshippedOrders();
  }

  filterUnshippedOrders(){
    this.loading = true;

    let jsonObject = {};  

    
    if(this.storeId && this.storeId !== 0){jsonObject['storeId'] = this.storeId;}
    if(this.mailService && this.mailService !== 'ALL'){jsonObject['mailService'] = this.mailService;}
    if(this.orderId){jsonObject['orderId'] = this.orderId;}
    

    this.orderService.getUnShippedOrders(JSON.stringify(jsonObject)).subscribe(
      data => { 
        this.loading = false;
        this.unshippedOrders = data['unShipped'];
        this.pendingLabel = data['numberOfPendingLabel'];
        console.log(this.unshippedOrders);
      },
      error => {
        
      }
    );
  }
}
