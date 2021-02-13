import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ComponentLoaderDirective } from './directives/component-loader.directive';

@NgModule({
  declarations: [
    ComponentLoaderDirective,
    QuizComponent,
    FeedbackComponent,
    UserDetailsComponent
  ],
  entryComponents: [
    FeedbackComponent,
    QuizComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ComponentLoaderDirective,
    QuizComponent,
    FeedbackComponent,
    UserDetailsComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
