import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Gender } from '../models/enums/gender.enum';
import { interval, of } from 'rxjs';
import { timeout, delay } from 'rxjs/operators';

@Component({
  selector: 'app-prof-card',
  templateUrl: './prof-card.component.html',
  styleUrls: ['./prof-card.component.scss'],
})
export class ProfCardComponent implements OnInit {
  @ViewChild('card')
  private card: ElementRef | undefined;
  @ViewChild('cardItem')
  private cardItem: ElementRef | undefined;

  @Input() img: string = '';

  public lastActive: Date = new Date();
  public activeTimeout: number = 3;

  public xUp = 30;
  public xDown = -30;
  public xState = 30;

  public yUp = -30;
  public yDown = 30;
  public yState = -30;

  public deg = 0;

  // public wN = 0.45;
  // public width = '0.45wv';

  // public hN = 0.7;
  // public height = '0.7wv';

  public ready = false;

  constructor() {}

  ngOnInit(): void {
    // let w = this.wN;
    // let h = this.hN;
    // let pause = 30;
    // for (let i = 0; i <= 100; i++) {
    //   of([1, 2, 3])
    //     .pipe(delay(i * pause))
    //     .subscribe((x) => {
    //       this.wN += w;
    //       this.hN += h;
    //       this.width = w + 'wv';
    //       this.height = h + 'wv';
    //       console.log(123);
    //     });
    // }
    // of([1, 2, 3])
    //   .pipe(delay(pause * 40))
    //   .subscribe((x) => {
    //     this.startRotate();
    //     this.ready = true;
    //   });
    this.startRotate();
    this.ready = true;
  }

  startRotate() {
    interval(50).subscribe((x) => {
      this.deg += 5;

      let rad = (this.deg * Math.PI) / 180;

      this.xState = 30 * Math.sin(rad);
      this.yState = -30 * Math.cos(rad);

      let cardItem = this.cardItem!.nativeElement;

      //console.log(cardItem);

      if (
        this.lastActive.getTime() + this.activeTimeout * 100 <
        new Date().getTime()
      ) {
        // this.xState = this.randomIntFromInterval(this.xUp, this.xDown);
        // this.yState = this.randomIntFromInterval(this.yUp, this.yDown);

        cardItem.style.transform =
          'rotateX(' + this.xState + 'deg) rotateY(' + this.yState + 'deg)';

        cardItem.style.transition = 'transform 1s';
      }
    });
  }

  rotate(e: MouseEvent, cardItem: HTMLDivElement) {
    cardItem.style.transition = 'transform 0.2s';
    const halfHeight = cardItem.offsetHeight / 2;

    cardItem.style.transform =
      'rotateX(' +
      -(e.offsetY - halfHeight) / 7 +
      'deg) rotateY(' +
      (e.offsetX - halfHeight) / 7 +
      'deg)';

    this.lastActive = new Date();
  }

  stopRotate(cardItem: HTMLDivElement) {
    cardItem.style.transform = 'rotate(0)';
  }

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
