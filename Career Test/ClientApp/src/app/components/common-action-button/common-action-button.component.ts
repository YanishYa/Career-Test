import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-common-action-button',
  templateUrl: './common-action-button.component.html',
  styleUrls: ['./common-action-button.component.css']
})
export class CommonActionButtonComponent implements OnInit {
  @Input() public  text = 'Click me';
  @Input() public hovImage = '';
  @Input() public unhovImage = '';
  @Input() public disableImage = '';
  @Input() public disabled = false;
  @Output() public cl = new EventEmitter();

  public hov = false;

  public onClick(event: Event) {
    if(this.disabled) return;
    console.log('huop');
    this.cl.emit(event);
    event.stopPropagation();
  }

  constructor() {}

  ngOnInit(): void {}

  onEnter() {
    this.hov = true;
  }

  onLeave() {
    this.hov = false;
  }

  getImage() {
    if (this.disabled) return this.disableImage;
    if (this.hov) {
      return this.hovImage
    }else{
      return this.unhovImage;
    }
  }

  //getFontSize(text: string) {
  //  if (!text) return '16px';
  //  if (text.length > 40) return '16px';
  //  return '16px';
  //}
}
