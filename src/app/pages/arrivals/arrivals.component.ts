import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    Plus,
    Clock,
    AlertTriangle,
    CheckCircle
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

interface ArrivalLog {
    id: string;
    scheduleId: string;
    vehicle: string;
    route: string;
    scheduledTime: string;
    actualTime: string;
    delayMinutes: number;
    date: string;
}

interface Schedule {
    id: string;
    vehicle: string;
    route: string;
    scheduledTime: string;
}

@Component({
    selector: 'app-arrivals',
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
        BadgeComponent
    ],
    template: `
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Arrival Logging</h2>
        <p class="text-muted-foreground">Record actual arrival times and track delays</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-3">
        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium text-slate-500">Total Logs Today</app-card-title>
            <lucide-icon [name]="Clock" class="h-4 w-4 text-slate-400"></lucide-icon>
          </app-card-header>
          <app-card-content>
            <div class="text-2xl font-bold">{{getTodayLogsCount()}}</div>
          </app-card-content>
        </app-card>
        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium text-slate-500">On-Time Arrivals</app-card-title>
            <lucide-icon [name]="CheckCircle" class="h-4 w-4 text-emerald-400"></lucide-icon>
          </app-card-header>
          <app-card-content>
            <div class="text-2xl font-bold text-emerald-600">{{getOnTimeCount()}}</div>
          </app-card-content>
        </app-card>
        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium text-slate-500">Average Delay</app-card-title>
            <lucide-icon [name]="AlertTriangle" class="h-4 w-4 text-amber-400"></lucide-icon>
          </app-card-header>
          <app-card-content>
            <div class="text-2xl font-bold">{{getAvgDelay()}} min</div>
          </app-card-content>
        </app-card>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Log Arrival Form -->
        <app-card class="lg:col-span-1 border-t-4 border-t-blue-500">
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="Clock" class="h-5 w-5 text-blue-500"></lucide-icon>
              Log Arrival
            </app-card-title>
            <app-card-description>Record actual arrival time</app-card-description>
          </app-card-header>
          <app-card-content class="space-y-4">
            <div class="space-y-2">
              <app-label>Schedule</app-label>
              <app-select [(ngModel)]="selectedScheduleId">
                <app-select-item value="">Select a schedule</app-select-item>
                <app-select-item *ngFor="let s of schedules" [value]="s.id">
                  {{s.vehicle}} - {{s.scheduledTime}}
                </app-select-item>
              </app-select>
              <div *ngIf="selectedScheduleId" class="text-xs text-muted-foreground space-y-1 p-2 bg-muted/50 rounded-md">
                <p><strong>Route:</strong> {{getScheduleDetails(selectedScheduleId)?.route}}</p>
                <p><strong>Scheduled:</strong> {{getScheduleDetails(selectedScheduleId)?.scheduledTime}}</p>
              </div>
            </div>
            <div class="space-y-2">
              <app-label>Actual Arrival Time</app-label>
              <app-input
                type="time"
                [(ngModel)]="actualTime"
              ></app-input>
            </div>
            <app-button (click)="handleSubmitLog()" className="w-full">
              <lucide-icon [name]="Plus" class="h-4 w-4 mr-2"></lucide-icon>
              Submit Log
            </app-button>
          </app-card-content>
        </app-card>

        <!-- Recent Logs Table -->
        <app-card class="lg:col-span-2">
          <app-card-header>
            <app-card-title>Recent Arrival Logs</app-card-title>
            <app-card-description>
              {{logs.length}} logs recorded
            </app-card-description>
          </app-card-header>
          <app-card-content>
            <app-table>
              <app-table-header>
                <app-table-row>
                  <app-table-head>Date</app-table-head>
                  <app-table-head>Vehicle</app-table-head>
                  <app-table-head>Scheduled</app-table-head>
                  <app-table-head>Actual</app-table-head>
                  <app-table-head>Delay</app-table-head>
                  <app-table-head class="text-right">Status</app-table-head>
                </app-table-row>
              </app-table-header>
              <app-table-body>
                <app-table-row *ngFor="let log of logs">
                  <app-table-cell class="font-mono text-xs">{{log.date}}</app-table-cell>
                  <app-table-cell class="font-medium">{{log.vehicle}}</app-table-cell>
                  <app-table-cell>{{log.scheduledTime}}</app-table-cell>
                  <app-table-cell>{{log.actualTime}}</app-table-cell>
                  <app-table-cell [className]="log.delayMinutes > 0 ? 'text-rose-600 font-medium' : 'text-emerald-600 font-medium'">
                    {{log.delayMinutes > 0 ? '+' : ''}}{{log.delayMinutes}} min
                  </app-table-cell>
                  <app-table-cell class="text-right">
                    <app-badge [className]="getDelayBadgeClass(log.delayMinutes)" [variant]="log.delayMinutes > 10 ? 'destructive' : 'default'">
                      {{getDelayStatusText(log.delayMinutes)}}
                    </app-badge>
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
export class ArrivalsComponent {
    readonly Plus = Plus;
    readonly Clock = Clock;
    readonly AlertTriangle = AlertTriangle;
    readonly CheckCircle = CheckCircle;

    schedules: Schedule[] = [
        { id: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00" },
        { id: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30" },
        { id: "S003", vehicle: "BUS-1236", route: "Route 28 - University Line", scheduledTime: "07:00" },
        { id: "S004", vehicle: "BUS-1237", route: "Route 7 - Central Loop", scheduledTime: "06:15" },
        { id: "S005", vehicle: "BUS-1238", route: "Route 33 - Suburban Connect", scheduledTime: "07:30" },
        { id: "S006", vehicle: "BUS-1239", route: "Route 42 - Downtown Express", scheduledTime: "08:00" },
    ];

    logs: ArrivalLog[] = [
        { id: "L001", scheduleId: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00", actualTime: "06:08", delayMinutes: 8, date: "2025-02-04" },
        { id: "L002", scheduleId: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30", actualTime: "06:32", delayMinutes: 2, date: "2025-02-04" },
        { id: "L003", scheduleId: "S003", vehicle: "BUS-1236", route: "Route 28 - University Line", scheduledTime: "07:00", actualTime: "07:15", delayMinutes: 15, date: "2025-02-04" },
        { id: "L004", scheduleId: "S004", vehicle: "BUS-1237", route: "Route 7 - Central Loop", scheduledTime: "06:15", actualTime: "06:14", delayMinutes: -1, date: "2025-02-04" },
        { id: "L005", scheduleId: "S005", vehicle: "BUS-1238", route: "Route 33 - Suburban Connect", scheduledTime: "07:30", actualTime: "07:35", delayMinutes: 5, date: "2025-02-04" },
        { id: "L006", scheduleId: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00", actualTime: "06:12", delayMinutes: 12, date: "2025-02-03" },
        { id: "L007", scheduleId: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30", actualTime: "06:28", delayMinutes: -2, date: "2025-02-03" },
    ];

    selectedScheduleId: string = "";
    actualTime: string = "";

    getScheduleDetails(id: string) {
        return this.schedules.find(s => s.id === id);
    }

    calculateDelay(scheduled: string, actual: string): number {
        const [schHours, schMins] = scheduled.split(":").map(Number);
        const [actHours, actMins] = actual.split(":").map(Number);
        const schTotal = schHours * 60 + schMins;
        const actTotal = actHours * 60 + actMins;
        return actTotal - schTotal;
    }

    handleSubmitLog() {
        if (this.selectedScheduleId && this.actualTime) {
            const schedule = this.getScheduleDetails(this.selectedScheduleId);
            if (schedule) {
                const delay = this.calculateDelay(schedule.scheduledTime, this.actualTime);
                const newLog: ArrivalLog = {
                    id: `L${String(this.logs.length + 1).padStart(3, "0")}`,
                    scheduleId: this.selectedScheduleId,
                    vehicle: schedule.vehicle,
                    route: schedule.route,
                    scheduledTime: schedule.scheduledTime,
                    actualTime: this.actualTime,
                    delayMinutes: delay,
                    date: new Date().toISOString().split("T")[0],
                };
                this.logs = [newLog, ...this.logs];
                this.selectedScheduleId = "";
                this.actualTime = "";
            }
        }
    }

    getTodayLogsCount() {
        const today = "2025-02-04"; // Hardcoded for demo parity with React
        return this.logs.filter(l => l.date === today).length;
    }

    getOnTimeCount() {
        return this.logs.filter(l => l.delayMinutes <= 0).length;
    }

    getAvgDelay() {
        if (this.logs.length === 0) return "0";
        const totalDelay = this.logs.reduce((sum, l) => sum + Math.max(0, l.delayMinutes), 0);
        return (totalDelay / this.logs.length).toFixed(1);
    }

    getDelayStatusText(delay: number) {
        if (delay <= 0) return "On Time";
        if (delay <= 5) return `Minor (${delay} min)`;
        if (delay <= 10) return `Moderate (${delay} min)`;
        return `Severe (${delay} min)`;
    }

    getDelayBadgeClass(delay: number) {
        if (delay <= 0) return "bg-emerald-500 hover:bg-emerald-600 border-none";
        if (delay <= 5) return "bg-blue-500 hover:bg-blue-600 border-none";
        if (delay <= 10) return "bg-amber-500 hover:bg-amber-600 border-none";
        return ""; // Default variant handles 'Severe'
    }
}
