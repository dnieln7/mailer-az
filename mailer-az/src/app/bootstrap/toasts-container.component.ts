import {Component, HostBinding, TemplateRef} from '@angular/core';
import {ToastService} from '../service/toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)">

      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  // host: {'[class.ngb-toasts]': 'true'}
})
@HostBinding('[class.ngb-toasts]')
export class ToastsContainerComponent {
  constructor(public toastService: ToastService) {
  }

  public isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
