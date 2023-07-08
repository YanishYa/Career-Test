import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-checkbox',
  templateUrl: './star-checkbox.component.html',
  styleUrls: ['./star-checkbox.component.scss']
})
export class StarCheckboxComponent implements OnInit {

  public unselectedImage = '/assets/icons/test-button/inactive.png';
  public selectedImage = '/assets/icons/test-button/active.png';
  public coveredImage = '/assets/icons/test-button/hover.png';

  //public img = this.unselectedImage;

  @Input() value = false;
  @Output() change = new EventEmitter<boolean>();

  @Input() hover = false;
  @Output() hoverChange = new EventEmitter<boolean>();

  constructor() { }


  ngOnInit(): void {
  }

  public changeValue() {
    this.change.emit();
  }

  public changeHover(value: boolean) {
    this.hover = value;
    this.hoverChange.emit(this.hover);
  }

  public img() {
    if (this.hover) {
      return this.coveredImage;
    }else {
      if (this.value) {
        return this.selectedImage;
      }else {
        return this.unselectedImage;
      }
    }
  }

}
