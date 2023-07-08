import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chair-button',
  templateUrl: './chair-button.component.html',
  styleUrls: ['./chair-button.component.css']
})
export class ChairButtonComponent implements OnInit {
  @Input() public  text = 'Click me';
  @Input() public char = '';
  @Output() public click = new EventEmitter();

  public hov = "unhov";

  public onClick(event: Event) {
    console.log('huo');
    this.click.emit(event);
    event.stopPropagation();
  }

  constructor() {}

  ngOnInit(): void {}

  onEnter() {
    this.hov = 'hov';
  }

  onLeave() {
    this.hov = 'unhov';
  }

  getFontSize(text: string) {
    if (!text) return '30px';
    if (text.length > 40) return '20px';
    return '30px';
  }
}
