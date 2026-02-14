import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plus, Calendar, Trash2 } from 'lucide-angular';
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

interface Schedule {
    id: string;
    vehicle: string;
    route: string;
    scheduledTime: string;
    frequency: string;
}

@Component({
    selector: 'app-schedules',
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
        TableCellComponent
    ],
    template: `
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Schedule Management</h2>
        <p class="text-muted-foreground">Create and manage vehicle schedules</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Add Schedule Form -->
        <app-card class="lg:col-span-1 border-t-4 border-t-blue-500">
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="Calendar" class="h-5 w-5 text-blue-500"></lucide-icon>
              Create Schedule
            </app-card-title>
            <app-card-description>Add a new trip schedule</app-card-description>
          </app-card-header>
          <app-card-content class="space-y-4">
            <div class="space-y-2">
              <app-label>Vehicle</app-label>
              <app-select [(ngModel)]="selectedVehicle">
                <app-select-item value="">Select a vehicle</app-select-item>
                <app-select-item *ngFor="let v of vehicles" [value]="v.id">
                  {{v.id}}
                </app-select-item>
              </app-select>
              <div *ngIf="selectedVehicle" class="text-xs text-muted-foreground p-2 bg-muted/50 rounded-md">
                <strong>Route:</strong> {{getRouteForVehicle(selectedVehicle)}}
              </div>
            </div>
            <div class="space-y-2">
              <app-label>Scheduled Time</app-label>
              <app-input
                type="time"
                [(ngModel)]="scheduledTime"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Frequency</app-label>
              <app-select [(ngModel)]="frequency">
                <app-select-item value="Single trip">Single trip</app-select-item>
                <app-select-item value="Every 10 min">Every 10 min</app-select-item>
                <app-select-item value="Every 15 min">Every 15 min</app-select-item>
                <app-select-item value="Every 20 min">Every 20 min</app-select-item>
                <app-select-item value="Every 30 min">Every 30 min</app-select-item>
                <app-select-item value="Every 45 min">Every 45 min</app-select-item>
                <app-select-item value="Every 60 min">Every 60 min</app-select-item>
              </app-select>
            </div>
            <app-button (click)="handleAddSchedule()" className="w-full">
              <lucide-icon [name]="Plus" class="h-4 w-4 mr-2"></lucide-icon>
              Create Schedule
            </app-button>
          </app-card-content>
        </app-card>

        <!-- Schedules Table -->
        <app-card class="lg:col-span-2">
          <app-card-header>
            <app-card-title>Active Schedules</app-card-title>
            <app-card-description>
              {{schedules.length}} schedules configured
            </app-card-description>
          </app-card-header>
          <app-card-content>
            <app-table>
              <app-table-header>
                <app-table-row>
                  <app-table-head>Schedule ID</app-table-head>
                  <app-table-head>Vehicle</app-table-head>
                  <app-table-head>Route</app-table-head>
                  <app-table-head>Scheduled Time</app-table-head>
                  <app-table-head>Frequency</app-table-head>
                  <app-table-head class="text-right">Actions</app-table-head>
                </app-table-row>
              </app-table-header>
              <app-table-body>
                <app-table-row *ngFor="let schedule of schedules">
                  <app-table-cell class="font-mono text-sm">{{schedule.id}}</app-table-cell>
                  <app-table-cell class="font-medium">{{schedule.vehicle}}</app-table-cell>
                  <app-table-cell class="max-w-[180px] truncate text-xs text-muted-foreground">{{schedule.route}}</app-table-cell>
                  <app-table-cell>{{schedule.scheduledTime}}</app-table-cell>
                  <app-table-cell>{{schedule.frequency}}</app-table-cell>
                  <app-table-cell class="text-right">
                    <app-button
                      variant="outline"
                      size="icon"
                      (click)="handleDelete(schedule.id)"
                    >
                      <lucide-icon [name]="Trash2" class="h-4 w-4 text-rose-500"></lucide-icon>
                    </app-button>
                  </app-table-cell>
                </app-table-row>
              </app-table-body>
            </app-table>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `,
})
export class SchedulesComponent {
    readonly Plus = Plus;
    readonly Calendar = Calendar;
    readonly Trash2 = Trash2;

    vehicles = [
        { id: "BUS-1234", route: "Route 42 - Downtown Express" },
        { id: "BUS-1235", route: "Route 15 - Airport Shuttle" },
        { id: "BUS-1236", route: "Route 28 - University Line" },
        { id: "BUS-1237", route: "Route 7 - Central Loop" },
        { id: "BUS-1238", route: "Route 33 - Suburban Connect" },
        { id: "BUS-1239", route: "Route 42 - Downtown Express" },
    ];

    schedules: Schedule[] = [
        { id: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00", frequency: "Every 15 min" },
        { id: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30", frequency: "Every 30 min" },
        { id: "S003", vehicle: "BUS-1236", route: "Route 28 - University Line", scheduledTime: "07:00", frequency: "Every 20 min" },
        { id: "S004", vehicle: "BUS-1237", route: "Route 7 - Central Loop", scheduledTime: "06:15", frequency: "Every 10 min" },
        { id: "S005", vehicle: "BUS-1238", route: "Route 33 - Suburban Connect", scheduledTime: "07:30", frequency: "Every 45 min" },
        { id: "S006", vehicle: "BUS-1239", route: "Route 42 - Downtown Express", scheduledTime: "06:00", frequency: "Every 15 min" },
        { id: "S007", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "08:00", frequency: "Every 15 min" },
        { id: "S008", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "09:00", frequency: "Every 30 min" },
    ];

    selectedVehicle = "";
    scheduledTime = "";
    frequency = "Single trip";

    getRouteForVehicle(vehicleId: string) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        return vehicle?.route || "Unknown Route";
    }

    handleAddSchedule() {
        if (this.selectedVehicle && this.scheduledTime) {
            const newSchedule: Schedule = {
                id: `S${String(this.schedules.length + 1).padStart(3, "0")}`,
                vehicle: this.selectedVehicle,
                route: this.getRouteForVehicle(this.selectedVehicle),
                scheduledTime: this.scheduledTime,
                frequency: this.frequency || "Single trip",
            };
            this.schedules = [...this.schedules, newSchedule];
            this.selectedVehicle = "";
            this.scheduledTime = "";
            this.frequency = "Single trip";
        }
    }

    handleDelete(id: string) {
        this.schedules = this.schedules.filter(s => s.id !== id);
    }
}
