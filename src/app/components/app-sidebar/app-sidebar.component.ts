import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  LucideAngularModule,
  Bus,
  LayoutDashboard,
  Route,
  Truck,
  Calendar,
  Clock,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  PanelLeft
} from 'lucide-angular';
import {
  SidebarComponent,
  SidebarContentComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarMenuComponent,
  SidebarMenuItemComponent,
  SidebarMenuButtonComponent,
  SidebarProviderComponent
} from '../ui/sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    SidebarComponent,
    SidebarContentComponent,
    SidebarFooterComponent,
    SidebarHeaderComponent,
    SidebarMenuComponent,
    SidebarMenuItemComponent,
    SidebarMenuButtonComponent,
    SidebarProviderComponent
  ],
  template: `
    <app-sidebar-provider>
      <app-sidebar>
        <app-sidebar-header class="border-b border-sidebar-border">
          <a routerLink="/dashboard" class="flex items-center gap-3 px-2 py-2">
            <div class="p-1.5 bg-primary rounded-lg">
              <lucide-icon [name]="Bus" class="h-5 w-5 text-primary-foreground"></lucide-icon>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold">TransitAnalytics</span>
              <span class="text-xs text-muted-foreground">Delay Analytics</span>
            </div>
          </a>
        </app-sidebar-header>

        <app-sidebar-content>
          <div class="px-2 py-2 text-xs font-medium text-sidebar-foreground/70">Main</div>
          <app-sidebar-menu>
            <app-sidebar-menu-item *ngFor="let item of mainNavItems">
              <app-sidebar-menu-button [isActive]="router.url === item.href">
                <a [routerLink]="item.href" class="flex items-center gap-2 w-full">
                  <lucide-icon [name]="item.icon" class="h-4 w-4"></lucide-icon>
                  <span>{{item.title}}</span>
                </a>
              </app-sidebar-menu-button>
            </app-sidebar-menu-item>
          </app-sidebar-menu>

          <div class="px-2 py-2 mt-4 text-xs font-medium text-sidebar-foreground/70">Analytics</div>
          <app-sidebar-menu>
            <app-sidebar-menu-item *ngFor="let item of analyticsNavItems">
              <app-sidebar-menu-button [isActive]="router.url === item.href">
                <a [routerLink]="item.href" class="flex items-center gap-2 w-full">
                  <lucide-icon [name]="item.icon" class="h-4 w-4"></lucide-icon>
                  <span>{{item.title}}</span>
                </a>
              </app-sidebar-menu-button>
            </app-sidebar-menu-item>
          </app-sidebar-menu>

          <div class="px-2 py-2 mt-4 text-xs font-medium text-sidebar-foreground/70">System</div>
          <app-sidebar-menu>
            <app-sidebar-menu-item *ngFor="let item of systemNavItems">
              <app-sidebar-menu-button [isActive]="router.url === item.href">
                <a [routerLink]="item.href" class="flex items-center gap-2 w-full">
                  <lucide-icon [name]="item.icon" class="h-4 w-4"></lucide-icon>
                  <span>{{item.title}}</span>
                </a>
              </app-sidebar-menu-button>
            </app-sidebar-menu-item>
          </app-sidebar-menu>
        </app-sidebar-content>

        <app-sidebar-footer class="border-t border-sidebar-border">
          <app-sidebar-menu>
            <app-sidebar-menu-item>
              <app-sidebar-menu-button>
                <a routerLink="/login" class="flex items-center gap-2 w-full">
                  <lucide-icon [name]="LogOut" class="h-4 w-4"></lucide-icon>
                  <span>Sign Out</span>
                </a>
              </app-sidebar-menu-button>
            </app-sidebar-menu-item>
          </app-sidebar-menu>
        </app-sidebar-footer>
      </app-sidebar>
      <ng-content></ng-content>
    </app-sidebar-provider>
  `,
})
export class AppSidebarComponent {
  router = inject(Router);
  sidebarService = inject(SidebarService);

  readonly Bus = Bus;
  readonly LogOut = LogOut;
  readonly PanelLeft = PanelLeft;

  mainNavItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Routes", href: "/dashboard/routes", icon: Route },
    { title: "Vehicles", href: "/dashboard/vehicles", icon: Truck },
    { title: "Schedules", href: "/dashboard/schedules", icon: Calendar },
    { title: "Arrival Logs", href: "/dashboard/arrivals", icon: Clock },
  ];

  analyticsNavItems = [
    { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { title: "Reports", href: "/dashboard/reports", icon: FileText },
  ];

  systemNavItems = [
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
}
