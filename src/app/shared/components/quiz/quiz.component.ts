import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuizComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuizComponent),
      multi: true
    },
  ]
})
export class QuizComponent implements ControlValueAccessor, Validator {

  public quiz: FormGroup = new FormGroup({
    task: new FormControl('', [Validators.required]),
    selected: new FormControl('', [Validators.required])
  });

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    if (val) {
      this.quiz.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.quiz.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.quiz.disable() : this.quiz.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.quiz.valid ? null : { invalidForm: { valid: false, message: 'quiz fields are invalid' } };
  }

}
