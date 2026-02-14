import { Component, Input } from '@angular/core';
import { cn } from '../../../lib/utils';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-separator',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div
      [class]="classes"
      [attr.data-orientation]="orientation"
    ></div>
  `,
})
export class SeparatorComponent {
    @Input() className: string = '';
    @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

    get classes() {
        return cn(
            "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
            this.className
        );
    }
}
