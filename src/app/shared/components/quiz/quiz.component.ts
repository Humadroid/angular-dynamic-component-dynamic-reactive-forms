import { Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

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
export class QuizComponent implements OnInit, ControlValueAccessor, Validator {

  public quiz: FormGroup = new FormGroup(
    {
      task: new FormControl('', [Validators.required]),
      selected: new FormControl('', [Validators.required])
    });
  constructor() { }

  ngOnInit() {
  }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    val && this.quiz.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    console.log('on change');
    this.quiz.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    console.log('on blur');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.quiz.disable() : this.quiz.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log('Basic Info validation', c);
    return this.quiz.valid ? null : { invalidForm: { valid: false, message: 'quiz fields are invalid' } };
  }
}
