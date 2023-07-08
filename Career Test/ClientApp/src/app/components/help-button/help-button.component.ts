import { HelpModalComponent } from './../help-modal/help-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent implements OnInit {
  @Input() public text = '';
  @Input() public hovImage = 'url("/assets/buttons/help-button/hov.png")';
  @Input() public unhovImage = 'url("/assets/buttons/help-button/unhov.png")';
  @Input() public disableImage =
    'url("/assets/buttons/help-button/disabled.png")';
  @Input() public disabled = false;

  public hov = false;

  modalType = 0;

  constructor(private dialog: MatDialog, private router: Router) {}

  public onClick() {
    this.dialog.open(HelpModalComponent, {
      backdropClass: '',
      panelClass: 'help-modal-back',
      data: this.modalType,
    });

    if (this.disabled) return;
  }

  ngOnInit(): void {
    this.router.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        console.log(x);
        switch (this.router.url) {
          case '/': {
            this.modalType = 0;
            break;
          }
          case '/test': {
            this.modalType = 1;
            break;
          }
          case '/result': {
            this.modalType = 2;
            break;
          }
          case '/complete': {
            this.modalType = 3;
            break;
          }
        }
        this.onClick();
      }

    });
  }

  onEnter() {
    this.hov = true;
  }

  onLeave() {
    this.hov = false;
  }

  getImage() {
    if (this.disabled) return this.disableImage;
    if (this.hov) {
      return this.hovImage;
    } else {
      return this.unhovImage;
    }
  }

  getFontSize(text: string) {
    if (!text) return '30px';
    if (text.length > 40) return '20px';
    return '30px';
  }
}
