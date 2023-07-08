import { YoutubeModalComponent } from './../components/youtube-modal/youtube-modal.component';
import { Gender } from './../models/enums/gender.enum';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GreetModel } from '../models/greet.model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet-new.component.scss'],
})
export class GreetComponent implements OnInit {
  public numbers: number[] = [];

  public greetModel: GreetModel = {
    gender: Gender.Unknown,
    name: '',
    email: '',
  };

  public name = new FormControl('', [Validators.required]);
  public gender = new FormControl(Gender.Unknown, [Validators.required]);
  public email = new FormControl('', [Validators.required]);

  public canContinue = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let model = this.authService.user();
    if (model) {
      this.greetModel = {
        email: model.email,
        gender: model.gender,
        name: model.name,
      };
      this.name.setValue(model.name);
      this.gender.setValue(model.gender);
      this.email.setValue(model.email);
      this.canContinue = true;
    }
    //if (this.authService.isAuth()) this.router.navigateByUrl('/test');
    document.body.classList.add('no-of-x');
    this.numbers = Array(133)
      .fill(0)
      .map((x, i) => i);
  }

  start() {
    this.name.markAsTouched();
    this.gender.markAsTouched();
    this.email.markAsTouched();
    if (!this.email.value.includes('@') || !this.email.value.includes('.')) {
      return;
    }
    if (this.name.invalid) {
      return;
    }
    if (this.gender.value === Gender.Unknown) {
      this.gender.setErrors({ incorrect: true });
      return;
    }
    this.greetModel.name = this.name.value;
    this.greetModel.gender = this.gender.value;
    this.greetModel.email = this.email.value;

    this.authService.saveGreet(this.greetModel).subscribe((x) => {
      this.router.navigateByUrl('/test');
    });
  }

  continue() {
    this.router.navigateByUrl('/test');
  }
}
