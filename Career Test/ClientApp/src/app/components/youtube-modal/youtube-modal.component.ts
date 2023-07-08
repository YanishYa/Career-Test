import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-modal',
  templateUrl: './youtube-modal.component.html',
  styleUrls: ['./youtube-modal.component.css'],
})
export class YoutubeModalComponent implements OnInit {

  private videoUrl = 'https://youtu.be/APwCH8ai2gg';
  private safeUrl = '';

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {}
}
