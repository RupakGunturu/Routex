import { Component, Input, inject, HostBinding, computed } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { cn } from '../../../lib/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-provider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      data-slot="sidebar-wrapper"
      [style]="wrapperStyles"
      [class]="wrapperClasses"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarProviderComponent {
  private sidebarService = inject(SidebarService);

  @Input() className: string = '';

  get wrapperClasses() {
    return cn(
      "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
      this.className
    );
  }

  get wrapperStyles() {
    return {
      '--sidebar-width': '16rem',
      '--sidebar-width-icon': '3rem'
    };
  }
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Mobile Sheet (Simplified implementation) -->
    <div *ngIf="sidebarService.isMobile() && sidebarService.openMobile()" 
         class="fixed inset-0 z-50 bg-black/50 md:hidden"
         (click)="sidebarService.setOpenMobile(false)">
      <div class="bg-sidebar text-sidebar-foreground w-[18rem] h-full shadow-lg" (click)="$event.stopPropagation()">
        <ng-content></ng-content>
      </div>
    </div>

    <!-- Desktop Sidebar -->
    <div
      *ngIf="!sidebarService.isMobile()"
      class="group peer text-sidebar-foreground hidden md:block"
      [attr.data-state]="sidebarService.state()"
      [attr.data-collapsible]="sidebarService.state() === 'collapsed' ? collapsible : ''"
      [attr.data-variant]="variant"
      [attr.data-side]="side"
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        [class]="gapClasses"
      ></div>
      <div
        data-slot="sidebar-container"
        [class]="containerClasses"
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);

  @Input() side: 'left' | 'right' = 'left';
  @Input() variant: 'sidebar' | 'floating' | 'inset' = 'sidebar';
  @Input() collapsible: 'offcanvas' | 'icon' | 'none' = 'icon';
  @Input() className: string = '';

  get gapClasses() {
    return cn(
      "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
      "group-data-[collapsible=offcanvas]:w-0",
      "group-data-[side=right]:rotate-180",
      this.variant === "floating" || this.variant === "inset"
        ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
    );
  }

  get containerClasses() {
    return cn(
      "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
      this.side === "left"
        ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
        : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
      this.variant === "floating" || this.variant === "inset"
        ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
      this.className
    );
  }
}

@Component({
  selector: 'app-sidebar-header',
  standalone: true,
  template: `<div class="flex flex-col gap-2 p-2"><ng-content></ng-content></div>`,
})
export class SidebarHeaderComponent { }

@Component({
  selector: 'app-sidebar-content',
  standalone: true,
  template: `<div class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"><ng-content></ng-content></div>`,
})
export class SidebarContentComponent { }

@Component({
  selector: 'app-sidebar-footer',
  standalone: true,
  template: `<div class="flex flex-col gap-2 p-2"><ng-content></ng-content></div>`,
})
export class SidebarFooterComponent { }

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  template: `<ul class="flex w-full min-w-0 flex-col gap-1"><ng-content></ng-content></ul>`,
})
export class SidebarMenuComponent { }

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  template: `<li class="group/menu-item relative"><ng-content></ng-content></li>`,
})
export class SidebarMenuItemComponent { }

@Component({
  selector: 'app-sidebar-menu-button',
  standalone: true,
  template: `
    <button
      [class]="classes"
      [attr.data-active]="isActive"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class SidebarMenuButtonComponent {
  sidebarService = inject(SidebarService);
  @Input() className: string = '';
  @Input() isActive: boolean = false;

  get classes() {
    return cn(
      "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      this.className
    );
  }
}
