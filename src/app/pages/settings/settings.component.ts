import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    Settings,
    User,
    Bell,
    Database,
    Shield,
    Trash2
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

import {
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardHeaderComponent,
    CardTitleComponent
} from '../../components/ui/card/card.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { InputComponent } from '../../components/ui/input/input.component';
import { LabelComponent } from '../../components/ui/label/label.component';
import { SelectComponent, SelectItemComponent } from '../../components/ui/select/select.component';
import {
    TableComponent,
    TableBodyComponent,
    TableCellComponent,
    TableHeadComponent,
    TableHeaderComponent,
    TableRowComponent
} from '../../components/ui/table/table.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import { SwitchComponent } from '../../components/ui/switch/switch.component';
import { SeparatorComponent } from '../../components/ui/separator/separator.component';
import {
    AlertDialogComponent,
    AlertDialogActionComponent,
    AlertDialogCancelComponent,
    AlertDialogContentComponent,
    AlertDialogDescriptionComponent,
    AlertDialogFooterComponent,
    AlertDialogHeaderComponent,
    AlertDialogTitleComponent
} from '../../components/ui/alert-dialog/alert-dialog.component';

interface AppUser {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Analyst" | "Operator";
    status: "Active" | "Inactive";
}

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        LucideAngularModule,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardDescriptionComponent,
        CardContentComponent,
        ButtonComponent,
        InputComponent,
        LabelComponent,
        SelectComponent,
        SelectItemComponent,
        TableComponent,
        TableHeaderComponent,
        TableRowComponent,
        TableHeadComponent,
        TableBodyComponent,
        TableCellComponent,
        BadgeComponent,
        SwitchComponent,
        SeparatorComponent,
        AlertDialogComponent,
        AlertDialogActionComponent,
        AlertDialogCancelComponent,
        AlertDialogContentComponent,
        AlertDialogDescriptionComponent,
        AlertDialogFooterComponent,
        AlertDialogHeaderComponent,
        AlertDialogTitleComponent
    ],
    template: `
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Settings</h2>
        <p class="text-muted-foreground">Manage system preferences and configuration</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- User Management -->
        <app-card class="lg:col-span-2 border-t-4 border-t-purple-500">
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="User" class="h-5 w-5 text-purple-500"></lucide-icon>
              User Management
            </app-card-title>
            <app-card-description>Manage system users and their roles</app-card-description>
          </app-card-header>
          <app-card-content>
            <app-table>
              <app-table-header>
                <app-table-row>
                  <app-table-head>Name</app-table-head>
                  <app-table-head>Email</app-table-head>
                  <app-table-head>Role</app-table-head>
                  <app-table-head>Status</app-table-head>
                  <app-table-head class="text-right">Actions</app-table-head>
                </app-table-row>
              </app-table-header>
              <app-table-body>
                <app-table-row *ngFor="let user of users">
                  <app-table-cell class="font-medium">{{user.name}}</app-table-cell>
                  <app-table-cell>{{user.email}}</app-table-cell>
                  <app-table-cell>
                    <app-badge [className]="getRoleBadgeClass(user.role)">
                      {{user.role}}
                    </app-badge>
                  </app-table-cell>
                  <app-table-cell>
                    <app-badge [variant]="user.status === 'Active' ? 'default' : 'secondary'">
                      {{user.status}}
                    </app-badge>
                  </app-table-cell>
                  <app-table-cell class="text-right">
                    <app-button variant="outline" size="sm">Edit</app-button>
                  </app-table-cell>
                </app-table-row>
              </app-table-body>
            </app-table>
            <div class="mt-4">
              <app-button>
                <lucide-icon [name]="User" class="h-4 w-4 mr-2"></lucide-icon>
                Add New User
              </app-button>
            </div>
          </app-card-content>
        </app-card>

        <!-- Notifications -->
        <app-card>
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="Bell" class="h-5 w-5 text-amber-500"></lucide-icon>
              Notifications
            </app-card-title>
            <app-card-description>Configure alert and notification settings</app-card-description>
          </app-card-header>
          <app-card-content class="space-y-6">
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <app-label>Email Notifications</app-label>
                <p class="text-sm text-muted-foreground">
                  Receive important updates via email
                </p>
              </div>
              <app-switch [(ngModel)]="emailNotifications"></app-switch>
            </div>
            <app-separator></app-separator>
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <app-label>Delay Alerts</app-label>
                <p class="text-sm text-muted-foreground">
                  Get notified when delays exceed threshold
                </p>
              </div>
              <app-switch [(ngModel)]="delayAlerts"></app-switch>
            </div>
            <app-separator></app-separator>
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <app-label>Daily Reports</app-label>
                <p class="text-sm text-muted-foreground">
                  Receive daily summary reports
                </p>
              </div>
              <app-switch [(ngModel)]="dailyReports"></app-switch>
            </div>
            <app-separator></app-separator>
            <div class="space-y-2">
              <app-label>Delay Alert Threshold (minutes)</app-label>
              <app-select [(ngModel)]="delayThreshold">
                <app-select-item value="3">3 minutes</app-select-item>
                <app-select-item value="5">5 minutes</app-select-item>
                <app-select-item value="10">10 minutes</app-select-item>
                <app-select-item value="15">15 minutes</app-select-item>
              </app-select>
            </div>
          </app-card-content>
        </app-card>

        <!-- Preferences -->
        <app-card>
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="Settings" class="h-5 w-5 text-blue-500"></lucide-icon>
              Preferences
            </app-card-title>
            <app-card-description>System-wide preferences</app-card-description>
          </app-card-header>
          <app-card-content class="space-y-6">
            <div class="space-y-2">
              <app-label>Timezone</app-label>
              <app-select [(ngModel)]="timezone">
                <app-select-item value="America/New_York">Eastern Time (ET)</app-select-item>
                <app-select-item value="America/Chicago">Central Time (CT)</app-select-item>
                <app-select-item value="America/Denver">Mountain Time (MT)</app-select-item>
                <app-select-item value="America/Los_Angeles">Pacific Time (PT)</app-select-item>
                <app-select-item value="UTC">UTC</app-select-item>
              </app-select>
            </div>
            <div class="space-y-2">
              <app-label>Data Retention Period</app-label>
              <app-select [(ngModel)]="dataRetention">
                <app-select-item value="30">30 days</app-select-item>
                <app-select-item value="60">60 days</app-select-item>
                <app-select-item value="90">90 days</app-select-item>
                <app-select-item value="180">180 days</app-select-item>
                <app-select-item value="365">1 year</app-select-item>
              </app-select>
            </div>
            <div class="space-y-2">
              <app-label>Default On-Time Threshold</app-label>
              <app-input type="number" [(ngModel)]="onTimeThreshold"></app-input>
              <p class="text-xs text-muted-foreground">
                Trips arriving within this many minutes are considered on-time
              </p>
            </div>
          </app-card-content>
        </app-card>

        <!-- Data Management -->
        <app-card class="lg:col-span-2">
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="Database" class="h-5 w-5 text-indigo-500"></lucide-icon>
              Data Management
            </app-card-title>
            <app-card-description>Manage system data and backups</app-card-description>
          </app-card-header>
          <app-card-content>
            <div class="grid gap-4 md:grid-cols-3">
              <app-card>
                <app-card-content class="pt-6">
                  <div class="text-center space-y-2">
                    <lucide-icon [name]="Database" class="h-8 w-8 mx-auto text-muted-foreground"></lucide-icon>
                    <h3 class="font-medium">Export Data</h3>
                    <p class="text-sm text-muted-foreground">
                      Download all system data as backup
                    </p>
                    <app-button variant="outline" className="w-full">
                      Export Backup
                    </app-button>
                  </div>
                </app-card-content>
              </app-card>
              <app-card>
                <app-card-content class="pt-6">
                  <div class="text-center space-y-2">
                    <lucide-icon [name]="Shield" class="h-8 w-8 mx-auto text-muted-foreground"></lucide-icon>
                    <h3 class="font-medium">Import Data</h3>
                    <p class="text-sm text-muted-foreground">
                      Restore data from a backup file
                    </p>
                    <app-button variant="outline" className="w-full">
                      Import Backup
                    </app-button>
                  </div>
                </app-card-content>
              </app-card>
              <app-card class="border-destructive/50">
                <app-card-content class="pt-6">
                  <div class="text-center space-y-2">
                    <lucide-icon [name]="Trash2" class="h-8 w-8 mx-auto text-destructive"></lucide-icon>
                    <h3 class="font-medium text-destructive">Reset Data</h3>
                    <p class="text-sm text-muted-foreground">
                      Clear all logs and reset system
                    </p>
                    <app-button variant="destructive" className="w-full" (click)="isResetOpen = true">
                      Reset All Data
                    </app-button>

                    <app-alert-dialog [(open)]="isResetOpen">
                      <app-alert-dialog-header>
                        <app-alert-dialog-title>Are you absolutely sure?</app-alert-dialog-title>
                      </app-alert-dialog-header>
                      <app-alert-dialog-content>
                        <app-alert-dialog-description>
                          This action cannot be undone. This will permanently delete all
                          arrival logs, schedules, and analytics data from the system.
                        </app-alert-dialog-description>
                      </app-alert-dialog-content>
                      <app-alert-dialog-footer>
                        <app-alert-dialog-cancel>
                          <app-button variant="outline" (click)="isResetOpen = false">Cancel</app-button>
                        </app-alert-dialog-cancel>
                        <app-alert-dialog-action>
                          <app-button variant="destructive" (click)="isResetOpen = false">Yes, reset all data</app-button>
                        </app-alert-dialog-action>
                      </app-alert-dialog-footer>
                    </app-alert-dialog>
                  </div>
                </app-card-content>
              </app-card>
            </div>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `,
})
export class SettingsComponent {
    readonly Settings = Settings;
    readonly User = User;
    readonly Bell = Bell;
    readonly Database = Database;
    readonly Shield = Shield;
    readonly Trash2 = Trash2;

    users: AppUser[] = [
        { id: "U001", name: "John Admin", email: "admin@transit.com", role: "Admin", status: "Active" },
        { id: "U002", name: "Sarah Analyst", email: "sarah@transit.com", role: "Analyst", status: "Active" },
        { id: "U003", name: "Mike Operator", email: "mike@transit.com", role: "Operator", status: "Active" },
        { id: "U004", name: "Jane Smith", email: "jane@transit.com", role: "Analyst", status: "Inactive" },
    ];

    emailNotifications = true;
    delayAlerts = true;
    dailyReports = false;
    delayThreshold = "5";
    timezone = "America/New_York";
    dataRetention = "90";
    onTimeThreshold = 5;
    isResetOpen = false;

    getRoleBadgeClass(role: AppUser["role"]) {
        switch (role) {
            case "Admin":
                return "bg-purple-500 hover:bg-purple-600 border-none text-white";
            case "Analyst":
                return "bg-blue-500 hover:bg-blue-600 border-none text-white";
            case "Operator":
                return "bg-slate-500 hover:bg-slate-600 border-none text-white";
            default:
                return "";
        }
    }
}
