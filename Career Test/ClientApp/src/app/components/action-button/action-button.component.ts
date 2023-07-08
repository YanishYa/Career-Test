import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
})
export class ActionButtonComponent implements OnInit {
  @Input() public  text = 'Click me';
  @Input() public char = '';
  @Output() public click = new EventEmitter();

  @Input() public width = "475px";
  @Input() public height = "140px";

  public hov = "unhov";

  public onClick(event: Event) {
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
}
