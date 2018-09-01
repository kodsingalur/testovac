import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestDefinitionEditComponent } from 'app/component/definitions/test-definition-edit/test-definition-edit.component';
import { PointsPanelComponent } from 'app/adjustable/evaluation/points-panel/points-panel.component';
import { GamePanelComponent } from 'app/adjustable/evaluation/game-panel/game-panel.component';
import { SelectAdjustableComponent } from './component/definitions/select-adjustable/select-adjustable.component';
import { ExerciseDefinitionEditComponent } from './component/definitions/exercise-definition-edit/exercise-definition-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { ModelService } from './services/model.service';
import { ContentComponent } from './component/definitions/content/content.component';
import { StatisticPanelComponent } from 'app/adjustable/finish/statistic-panel/statistic-panel.component';
import { TaskDefinitionEditComponent } from './component/definitions/task-definition-edit/task-definition-edit.component';
import { ShowQuestionComponent } from 'app/adjustable/question-panel/show-question/show-question.component';
import { WriteAnswerComponent } from 'app/adjustable/answer-panel/write-answer/write-answer.component';
import { ShowTaskComponent } from 'app/adjustable/task-panel/show-task/show-task.component';
import { QuestionDefinitionEditComponent } from './component/definitions/question-definition-edit/question-definition-edit.component';
import { AnswerDefinitionEditComponent } from './component/definitions/answer-definition-edit/answer-definition-edit.component';
import { RunComponent } from 'app/component/running/run/run.component';
import { ParamPanelComponent } from './component/definitions/param-panel/param-panel.component';
import { QuestionPanelWraperComponent } from 'app/component/running/question-panel-wraper/question-panel-wraper.component';
import { AnswerPanelWraperComponent } from 'app/component/running/answer-panel-wraper/answer-panel-wraper.component';
import { FileService } from './services/file.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig,
} from 'ng-gapi';

import { ChooseAnswerComponent } from './component/definitions/choose-answer/choose-answer.component';

const gapiClientConfig: NgGapiClientConfig = {
    client_id: '956049352134-lovepdf3k4jo6ceijhlk0tp2hjuce75f.apps.googleusercontent.com',
    discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
    scope: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/spreadsheets.readonly'
    ].join(' ')
};

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, MatDialogModule,
      BrowserAnimationsModule, GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })],
  declarations: [ AppComponent, TestDefinitionEditComponent, PointsPanelComponent, GamePanelComponent,
    SelectAdjustableComponent, ExerciseDefinitionEditComponent, ContentComponent, StatisticPanelComponent,
    TaskDefinitionEditComponent, ShowQuestionComponent, WriteAnswerComponent, ShowTaskComponent,
    QuestionDefinitionEditComponent, AnswerDefinitionEditComponent, RunComponent, ParamPanelComponent,
    QuestionPanelWraperComponent, AnswerPanelWraperComponent, ChooseAnswerComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ModelService, FileService],
  entryComponents: [PointsPanelComponent, GamePanelComponent, ParamPanelComponent, ShowTaskComponent,
       ShowQuestionComponent, WriteAnswerComponent, StatisticPanelComponent, ChooseAnswerComponent]
})
export class AppModule { }
