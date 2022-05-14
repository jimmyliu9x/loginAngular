import { Component,Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RdsService } from '../rds.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {

  constructor(
    private rdsService: RdsService
  ) { }
  
    
  unshippedOrders: any = [];
  loading = true;

  ngOnInit(): void {
    

    this.rdsService.url = 'https://flsoftdemo-apiv2.azurewebsites.net/unshippedOrders';
    this.rdsService.post('20','1').subscribe(data => {
      console.log(data['order_GetUnShipped']);
      this.unshippedOrders = data['order_GetUnShipped'];
      this.loading = false;
    });
  }

}
