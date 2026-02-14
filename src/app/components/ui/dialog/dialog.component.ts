import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { cn } from '../../../lib/utils';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div *ngIf="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        class="fixed inset-0 bg-black/80 animate-in fade-in duration-200"
        (click)="closeDialog()"
      ></div>
      <div 
        class="relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 animate-in zoom-in-95 sm:rounded-lg"
      >
        <ng-content></ng-content>
        <button
          (click)="closeDialog()"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <lucide-icon [name]="X" class="h-4 w-4"></lucide-icon>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
  `,
})
export class DialogComponent {
    @Input() open: boolean = false;
    @Output() openChange = new EventEmitter<boolean>();
    readonly X = X;

    closeDialog() {
        this.open = false;
        this.openChange.emit(this.open);
    }
}

@Component({
    selector: 'app-dialog-header',
    standalone: true,
    template: `
    <div class="flex flex-col space-y-1.5 text-center sm:text-left">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogHeaderComponent { }

@Component({
    selector: 'app-dialog-footer',
    standalone: true,
    template: `
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogFooterComponent { }

@Component({
    selector: 'app-dialog-title',
    standalone: true,
    template: `
    <h3 class="text-lg font-semibold leading-none tracking-tight">
      <ng-content></ng-content>
    </h3>
  `,
})
export class DialogTitleComponent { }

@Component({
    selector: 'app-dialog-description',
    standalone: true,
    template: `
    <p class="text-sm text-muted-foreground">
      <ng-content></ng-content>
    </p>
  `,
})
export class DialogDescriptionComponent { }

@Component({
    selector: 'app-dialog-content',
    standalone: true,
    template: `
    <div class="py-4">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogContentComponent { }
