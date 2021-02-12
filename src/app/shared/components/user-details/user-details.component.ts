import { Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserDetailsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserDetailsComponent),
      multi: true
    }
  ]
})
export class UserDetailsComponent implements OnInit, ControlValueAccessor, Validator {

  public userDetails: FormGroup = new FormGroup({
    addressLine: new FormControl('', [Validators.required]),
    areacode: new FormControl('', [Validators.required, Validators.maxLength(5)])
  });
  constructor() { }

  ngOnInit() {
  }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    val && this.userDetails.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    console.log('on change');
    this.userDetails.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    console.log('on blur');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.userDetails.disable() : this.userDetails.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log('userDetails validation');
    return this.userDetails.valid ? null : { invalidForm: { valid: false, message: 'userDetails fields are invalid' } };
  }
}
