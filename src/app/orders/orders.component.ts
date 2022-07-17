import { Component,Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderService  } from '@app/_services/order.service';
import { number } from 'echarts';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {

  loading = false; //loading indicator animation
  
  constructor(
    private orderService: OrderService
  ) { }
    
  unshippedOrders: any = [];
  filterMailServices: any = [];
  filterStore: any = [];

  mailService: string;
  storeId: number;
  orderId: number;
  pendingLabel:number;
  labelFile: any = [];
  

  ngOnInit(): void {
    
    // get dropdown list for filters
    this.orderService.getDropdownMenu().subscribe(
      data => { 
        this.filterMailServices = data['ddlMailServices'];
        this.filterStore = data['ddlStore'];
       
        /* Rename key name for filters */
        this.filterStore.forEach((obj) => {
            for (const k in obj) {
                if (k === "storeName") {
                    obj["text"] = obj[k];
                    delete obj[k]
                }
                if (k === "id") {
                  obj["value"] = obj[k];
                  delete obj[k]
              }
            }
        })
        
        this.filterMailServices.forEach((obj) => {
            for (const j in obj) {
                obj["text"] = obj[j];
                obj["value"] = obj[j];
                delete obj[j];
            }
        })

      },
      error => {
        
      }
    );

    
    this.filterUnshippedOrders();
  }

  /* action when filter changed in table header */
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);

    params.filter.forEach((obj) => {
       if(obj['key']==="mailService"){
         this.mailService = obj['value'];
       }
       if(obj['key']==="storeId"){
        this.storeId = obj['value'];
      }
    })
    this.filterUnshippedOrders();

  }

  filterUnshippedOrders(){
    this.loading = true;

    let jsonObject = {};  

    jsonObject['top'] = '50';
    if(this.storeId && this.storeId !== 0){jsonObject['storeId'] = this.storeId;}
    if(this.mailService && this.mailService !== 'ALL'){jsonObject['mailService'] = this.mailService;}
    if(this.orderId){jsonObject['orderId'] = this.orderId;}

    this.orderService.getUnShippedOrders(JSON.stringify(jsonObject)).subscribe(
      data => { 
        this.loading = false;
        this.unshippedOrders = data['unShipped'];
        this.pendingLabel = data['numberOfPendingLabel'];
      },
      error => {
        
      }
    );
  }
}
