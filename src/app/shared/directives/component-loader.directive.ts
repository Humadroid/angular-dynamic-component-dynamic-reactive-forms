import { ComponentFactoryResolver, Directive, Injector, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appComponentLoader]',
})
export class ComponentLoaderDirective implements OnInit {
  @Input() component: any;

  constructor(
    public injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<any>(this.component);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const ngControl = this.injector.get(NgControl);
    ngControl.valueAccessor = componentRef.instance;
  }

  // validate(): any {
  //   return this.component.instance.validate;
  // }
}
