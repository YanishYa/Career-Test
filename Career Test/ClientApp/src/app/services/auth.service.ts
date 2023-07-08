import { QuestionsService } from './questions.service';
import { AppendInfoModel } from './../models/append-info.model';
import { LoginModel } from './../models/login.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response.model';
import { GreetModel } from '../models/greet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'user';
  private readonly GREET_KEY = 'greet-user';
  private _user: LoginResponse | null = null;

  constructor(private http: HttpClient, private router: Router, private question: QuestionsService) {}

  public login(model: LoginModel) {
    return this.http
      .post<LoginResponse>('/api/authentication/login', model)
      .pipe(
        tap(async (response) => {
          this.saveLoginToLS(response);
        })
      );
  }

  // public register(model: any) {
  //   return this.http
  //     .post<LoginResponse>('/api/authentication/register', model)
  //     .pipe(
  //       tap(async (response) => {
  //         this.saveLoginToLS(response);
  //       })
  //     );
  // }

  public getToken() {
    const user: LoginResponse | null = this.user();

    if (user) {
      return user.token;
    } else {
      return null;
    }
  }

  public user(): LoginResponse | null {
    if (this._user) {
      return this._user;
    }

    this._user = JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? 'null');

    return this._user;
  }

  public getRoles(): string[] | null {
    const user: LoginResponse | null = this.user();

    if (user) {
      return user.roles.split('|');
    } else {
      return null;
    }
  }

  public isAuth() {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  // public logout() {
  //   this._user = null;
  //   localStorage.removeItem(this.STORAGE_KEY);
  //   this.router.navigateByUrl('/');
  // }

  public saveGreet(model: GreetModel) {
    return this.login({
      email: model.email,
      gender: model.gender,
      name: model.name,
    });
  }

  public loadGreet(): GreetModel {
    return JSON.parse(localStorage.getItem(this.GREET_KEY) || (null as any));
  }

  public logout() {
    this._user = null;
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigateByUrl('/');
  }

  public appendInfo(model: AppendInfoModel): Observable<boolean> {
    return this.http.patch<boolean>('/api/authentication', model)
  }

  public saveLoginToLS(model: LoginResponse) {
    if (model) {
      const user = this.user();
      if (!user || user.email !== model.email) {
        this.question.cleanResults();
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(model));
    }
  }
}
