import { TestResult } from './../models/test-result.model';
import { Question, QuestionPagination } from './../models/question.model';
import { QuestionsService } from './../services/questions.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data!: QuestionPagination;

  public progressBarValue = 0;

  public dataSent = false;

  public headerOffset = '-60px';

  public requiredOptions = 1;
  public selected = 0;

  public message = '';

  public refreshTest = false;
  public moveToRegister = false;

  public isLoading = true;

  constructor(
    private questionService: QuestionsService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (!this.authService.user()!.gender) {
      this.authService.logout();
    }
    this.questionService.loadQuestions(5).subscribe((x) => {
      this.data = x;
      this.requiredOptions = this.data.options.length;

      const saved = this.questionService.getResultFromLS();

      if (saved) {
        this.data.options.forEach(element => {
          const a = saved.results.map(x => x.options).reduce((x, y) => x.concat(y)).find(x => x.id == element.id)
          element.value = a?.value || 0;
        });
        this.checkSelected()
      }


      this.isLoading = false;
    });
    document.body.classList.add('mainbackground');
  }

  checkSelected() {
    this.selected = this.data.options.filter((x) => x.value).length;
    this.progressBarValue = Math.round((100 / this.requiredOptions) * this.selected);
    if (this.data) {
      if (
        this.data.options.filter((x) => x.value).length >= this.requiredOptions
      ) {
        for (let o of this.data.options.filter((x) => !x.value)) {
          o.disabled = true;
        }
      } else {
        for (let o of this.data.options.filter((x) => !x.value)) {
          o.disabled = false;
        }
      }
    }
  }

  public checkCurrent() {
    let items = this.data.getPage();
    return items.map(x => x.value > 0).reduce((x, y) => x && y);
  }

  sendResult() {
    console.log(this.data.options);
    this.questionService.loadResults().subscribe((x) => {
      let a = new TestResult(this.data, x);
      this.questionService.saveResultToLS(a);
      if (a.valid) {
        if (this.authService.user()) {
          this.router.navigateByUrl('/result');
        }

        this.message =
          'Для того чтобы узнать результаты, необходимо зарегистрироваться';
        this.moveToRegister = true;
      } else {
        this.message =
          'Дорогой путник, в тебе одновременно живут много различных интересов. Предлагаем тебе более вдумчиво сделать твой выбор.';
        this.refreshTest = true;
      }

      this.dataSent = true;
    });
    //
    //this.dataSent = true;
  }

  getFontSize(text: string) {
    if (text.length > 200) return '24px';
    if (text.length > 150) return '24px';
    return '24px';
  }

}
