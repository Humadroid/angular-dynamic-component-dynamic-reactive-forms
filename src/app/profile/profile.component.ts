import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FeedbackComponent } from '../shared/components/feedback/feedback.component';
import { QuizComponent } from '../shared/components/quiz/quiz.component';
import { UserDetailsComponent } from '../shared/components/user-details/user-details.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  components: any[];
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.components = [{
      component: UserDetailsComponent,
      formControlName: 'userDetails',
      isMandatory: true
    }, {
      component: QuizComponent,
      formControlName: 'quiz',
      isMandatory: false
    }, {
      component: FeedbackComponent,
      formControlName: 'feedback',
      isMandatory: false
    }];

    this.profileForm = this.fb.group({
      userDetails: [],
      quiz: [],
      feedback: []
    });
    console.log(this.profileForm);
    this.profileForm.valueChanges.subscribe(_ => console.log(this.profileForm));
    this.profileForm.patchValue({
      feedback: 'hellloo',
      quiz: { task: 'task', selected: 'hello@gmail.com' },
      userDetails: { addressLine: '1', areacode: 'qw' }
    }, { emitEvent: false });
    this.profileForm.controls.quiz.disable();
  }

}
