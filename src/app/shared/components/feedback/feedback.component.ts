import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeedbackComponent),
      multi: true
    }
  ]
})
export class FeedbackComponent {
  public value: string;
  public disabled: boolean;
  onChange = (value: any) => { };
  onTouched = () => { };

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onValueChange(value: string): void {
    this.writeValue(value);
    this.onChange(value);
  }

  public onInputBlurred(): void {
    this.onTouched();
  }

  public setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
  // For reactive form
  // public setDisabledState?(isDisabled: boolean): void { isDisabled ? this.form.disabled() : this.form.enabled() }
}
