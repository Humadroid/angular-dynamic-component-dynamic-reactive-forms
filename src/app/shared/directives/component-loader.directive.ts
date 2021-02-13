import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EventEmitter,
  Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  SkipSelf,
  ViewContainerRef
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ControlContainer,
  FormControl,

  NgControl, NG_VALIDATORS,

  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';

export function normalizeValidator(
  validator: ValidatorFn | Validator
): ValidatorFn {
  if ((validator as Validator).validate) {
    return (c: AbstractControl) => (validator as Validator).validate(c);
  } else {
    return validator as ValidatorFn;
  }
}

// export const controlNameBinding: any = {
//   provide: NgControl,
//   useExisting: forwardRef(() => ComponentLoaderDirective)
// };

@Directive({
  selector: '[appComponentLoader]',
  // providers: [controlNameBinding]
})
export class ComponentLoaderDirective extends NgControl implements OnInit, OnDestroy {
  @Input() details: any;

  component: ComponentRef<any>;

  @Output() ngModelChange = new EventEmitter();

  controlName: FormControl;

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    @Optional()
    @Self()
    @Inject(NG_VALIDATORS)
    private validators: Array<Validator | ValidatorFn>,
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    // public injector: Injector,
  ) {
    super();
  }

  ngOnInit(): void {
    const component = this.resolver.resolveComponentFactory<any>(
      this.details.component
    );
    this.component = this.container.createComponent(component);
    this.valueAccessor = this.component.instance;
    // const ngControl = this.injector.get(NgControl);
    // ngControl.valueAccessor = this.component.instance;
    // this.valueAccessor = ngControl.valueAccessor;

    const ngValidators = this.component.injector.get(NG_VALIDATORS, null);
    if (ngValidators && ngValidators.some(x => x === this.component.instance)) {
      this.validators = [
        ...(this.validators || []),
        ...(ngValidators as Array<Validator | ValidatorFn>)
      ];
    }
    this.controlName = this.formDirective.addControl(this);
  }

  get path(): string[] {
    // tslint:disable-next-line: no-non-null-assertion
    return [...this.parent.path !, this.details.formControlName];
  }

  get formDirective(): any {
    return this.parent ? this.parent.formDirective : null;
  }

  get control(): FormControl {
    return this.controlName;
  }

  get validator(): ValidatorFn | null {
    return this.validators != null
      ? Validators.compose(this.validators.map(normalizeValidator))
      : null;
  }

  get asyncValidator(): AsyncValidatorFn {
    return null;
  }

  viewToModelUpdate(newValue: any): void {
    this.ngModelChange.emit(newValue);
  }

  ngOnDestroy(): void {
    if (this.formDirective) {
      this.formDirective.removeControl(this);
    }
    if (this.component) {
      this.component.destroy();
    }
  }
}
