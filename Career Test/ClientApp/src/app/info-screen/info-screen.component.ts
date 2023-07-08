import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-screen',
  templateUrl: './info-screen.component.html',
  styleUrls: ['./info-screen.component.css']
})
export class InfoScreenComponent implements OnInit {

  @Input() text: string = '';
  @Input() register: boolean = false;
  @Input() refresh: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public refreshPage() {
    window.location.reload();
  }

}
