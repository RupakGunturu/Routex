import { Component, Input } from '@angular/core';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-label',
  standalone: true,
  template: `
    <label [class]="classes">
      <ng-content></ng-content>
    </label>
  `,
})
export class LabelComponent {
  @Input() className: string = '';

  get classes() {
    return cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      this.className
    );
  }
}
