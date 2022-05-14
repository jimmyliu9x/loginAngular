import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {

  authToken = '';

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  

  ngOnInit(): void {
    this.authToken = this.tokenStorageService.getToken();
  }

}
