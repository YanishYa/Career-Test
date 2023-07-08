import { AuthService } from 'src/app/services/auth.service';
import { AppendInfoModel } from './../../models/append-info.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-append-info',
  templateUrl: './append-info.component.html',
  styleUrls: ['./append-info.component.css'],
})
export class AppendInfoComponent implements OnInit {
  public model: AppendInfoModel = {
    age: null,
    city: null,
    class: null,
    fio: null,
    phone: null,
    school: null,
    userId: 0,
  };

  public error: string | null = '';
  public agree: boolean = false;

  constructor(
    private ref: MatDialogRef<AppendInfoComponent>,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    const user = this.authService.user();
    this.model.fio = user!.name;
    this.model.userId = user!.id;
  }

  public save() {
    const m = this.model;
    if (!this.agree) {
      this.error = 'Чтобы продолжить необходимо согласиться с обработкой персональных данных';
      return;
    }
    if (m.age && m.city && m.class && m.phone && m.fio && m.school) {
      this.authService.appendInfo(this.model).subscribe(x => {
        if (x) {
          const user = this.authService.user();
          user!.isProfileFilled = true;
          this.authService.saveLoginToLS(user!);

          this.ref.close(x);
        }
      })
    } else {
      this.error = 'Пожалуйста заполните все поля';
    }
  }
}
