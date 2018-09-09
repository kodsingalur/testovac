import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestDefinitionEditComponent} from './component/definitions/test-definition-edit/test-definition-edit.component';
import {ExerciseDefinitionEditComponent} from './component/definitions/exercise-definition-edit/exercise-definition-edit.component';
import {TaskDefinitionEditComponent} from './component/definitions/task-definition-edit/task-definition-edit.component';
import {QuestionDefinitionEditComponent} from './component/definitions/question-definition-edit/question-definition-edit.component';
import {AnswerDefinitionEditComponent} from './component/definitions/answer-definition-edit/answer-definition-edit.component';
import {RunComponent} from 'app/component/running/run/run.component';


const routes: Routes = [
  {path: '', redirectTo: '/mock/testedit', pathMatch: 'full'},
  {path: ':testid/testedit', component: TestDefinitionEditComponent},
  {path: ':testid/testedit/exercise/:exercise_order', component: ExerciseDefinitionEditComponent},
  {path: ':testid/testedit/exercise/:exercise_order/task/:task_order', component: TaskDefinitionEditComponent},
  {path: ':testid/testedit/exercise/:exercise_order/question/:question_order', component: QuestionDefinitionEditComponent},
  {path: ':testid/testedit/exercise/:exercise_order/question/:question_order/answer/:answer_order',
    component: AnswerDefinitionEditComponent},
  {path: ':testid/run', component: RunComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
