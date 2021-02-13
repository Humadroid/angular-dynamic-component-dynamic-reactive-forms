import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { TypicodeAPIService } from '../../services/typicode-api.service';

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
export class UserDetailsComponent implements ControlValueAccessor, Validator {

  constructor(private fb: FormBuilder, private readonly typicodeAPIService: TypicodeAPIService) { }

  public userDetails: FormGroup = this.fb.group({
    name: [
      // initial value
      null,
      // sync built-in validators
      Validators.compose(
        [Validators.required, Validators.minLength(3)],
      ),
      // custom async validator
      this.typicodeAPIService.userValidator()
    ],
    addressLine: ['', [Validators.required]],
    areacode: ['', [Validators.required, Validators.maxLength(5)]],
  });

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    if (val) {
      this.userDetails.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.userDetails.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.userDetails.disable() : this.userDetails.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.userDetails.valid ? null : { invalidForm: { valid: false, message: 'userDetails fields are invalid' } };
  }
}
