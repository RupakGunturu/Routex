import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { SidebarService } from './services/sidebar.service';
import { LucideAngularModule, PanelLeft } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppSidebarComponent, CommonModule, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  router = inject(Router);
  sidebarService = inject(SidebarService);
  readonly PanelLeft = PanelLeft;

  showSidebar() {
    return this.router.url !== '/login' && this.router.url !== '/';
  }
}
