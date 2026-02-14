import { Component, Input, HostBinding } from '@angular/core';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() className: string = '';
  get classes() {
    return cn("bg-card text-card-foreground rounded-xl border border-slate-200/60 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] dark:border-slate-800/60 dark:shadow-none", this.className);
  }
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeaderComponent {
  @Input() className: string = '';
  get classes() {
    return cn("flex flex-col space-y-1.5 p-6", this.className);
  }
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardTitleComponent {
  @Input() className: string = '';
  get classes() {
    return cn("font-heading text-lg font-semibold leading-tight tracking-tight", this.className);
  }
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardDescriptionComponent {
  @Input() className: string = '';
  get classes() {
    return cn("text-sm text-slate-500 dark:text-slate-400", this.className);
  }
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContentComponent {
  @Input() className: string = '';
  get classes() {
    return cn("p-6 pt-0", this.className);
  }
}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooterComponent {
  @Input() className: string = '';
  get classes() {
    return cn("flex items-center p-6 pt-0", this.className);
  }
}
