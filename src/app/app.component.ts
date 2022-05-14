import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { TokenStorageService } from './_services/token-storage.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  isCollapsed = false;
  routerPath:string="";
  currentPath = '';
  

  constructor(
    private route:Router,
    private planform: PlatformLocation,
    private tokenStorageService: TokenStorageService,
    private modal: NzModalService
  ){
    
  }
  
    
  ngOnInit(): void{
    //console.log('working location:',this.planform.pathname.substring(1));

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
/*       this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR'); */
      this.username = user.username;
     
    }else{
      
      if(this.planform.pathname.substring(1) !== 'login'){
        window.location.href = '/login';
      }
    }

     this.route.events.subscribe((data)=>{

       if(data instanceof NavigationEnd){
         this.routerPath=data.url.substring(1);
         
         //console.log("working path:",this.routerPath);
         this.currentPath = this.routerPath;
       }
    }) 

   

 }
 logout(): void {
  this.tokenStorageService.signOut();
  window.location.href = '/login';
}

showConfirm(): void {
  this.modal.confirm({
    nzTitle: 'Do you want to logout?',
    nzOnOk: () => this.logout()
  });
}

}
