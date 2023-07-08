import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppendInfoComponent } from '../components/append-info/append-info.component';
import { Gender } from '../models/enums/gender.enum';
import { Chair, TestResult } from '../models/test-result.model';
import { AuthService } from '../services/auth.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.scss']
})
export class TestCompleteComponent implements OnInit {
  data!: TestResult;

  public resultLink = '';
  public resultName = '';

  public step: number = 2;

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
    console.log(this.data);

    this.textWithBreaks(this.selectedChair.description);
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
  }

  public openSecondStep() {
    this.step = 2;
  }

  public selectChair(chair: Chair, el: HTMLElement) {
    console.log(el);
    el.scrollTo({
      top: 0
    });
    console.log(chair);
    this.selectedChair = chair;
  }

  public moveToMainSite() {
    window.open(this.selectedChair?.link || '', '_blank');
  }

  public restart() {
    this.questionsService.cleanResults();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  public getFontSize(text: string) {
    return '28px';
    if (!text) return '28px';
    if (text.length > 1200) return '20px';
    if (text.length > 800) return '24px';

    return '28px';
  }

  public doorChangeHighlight(to: boolean) {
    this.doorHighlighted = to;
  }

  public textWithBreaks(s: string) {
    const a = s.split('<br\\>');
    console.log(a);
    return a;
  }

  infoType = 0;

  public changeDisplayInfo() {

  }

  // loaded() {
  //   this.loadedImages++;
  //   if (this.images.length == this.loadedImages) {
  //     //all images loaded
  //   }
  // }
}
