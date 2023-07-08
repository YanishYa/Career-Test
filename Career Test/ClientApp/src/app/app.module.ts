import { AuthGuard } from './services/auth.guard';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './services/jwt.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TestResultComponent } from './test-result/test-result.component';
import { GreetComponent } from './greet/greet.component';
import { ProfCardComponent } from './prof-card/prof-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfoScreenComponent } from './info-screen/info-screen.component';
import { StarCheckboxComponent } from './components/star-checkbox/star-checkbox.component';
import { StarRangeComponent } from './components/star-range/star-range.component';
import { AppendInfoComponent } from './components/append-info/append-info.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { ChairButtonComponent } from './components/chair-button/chair-button.component';
import { CommonActionButtonComponent } from './components/common-action-button/common-action-button.component';
import { YoutubeModalComponent } from './components/youtube-modal/youtube-modal.component';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { TestCompleteComponent } from './test-complete/test-complete.component';
import { HelpModalComponent } from './components/help-modal/help-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    RegisterComponent,
    TestResultComponent,
    GreetComponent,
    ProfCardComponent,
    InfoScreenComponent,
    StarCheckboxComponent,
    StarRangeComponent,
    AppendInfoComponent,
    ActionButtonComponent,
    ChairButtonComponent,
    CommonActionButtonComponent,
    YoutubeModalComponent,
    HelpButtonComponent,
    TestCompleteComponent,
    HelpModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'test',
        component: HomeComponent,
        pathMatch: 'full',
      },
      { path: 'counter', component: CounterComponent },
      {
        path: 'fetch-data',
        component: FetchDataComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: null,
          roles: ['enrollee'],
        },
      },
      {
        path: 'result',
        component: TestResultComponent,
        pathMatch: 'full',
      },
      {
        path: 'complete',
        component: TestCompleteComponent,
        pathMatch: 'full',
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: GreetComponent },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [MaterialModule],
})
export class AppModule {}
