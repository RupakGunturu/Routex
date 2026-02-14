import { Component, Input } from '@angular/core';
import { cn } from '../../../lib/utils';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div data-slot="table-container" class="relative w-full overflow-x-auto">
      <table [class]="classes">
        <ng-content></ng-content>
      </table>
    </div>
  `,
})
export class TableComponent {
    @Input() className: string = '';
    get classes() {
        return cn("w-full caption-bottom text-sm", this.className);
    }
}

@Component({
    selector: 'app-table-header',
    standalone: true,
    template: `<thead [class]="classes"><ng-content></ng-content></thead>`,
})
export class TableHeaderComponent {
    @Input() className: string = '';
    get classes() { return cn("[&_tr]:border-b", this.className); }
}

@Component({
    selector: 'app-table-body',
    standalone: true,
    template: `<tbody [class]="classes"><ng-content></ng-content></tbody>`,
})
export class TableBodyComponent {
    @Input() className: string = '';
    get classes() { return cn("[&_tr:last-child]:border-0", this.className); }
}

@Component({
    selector: 'app-table-row',
    standalone: true,
    template: `<tr [class]="classes"><ng-content></ng-content></tr>`,
})
export class TableRowComponent {
    @Input() className: string = '';
    get classes() {
        return cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", this.className);
    }
}

@Component({
    selector: 'app-table-head',
    standalone: true,
    template: `<th [class]="classes"><ng-content></ng-content></th>`,
})
export class TableHeadComponent {
    @Input() className: string = '';
    get classes() {
        return cn("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", this.className);
    }
}

@Component({
    selector: 'app-table-cell',
    standalone: true,
    template: `<td [class]="classes"><ng-content></ng-content></td>`,
})
export class TableCellComponent {
    @Input() className: string = '';
    get classes() {
        return cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", this.className);
    }
}
