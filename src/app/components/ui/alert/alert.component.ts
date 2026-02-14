import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { CommonModule } from '@angular/common';

const alertVariants = cva(
    "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    {
        variants: {
            variant: {
                default: "bg-card text-card-foreground",
                destructive:
                    "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

type AlertVariants = VariantProps<typeof alertVariants>;

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="classes" role="alert">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertComponent {
    @Input() className: string = '';
    @Input() variant: AlertVariants['variant'] = 'default';

    get classes() {
        return cn(alertVariants({ variant: this.variant }), this.className);
    }
}

@Component({
    selector: 'app-alert-title',
    standalone: true,
    template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertTitleComponent {
    @Input() className: string = '';
    get classes() {
        return cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", this.className);
    }
}

@Component({
    selector: 'app-alert-description',
    standalone: true,
    template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertDescriptionComponent {
    @Input() className: string = '';
    get classes() {
        return cn("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", this.className);
    }
}
