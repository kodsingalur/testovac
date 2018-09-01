import {ChooseAnswerComponent} from '../choose-answer/choose-answer.component';
import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MatDialogConfig} from '@angular/material/dialog';
import {QuestionDefinition} from 'app/model/definitions/question-definition';
import {ActivatedRoute} from '@angular/router';
import {ModelService} from 'app/services/model.service';

@Component({
  selector: 'app-question-definition-edit',
  templateUrl: './question-definition-edit.component.html',
  styleUrls: ['./question-definition-edit.component.css']
})
export class QuestionDefinitionEditComponent implements OnInit {
  linkDialogRef: MatDialogRef<ChooseAnswerComponent>;
  question: QuestionDefinition;
  constructor(private route: ActivatedRoute, protected model: ModelService, private dialog: MatDialog) {}

  ngOnInit() {
    this.model.loadTest(this.route.snapshot.paramMap.get('testid')).then((test) => {
      const idExercise = +this.route.snapshot.paramMap.get('exercise_order');
      const exercise = this.model.test.exercises[idExercise];
      const idQuestion = +this.route.snapshot.paramMap.get('question_order');
      this.question = exercise.questions[idQuestion];
    });
  }

  linkAnswer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.linkDialogRef = this.dialog.open(ChooseAnswerComponent, dialogConfig);
    this.linkDialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.question.linkAnswer(answer);
      }
    });
  }

}
