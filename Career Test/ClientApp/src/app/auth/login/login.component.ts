import { AuthService } from './../../services/auth.service';
import { LoginModel } from './../../models/login.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // public error: string = '';

  // public model: LoginModel = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('authbackground');
  }

  // submit() {
  //   this.authService.login({ model: this.model }).subscribe((x) => {
  //     if (x) {
  //       this.router.navigateByUrl('/');
  //     } else {
  //       this.error = "Данные не верны или такого аккаунта не существует";
  //     }
  //   }, error => {
  //     this.error = "Данные не верны или такого аккаунта не существует";
  //   });
  // }

}
