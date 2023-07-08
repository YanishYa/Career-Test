import { Answer } from './../models/answer.model';
import { QuestionPagination } from './../models/question.model';
import { AppendInfoComponent } from './../components/append-info/append-info.component';
import { Gender } from './../models/enums/gender.enum';
import { QuestionsService } from './../services/questions.service';
import { delay } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { Question } from '../models/question.model';
import { AuthService } from '../services/auth.service';
import { TestResult, Chair } from '../models/test-result.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
})
export class TestResultComponent implements OnInit {
  data!: TestResult;

  public resultLink = '';
  public resultName = '';

  public step: number = 1;

  public gender: Gender = Gender.Unknown;

  public selectedChair: Chair | undefined;

  public doorHighlighted = false;

  public images: string[] = [];
  public loadedImages = 0;

  constructor(
    private questionsService: QuestionsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.data = this.questionsService.getResultFromLS();
    this.gender = authService.user()!.gender;

    this.selectedChair = this.data.mainResults[0].result.chairs[0];

    this.images = [
      '/assets/results/doors/highlighted/' +
        this.data.mainResults[0].result.linkToImage +
        '.png',
      '/assets/results/doors/' +
        this.data.mainResults[0].result.linkToImage +
        '.png',
    ];
  }

  ngOnInit(): void {
    document.body.classList.add('mainbackground');

    let gender = this.gender;

    if (gender == Gender.Unknown) {
      gender = Gender.Male;
    }

    this.resultLink =
      '/assets/results/' +
      +gender +
      '/' +
      this.data.results[0].result.linkToImage;
    this.resultName = this.data.results[0].result.name;
  }

  public getPowers() {
    let cur = 'Ваши способности: ';
    this.data.results.forEach((element) => {
      cur += element.result.power + `(${element.count}), `;
    });
    // cur += '<br/>Гильдии: ';
    // this.data.results.forEach((element) => {
    //   cur += element.result.name + `(${element.count}) `;
    // });
    return cur.slice(0, -2);
  }

  public secondStep() {
    let data: QuestionPagination;
    this.questionsService.loadQuestions(5).subscribe((x) => {
      data = x;

      const saved = this.questionsService.getResultFromLS();

      if (saved) {
        data.options.forEach((element) => {
          const a = saved.results
            .map((x) => x.options)
            .reduce((x, y) => x.concat(y))
            .find((x) => x.id == element.id);
          element.value = a?.value || 0;
        });

        let d: Answer[] = data.options.map((x) => {
          return {
            questionId: x.id,
            answer: x.value,
          };
        });

        this.questionsService.saveAnswers(d).subscribe((x) => {
          const user = this.authService.user();
          if (user?.isProfileFilled) {
            this.openSecondStep();
          } else {
            const dialog = this.dialog.open(AppendInfoComponent);

            dialog.afterClosed().subscribe((x) => {
              if (x) {
                this.openSecondStep();
              }
            });
          }
        });
      }
    });
  }

  public openSecondStep() {
    this.router.navigateByUrl('/complete');
  }

  public selectChair(chair: Chair) {
    console.log(chair);
    this.selectedChair = chair;
  }

  public moveToMainSite() {
    window.open(this.selectedChair?.link || '', '_blank');
  }

  public restart() {
    this.questionsService.cleanResults();
    this.router.navigateByUrl('/test');
  }

  public getFontSize(text: string) {
    if (!text) return '28px';
    if (text.length > 1200) return '20px';
    if (text.length > 800) return '24px';

    return '28px';
  }

  public doorChangeHighlight(to: boolean) {
    this.doorHighlighted = to;
  }

  public loadImages() {
    for (let i = 0; i < this.images.length; i++) {
      let img = new Image();
      // img.onload = () => {
      //   //this.loaded();
      // };
      img.src = this.images[i];
    }
  }

  infoType = 0;

  public changeDisplayInfo() {}

  // loaded() {
  //   this.loadedImages++;
  //   if (this.images.length == this.loadedImages) {
  //     //all images loaded
  //   }
  // }
}
