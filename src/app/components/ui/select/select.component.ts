import { Component, Input, Output, EventEmitter, forwardRef, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../../../lib/utils';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';

const SELECT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [SELECT_VALUE_ACCESSOR],
  template: `
    <div class="relative w-full">
      <select
        [class]="classes"
        [(ngModel)]="value"
        (change)="onSelectChange($event)"
        [disabled]="disabled"
      >
        <ng-content></ng-content>
      </select>
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
        <lucide-icon [name]="ChevronDown" class="size-4"></lucide-icon>
      </div>
    </div>
  `,
})
export class SelectComponent implements ControlValueAccessor {
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  readonly ChevronDown = ChevronDown;

  value: any = '';
  private onChange: any = () => { };
  private onTouched: any = () => { };

  get classes() {
    return cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
      this.className
    );
  }

  writeValue(value: any): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onSelectChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}

@Component({
  selector: 'app-select-item',
  standalone: true,
  template: `<option [value]="value"><ng-content></ng-content></option>`,
})
export class SelectItemComponent {
  @Input() value: any;
}

const SLIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true,
};

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SLIDER_VALUE_ACCESSOR],
  template: `
    <div class="relative flex w-full touch-none select-none items-center py-4">
      <input
        type="range"
        [min]="min"
        [max]="max"
        [step]="step"
        [(ngModel)]="value"
        (input)="onInputChange($event)"
        class="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  `,
})
export class SliderComponent implements ControlValueAccessor {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;

  value: number = 0;
  private onChange: any = () => { };
  private onTouched: any = () => { };

  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.value = value[0]; // Simple slider for now
    } else {
      this.value = value;
    }
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  onInputChange(event: any) {
    this.value = Number(event.target.value);
    this.onChange([this.value]); // Match the array format used in React slider
    this.onTouched();
  }
}
