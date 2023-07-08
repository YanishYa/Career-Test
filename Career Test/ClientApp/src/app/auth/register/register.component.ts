import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/models/enums/gender.enum';
import { RegisterModel } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public error: string = '';

  public agree: boolean = false;

  public model: RegisterModel = {
    email: '',
    password: '',
    age: null,
    city: '',
    class: '',
    fio: '',
    gender: Gender.Unknown,
    phone: '',
    school: '',
  };

  public rePassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('authbackground2');
  }

  submit() {
    if (!this.agree) {
      this.error = 'Чтобы продолжить необходимо согласиться с обработкой персональных данных';
      return;
    }
    if (this.model.password != this.rePassword) {
      this.error = 'Пароли не совпадают';
      return;
    }
    // this.authService.register(this.model).subscribe(
    //   (x) => {
    //     if (x) {
    //       this.router.navigateByUrl('/result');
    //     } else {
    //       this.error = 'Данные не верны или такого аккаунта не существует';
    //     }
    //   },
    //   (error) => {
    //     this.error = 'Данные не верны или такого аккаунта не существует';
    //   }
    // );
  }
}
