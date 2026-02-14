import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { PlaceholderComponent } from './pages/placeholder.component';
import { ArrivalsComponent } from './pages/arrivals/arrivals.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/analytics', component: AnalyticsComponent },
    { path: 'dashboard/routes', component: RoutesComponent },
    { path: 'dashboard/vehicles', component: VehiclesComponent },
    { path: 'dashboard/schedules', component: SchedulesComponent },
    { path: 'dashboard/arrivals', component: ArrivalsComponent },
    { path: 'dashboard/reports', component: ReportsComponent },
    { path: 'dashboard/settings', component: SettingsComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
