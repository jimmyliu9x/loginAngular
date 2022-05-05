import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RdsService } from '../rds.service';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';


import { first } from 'rxjs/operators';

import { TokenStorageService } from '@app/_services/token-storage.service';
import { AuthService  } from '@app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSpinning = false;
  msg = '';
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];



  validateForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private rdsService: RdsService,
    private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService, private tokenStorage: TokenStorageService
  ) {

    this.validateForm = this.fb.group({
      userName: [''],
      password: [null],
    });
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      
      this.isSpinning = true;
            /*       console.log('submit', this.validateForm.value);
                  var formData: any = new FormData();
                  formData.append('username', this.validateForm.value['userName']);
                  formData.append('password', this.validateForm.value['password']);
                  this.http
                    .post('https://www.petct.com/demo/test', formData)
                    .subscribe({
                    // next: (response) => console.log(response),
                      error: (error) => console.log(error), 
                        next: (data:any) => {
                          console.log(data[0])
                        },
                        error: error => {
                            console.error('There was an error!', error.message);
                        }
                    });
            */


      const { username, password } = this.form;
      this.authService.login(this.validateForm.value['userName'], this.validateForm.value['password']).subscribe(
      data => {
        this.tokenStorage.saveToken(data.jwtToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.isSpinning = false;
        window.location.href = '/';
      },
      err => {
        this.errorMessage = err.error.detail;
        this.isLoginFailed = true;
        console.log(this.errorMessage);
        this.msg = this.errorMessage;
        this.isSpinning = false;
      }
    );

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
 
  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      window.location.href = '/';
    }


    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}