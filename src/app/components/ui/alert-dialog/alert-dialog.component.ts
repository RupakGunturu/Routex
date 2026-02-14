import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        class="fixed inset-0 bg-black/80 animate-in fade-in duration-200"
        (click)="cancel()"
      ></div>
      <div 
        class="relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 animate-in zoom-in-95 sm:rounded-lg"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AlertDialogComponent {
    @Input() open: boolean = false;
    @Output() openChange = new EventEmitter<boolean>();

    cancel() {
        this.open = false;
        this.openChange.emit(this.open);
    }
}

@Component({
    selector: 'app-alert-dialog-header',
    standalone: true,
    template: `
    <div class="flex flex-col space-y-2 text-center sm:text-left">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertDialogHeaderComponent { }

@Component({
    selector: 'app-alert-dialog-footer',
    standalone: true,
    template: `
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertDialogFooterComponent { }

@Component({
    selector: 'app-alert-dialog-title',
    standalone: true,
    template: `
    <h2 class="text-lg font-semibold">
      <ng-content></ng-content>
    </h2>
  `,
})
export class AlertDialogTitleComponent { }

@Component({
    selector: 'app-alert-dialog-description',
    standalone: true,
    template: `
    <p class="text-sm text-muted-foreground">
      <ng-content></ng-content>
    </p>
  `,
})
export class AlertDialogDescriptionComponent { }

@Component({
    selector: 'app-alert-dialog-action',
    standalone: true,
    template: `
    <ng-content></ng-content>
  `,
})
export class AlertDialogActionComponent { }

@Component({
    selector: 'app-alert-dialog-content',
    standalone: true,
    template: `
    <div class="py-4">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertDialogContentComponent { }

@Component({
    selector: 'app-alert-dialog-cancel',
    standalone: true,
    template: `
    <ng-content></ng-content>
  `,
})
export class AlertDialogCancelComponent { }
