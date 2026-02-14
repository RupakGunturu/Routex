import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../../lib/utils';

@Component({
    selector: 'app-switch',
    standalone: true,
    imports: [CommonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchComponent),
            multi: true
        }
    ],
    template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked"
      [disabled]="disabled"
      [class]="classes"
      (click)="toggle()"
    >
      <span
        [class]="thumbClasses"
      ></span>
    </button>
  `,
})
export class SwitchComponent implements ControlValueAccessor {
    @Input() className: string = '';
    @Input() disabled: boolean = false;

    checked: boolean = false;
    private onChange: any = () => { };
    private onTouched: any = () => { };

    get classes() {
        return cn(
            "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            this.checked ? "bg-primary" : "bg-input",
            this.className
        );
    }

    get thumbClasses() {
        return cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
            this.checked ? "translate-x-4" : "translate-x-0"
        );
    }

    toggle() {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onChange(this.checked);
            this.onTouched();
        }
    }

    writeValue(value: any): void {
        this.checked = !!value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
