import { ModelService } from '../../../services/model.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-answer',
  templateUrl: './choose-answer.component.html',
  styleUrls: ['./choose-answer.component.css']
})
export class ChooseAnswerComponent implements OnInit {
  constructor(private model: ModelService, private dialogRef: MatDialogRef<ChooseAnswerComponent>) { }

  answers;

  ngOnInit() {
    this.answers = this.model.test.answers();
  }
  public open(event, item) {
    this.dialogRef.close(item);
  }
  public close (){
    this.dialogRef.close(null);
  }
}
