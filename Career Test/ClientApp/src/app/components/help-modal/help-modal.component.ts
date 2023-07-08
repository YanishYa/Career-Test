import { Chair } from './../../models/test-result.model';
import { QuestionsService } from './../../services/questions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss'],
})
export class HelpModalComponent implements OnInit {
  type: number = 0;

  guild = "";

  chairs: Chair[] = []

  constructor(route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) data: number, private testResult: QuestionsService, public ref: MatDialogRef<HelpModalComponent>) {
    this.type = data;


    const res = testResult.getResultFromLS();
    console.log(res);
    if (res) {
      this.guild = res.results[0].result.guildName;

      this.chairs = res.results[0].result.chairs;
    }
  }

  ngOnInit(): void {
  }

  close() {

  }
}
