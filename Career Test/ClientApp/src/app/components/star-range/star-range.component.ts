import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-range',
  templateUrl: './star-range.component.html',
  styleUrls: ['./star-range.component.scss'],
})
export class StarRangeComponent implements OnInit {
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  public values: CheckBoxStar[] = [];

  constructor() {
    Array.from({ length: 5 }, (_, i) => i).forEach((element) => {
      this.values.push({ num: element, value: false, hover: false });
    });
  }

  ngOnInit(): void {
    this.setStars(this.value);
  }

  public changeValue(val: boolean, num: number) {
    this.setStars(num+1);
    this.valueChange.emit(num+1);
  }

  public changeHover(val: boolean, num: number) {
    for (let index = 0; index <= num; index++) {
      this.values[index].hover = val;

    }
  }

  private setStars(num: number) {
    for (let index = 0; index < 5; index++) {
      this.values[index].value = false;
    }

    for (let index = 0; index < num; index++) {
      this.values[index].value = true;
    }
  }
}

interface CheckBoxStar {
  value: boolean;
  num: number;
  hover: boolean;
}
