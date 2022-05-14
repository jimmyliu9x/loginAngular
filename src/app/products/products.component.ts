import { Component,Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RdsService } from '../rds.service';

import { NzTableQueryParams } from 'ng-zorro-antd/table';


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

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.rdsService.url = "https://flsoftdemo-apiv2.azurewebsites.net/dashboard";
    this.loading = true;
    this.rdsService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading = false;
      this.total = 50; // mock the total data here
      this.listOfRandomUser = data['amazonSales'];
      console.log(data);
    });
  }

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
