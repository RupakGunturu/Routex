import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    FileText,
    Download,
    Filter,
    Calendar
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

interface ReportData {
    route: string;
    totalTrips: number;
    avgDelay: number;
    maxDelay: number;
    onTimeRate: number;
    reliability: "Excellent" | "Good" | "Fair" | "Poor";
}

@Component({
    selector: 'app-reports',
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
        <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Reports</h2>
        <p class="text-muted-foreground">Generate and export delay analytics reports</p>
      </div>

      <!-- Report Controls -->
      <app-card class="border-t-4 border-t-indigo-500">
        <app-card-header>
          <app-card-title class="flex items-center gap-2">
            <lucide-icon [name]="Filter" class="h-5 w-5 text-indigo-500"></lucide-icon>
            Report Parameters
          </app-card-title>
          <app-card-description>Configure report filters and date range</app-card-description>
        </app-card-header>
        <app-card-content>
          <div class="grid gap-6 md:grid-cols-4">
            <div class="space-y-2">
              <app-label>Route Filter</app-label>
              <app-select [(ngModel)]="selectedRoute">
                <app-select-item *ngFor="let route of routes" [value]="route">
                  {{route}}
                </app-select-item>
              </app-select>
            </div>
            <div class="space-y-2">
              <app-label>From Date</app-label>
              <app-input
                type="date"
                [(ngModel)]="dateFrom"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>To Date</app-label>
              <app-input
                type="date"
                [(ngModel)]="dateTo"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>&nbsp;</app-label>
              <app-button (click)="handleGenerateReport()" className="w-full" [disabled]="isGenerating">
                <lucide-icon [name]="Calendar" class="h-4 w-4 mr-2" *ngIf="!isGenerating"></lucide-icon>
                {{isGenerating ? "Generating..." : "Generate Report"}}
              </app-button>
            </div>
          </div>
        </app-card-content>
      </app-card>

      <!-- Report Summary -->
      <div *ngIf="reportGenerated" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="grid gap-4 md:grid-cols-3 mb-6">
          <app-card>
            <app-card-header class="pb-2">
              <app-card-title class="text-sm font-medium text-slate-500">Total Trips</app-card-title>
            </app-card-header>
            <app-card-content>
              <div class="text-2xl font-bold">{{getTotals().trips.toLocaleString()}}</div>
              <p class="text-xs text-muted-foreground">
                {{dateFrom}} to {{dateTo}}
              </p>
            </app-card-content>
          </app-card>
          <app-card>
            <app-card-header class="pb-2">
              <app-card-title class="text-sm font-medium text-slate-500">Average Delay</app-card-title>
            </app-card-header>
            <app-card-content>
              <div class="text-2xl font-bold">{{getTotals().avgDelay}} min</div>
              <p class="text-xs text-muted-foreground">
                Across all selected routes
              </p>
            </app-card-content>
          </app-card>
          <app-card>
            <app-card-header class="pb-2">
              <app-card-title class="text-sm font-medium text-slate-500">Maximum Delay</app-card-title>
            </app-card-header>
            <app-card-content>
              <div class="text-2xl font-bold">{{getTotals().maxDelay}} min</div>
              <p class="text-xs text-muted-foreground">
                Worst single delay recorded
              </p>
            </app-card-content>
          </app-card>
        </div>

        <!-- Report Table -->
        <app-card>
          <app-card-header>
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <app-card-title class="flex items-center gap-2">
                  <lucide-icon [name]="FileText" class="h-5 w-5 text-blue-500"></lucide-icon>
                  Delay Report
                </app-card-title>
                <app-card-description>
                  Report period: {{dateFrom}} to {{dateTo}}
                </app-card-description>
              </div>
              <div class="flex gap-2">
                <app-button variant="outline" (click)="handleExportPDF()">
                  <lucide-icon [name]="Download" class="h-4 w-4 mr-2"></lucide-icon>
                  Export PDF
                </app-button>
                <app-button variant="outline" (click)="handleExportCSV()">
                  <lucide-icon [name]="Download" class="h-4 w-4 mr-2"></lucide-icon>
                  Export CSV
                </app-button>
              </div>
            </div>
          </app-card-header>
          <app-card-content>
            <app-table>
              <app-table-header>
                <app-table-row>
                  <app-table-head>Route</app-table-head>
                  <app-table-head class="text-right">Total Trips</app-table-head>
                  <app-table-head class="text-right">Avg Delay (min)</app-table-head>
                  <app-table-head class="text-right">Max Delay (min)</app-table-head>
                  <app-table-head class="text-right">On-Time Rate</app-table-head>
                  <app-table-head class="text-right">Reliability</app-table-head>
                </app-table-row>
              </app-table-header>
              <app-table-body>
                <app-table-row *ngFor="let row of getFilteredData()">
                  <app-table-cell class="font-medium">{{row.route}}</app-table-cell>
                  <app-table-cell class="text-right">{{row.totalTrips.toLocaleString()}}</app-table-cell>
                  <app-table-cell class="text-right">{{row.avgDelay}}</app-table-cell>
                  <app-table-cell class="text-right font-mono">{{row.maxDelay}}</app-table-cell>
                  <app-table-cell class="text-right font-semibold text-blue-600">{{row.onTimeRate}}%</app-table-cell>
                  <app-table-cell class="text-right">
                    <app-badge [className]="getReliabilityBadgeClass(row.reliability)" [variant]="row.reliability === 'Poor' ? 'destructive' : 'default'">
                      {{row.reliability}}
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
export class ReportsComponent {
    readonly FileText = FileText;
    readonly Download = Download;
    readonly Filter = Filter;
    readonly Calendar = Calendar;

    reportData: ReportData[] = [
        { route: "Route 42 - Downtown Express", totalTrips: 450, avgDelay: 8.5, maxDelay: 25, onTimeRate: 72, reliability: "Fair" },
        { route: "Route 15 - Airport Shuttle", totalTrips: 380, avgDelay: 6.2, maxDelay: 18, onTimeRate: 78, reliability: "Fair" },
        { route: "Route 28 - University Line", totalTrips: 420, avgDelay: 5.8, maxDelay: 22, onTimeRate: 81, reliability: "Good" },
        { route: "Route 7 - Central Loop", totalTrips: 510, avgDelay: 4.1, maxDelay: 15, onTimeRate: 86, reliability: "Good" },
        { route: "Route 33 - Suburban Connect", totalTrips: 290, avgDelay: 3.5, maxDelay: 12, onTimeRate: 89, reliability: "Good" },
        { route: "Route 19 - Harbor Express", totalTrips: 320, avgDelay: 2.8, maxDelay: 10, onTimeRate: 92, reliability: "Excellent" },
    ];

    routes = [
        "All Routes",
        "Route 42 - Downtown Express",
        "Route 15 - Airport Shuttle",
        "Route 28 - University Line",
        "Route 7 - Central Loop",
        "Route 33 - Suburban Connect",
        "Route 19 - Harbor Express",
    ];

    selectedRoute: string = "All Routes";
    dateFrom: string = "2025-01-01";
    dateTo: string = "2025-02-04";
    isGenerating: boolean = false;
    reportGenerated: boolean = true;

    getFilteredData() {
        return this.selectedRoute === "All Routes"
            ? this.reportData
            : this.reportData.filter(r => r.route === this.selectedRoute);
    }

    getTotals() {
        const data = this.getFilteredData();
        if (data.length === 0) return { trips: 0, avgDelay: "0", maxDelay: 0 };

        return {
            trips: data.reduce((sum, r) => sum + r.totalTrips, 0),
            avgDelay: (data.reduce((sum, r) => sum + r.avgDelay, 0) / data.length).toFixed(1),
            maxDelay: Math.max(...data.map(r => r.maxDelay)),
        };
    }

    handleGenerateReport() {
        this.isGenerating = true;
        this.reportGenerated = false;
        setTimeout(() => {
            this.isGenerating = false;
            this.reportGenerated = true;
        }, 1000);
    }

    handleExportPDF() {
        alert("PDF export would be triggered here. In production, this would generate a PDF report.");
    }

    handleExportCSV() {
        const data = this.getFilteredData();
        const headers = ["Route", "Total Trips", "Avg Delay (min)", "Max Delay (min)", "On-Time Rate (%)", "Reliability"];
        const rows = data.map(r => [
            r.route,
            r.totalTrips,
            r.avgDelay,
            r.maxDelay,
            r.onTimeRate,
            r.reliability
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `delay-report-${this.dateFrom}-to-${this.dateTo}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    getReliabilityBadgeClass(reliability: ReportData["reliability"]) {
        switch (reliability) {
            case "Excellent":
                return "bg-emerald-500 hover:bg-emerald-600 border-none";
            case "Good":
                return "bg-blue-500 hover:bg-blue-600 border-none";
            case "Fair":
                return "bg-amber-500 hover:bg-amber-600 border-none";
            case "Poor":
                return ""; // Handled by destructive variant
            default:
                return "";
        }
    }
}
