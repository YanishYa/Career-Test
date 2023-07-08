  import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  showSide = true;

  constructor() {
    this.onResize(null);
  }


  public toggle(val: any) {
    console.log(val);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let ratio;
    let left;
    ratio = window.innerHeight / 969;
    if (window.innerWidth / 1920 < ratio) {
        ratio = window.innerWidth / 1920;
    }
    // document.body.style["-ms-zoom"] = (ratio as any);
    // document.body.style["-moz-transform"] = 'scale(' + ratio + ')';
    // document.body.style["-o-transform"] = 'scale(' + ratio + ')';
    // document.body.style["-webkit-transform"] = 'scale(' + ratio + ')';
    //document.body.style['transform'] = 'scale(' + ratio + ')';

    // $('body').css('-ms-zoom', ratio);
    // $('body').css('', );
    // $('body').css('', );
    // $('body').css('', );
    // $('body').css(, );
    // left = ($(window).innerWidth() - $('body').outerWidth() * ratio) / 2;
    // $('body').css('left', left);
}
}
