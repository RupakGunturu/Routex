import { Injectable, computed, signal, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export type SidebarState = 'expanded' | 'collapsed';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    private breakpointObserver = inject(BreakpointObserver);

    private _open = signal(true);
    private _openMobile = signal(false);

    // Use CDK BreakpointObserver to detect mobile
    private isMobile$ = this.breakpointObserver.observe('(max-width: 767px)').pipe(
        map(result => result.matches)
    );

    isMobile = toSignal(this.isMobile$, { initialValue: false });

    state = computed<SidebarState>(() => this._open() ? 'expanded' : 'collapsed');
    open = computed(() => this._open());
    openMobile = computed(() => this._openMobile());

    toggleSidebar() {
        if (this.isMobile()) {
            this._openMobile.set(!this._openMobile());
        } else {
            this._open.set(!this._open());
        }
    }

    setOpen(value: boolean) {
        this._open.set(value);
    }

    setOpenMobile(value: boolean) {
        this._openMobile.set(value);
    }
}
