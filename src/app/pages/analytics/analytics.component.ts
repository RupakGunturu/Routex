import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Filter,
  TrendingUp,
  AlertTriangle,
  Trophy
} from 'lucide-angular';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexGrid,
  ApexDataLabels
} from "ng-apexcharts";
import { AppSidebarComponent } from '../../components/app-sidebar/app-sidebar.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent
} from '../../components/ui/card/card.component';
import { LabelComponent } from '../../components/ui/label/label.component';
import { SelectComponent, SelectItemComponent, SliderComponent } from '../../components/ui/select/select.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    NgApexchartsModule,
    AppSidebarComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    LabelComponent,
    SelectComponent,
    SelectItemComponent,
    SliderComponent
  ],
  template: `
    <app-sidebar-root>
      <div class="space-y-8">
        <div class="flex flex-col gap-1">
          <h2 class="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Analytics & Insights</h2>
          <p class="text-slate-500 dark:text-slate-400">Deep dive into delay patterns and performance metrics</p>
        </div>

        <!-- Filter Panel -->
        <app-card class="bg-slate-50/50 dark:bg-slate-900/50 border-dashed">
          <app-card-header>
            <app-card-title class="flex items-center gap-2 text-base">
              <lucide-icon [name]="Filter" class="h-4 w-4 text-blue-600"></lucide-icon>
              Filters
            </app-card-title>
          </app-card-header>
          <app-card-content>
            <div class="grid gap-8 md:grid-cols-3">
              <div class="space-y-2.5">
                <app-label class="text-xs font-bold uppercase tracking-wider text-slate-500">Route Selection</app-label>
                <app-select [(ngModel)]="selectedRoute">
                  <app-select-item *ngFor="let route of routes" [value]="route">{{route}}</app-select-item>
                </app-select>
              </div>
              <div class="space-y-2.5">
                <app-label class="text-xs font-bold uppercase tracking-wider text-slate-500">Timeframe</app-label>
                <app-select [(ngModel)]="selectedDateRange">
                  <app-select-item value="today">Today</app-select-item>
                  <app-select-item value="last7">Last 7 Days</app-select-item>
                  <app-select-item value="last30">Last 30 Days</app-select-item>
                  <app-select-item value="last90">Last 90 Days</app-select-item>
                </app-select>
              </div>
              <div class="space-y-4">
                <app-label class="text-xs font-bold uppercase tracking-wider text-slate-500">Time Window: {{timeRange[0]}}:00 - {{timeRange[1] || 24}}:00</app-label>
                <div class="pt-2">
                  <app-slider [(ngModel)]="timeRange" [min]="0" [max]="24" [step]="1"></app-slider>
                </div>
              </div>
            </div>
          </app-card-content>
        </app-card>

        <!-- Peak Delay Heatmap -->
        <app-card>
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="TrendingUp" class="h-5 w-5 text-indigo-500"></lucide-icon>
              Peak Delay Heatmap
            </app-card-title>
            <app-card-description>Average delays by hour and day of week (minutes)</app-card-description>
          </app-card-header>
          <app-card-content>
            <div class="overflow-x-auto -mx-6 px-6">
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="p-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Hour</th>
                    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Mon</th>
                    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Tue</th>
                    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Wed</th>
                    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Thu</th>
                    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Fri</th>
                    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Sat</th>
                    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Sun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of heatmapData" class="border-t border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    <td class="p-3 font-semibold text-xs text-slate-700 dark:text-slate-300">{{row.hour}}</td>
                    <td class="p-1.5"><div [class]="'heat-cell ' + getHeatLevel(row.mon)">{{row.mon}}</div></td>
                    <td class="p-1.5"><div [class]="'heat-cell ' + getHeatLevel(row.tue)">{{row.tue}}</div></td>
                    <td class="p-1.5"><div [class]="'heat-cell ' + getHeatLevel(row.wed)">{{row.wed}}</div></td>
                    <td class="p-1.5"><div [class]="'heat-cell ' + getHeatLevel(row.thu)">{{row.thu}}</div></td>
                    <td class="p-1.5"><div [class]="'heat-cell ' + getHeatLevel(row.fri)">{{row.fri}}</div></td>
                    <td class="p-1.5"><div [class]="'heat-cell ' + getHeatLevel(row.sat)">{{row.sat}}</div></td>
                    <td class="p-1.5"><div [class]="'heat-cell ' + getHeatLevel(row.sun)">{{row.sun}}</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/50 text-xs font-medium text-slate-500">
              <span class="font-bold uppercase tracking-tighter">Delay Intensity:</span>
              <div class="flex items-center gap-2"><div class="w-4 h-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-sm"></div><span>0-2 min</span></div>
              <div class="flex items-center gap-2"><div class="w-4 h-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-sm"></div><span>4-6 min</span></div>
              <div class="flex items-center gap-2"><div class="w-4 h-4 bg-orange-200 dark:bg-orange-900/40 rounded-sm"></div><span>8-10 min</span></div>
              <div class="flex items-center gap-2"><div class="w-4 h-4 bg-rose-500 rounded-sm"></div><span>10+ min</span></div>
            </div>
          </app-card-content>
        </app-card>

        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Worst Performing Routes -->
          <app-card>
            <app-card-header>
              <app-card-title class="flex items-center gap-2 text-base">
                <lucide-icon [name]="AlertTriangle" class="h-5 w-5 text-rose-500"></lucide-icon>
                Critical Route Delays
              </app-card-title>
              <app-card-description>Routes requiring immediate attention</app-card-description>
            </app-card-header>
            <app-card-content>
              <div class="h-[300px] w-full">
                <apx-chart
                  [series]="worstRoutesOptions.series!"
                  [chart]="worstRoutesOptions.chart!"
                  [xaxis]="worstRoutesOptions.xaxis!"
                  [plotOptions]="worstRoutesOptions.plotOptions!"
                  [colors]="worstRoutesOptions.colors!"
                  [dataLabels]="worstRoutesOptions.dataLabels!"
                  [grid]="worstRoutesOptions.grid!"
                ></apx-chart>
              </div>
            </app-card-content>
          </app-card>

          <!-- Vehicle Reliability Ranking -->
          <app-card>
            <app-card-header>
              <app-card-title class="flex items-center gap-2 text-base">
                <lucide-icon [name]="Trophy" class="h-5 w-5 text-amber-500"></lucide-icon>
                Fleet Performance Leaderboard
              </app-card-title>
              <app-card-description>Ranking vehicles by reliability and on-time performance</app-card-description>
            </app-card-header>
            <app-card-content>
              <div class="space-y-6">
                <div *ngFor="let vehicle of vehicleRanking; let i = index" class="group flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-600 dark:text-slate-400">
                    {{i + 1}}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="font-bold text-slate-700 dark:text-slate-200">{{vehicle.vehicle}}</span>
                      <span class="text-xs font-medium text-slate-500">
                        {{vehicle.onTime}} / {{vehicle.totalTrips}} trips
                      </span>
                    </div>
                    <div class="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-blue-500 rounded-full transition-all duration-500"
                        [style.width.%]="vehicle.reliability"
                      ></div>
                    </div>
                  </div>
                  <div class="w-16 text-right shrink-0">
                    <span [class]="getReliabilityTextClass(vehicle.reliability)" class="text-sm">
                      {{vehicle.reliability}}%
                    </span>
                  </div>
                </div>
              </div>
            </app-card-content>
          </app-card>
        </div>
      </div>
    </app-sidebar-root>
  `,
})
export class AnalyticsComponent {
  readonly Filter = Filter;
  readonly TrendingUp = TrendingUp;
  readonly AlertTriangle = AlertTriangle;
  readonly Trophy = Trophy;

  selectedRoute = "All Routes";
  selectedDateRange = "last7";
  timeRange: number[] = [6, 20];

  routes = [
    "All Routes",
    "Route 42 - Downtown Express",
    "Route 15 - Airport Shuttle",
    "Route 28 - University Line",
    "Route 7 - Central Loop",
    "Route 33 - Suburban Connect",
  ];

  heatmapData = [
    { hour: "6AM", mon: 2, tue: 1, wed: 2, thu: 3, fri: 4, sat: 1, sun: 1 },
    { hour: "7AM", mon: 5, tue: 4, wed: 6, thu: 5, fri: 7, sat: 2, sun: 1 },
    { hour: "8AM", mon: 9, tue: 8, wed: 10, thu: 9, fri: 12, sat: 3, sun: 2 },
    { hour: "9AM", mon: 6, tue: 5, wed: 7, thu: 6, fri: 8, sat: 2, sun: 1 },
    { hour: "10AM", mon: 3, tue: 3, wed: 4, thu: 3, fri: 5, sat: 2, sun: 1 },
    { hour: "11AM", mon: 2, tue: 2, wed: 3, thu: 2, fri: 4, sat: 2, sun: 1 },
    { hour: "12PM", mon: 3, tue: 3, wed: 4, thu: 4, fri: 5, sat: 3, sun: 2 },
    { hour: "1PM", mon: 4, tue: 3, wed: 5, thu: 4, fri: 6, sat: 2, sun: 2 },
    { hour: "2PM", mon: 3, tue: 3, wed: 4, thu: 4, fri: 5, sat: 2, sun: 1 },
    { hour: "3PM", mon: 4, tue: 4, wed: 5, thu: 5, fri: 6, sat: 2, sun: 1 },
    { hour: "4PM", mon: 6, tue: 5, wed: 7, thu: 6, fri: 8, sat: 3, sun: 2 },
    { hour: "5PM", mon: 10, tue: 9, wed: 11, thu: 10, fri: 14, sat: 4, sun: 2 },
    { hour: "6PM", mon: 8, tue: 7, wed: 9, thu: 8, fri: 11, sat: 3, sun: 2 },
    { hour: "7PM", mon: 4, tue: 4, wed: 5, thu: 4, fri: 6, sat: 2, sun: 1 },
    { hour: "8PM", mon: 2, tue: 2, wed: 3, thu: 2, fri: 4, sat: 2, sun: 1 },
  ];

  vehicleRanking = [
    { vehicle: "BUS-1234", reliability: 92, totalTrips: 245, onTime: 225 },
    { vehicle: "BUS-1237", reliability: 89, totalTrips: 238, onTime: 212 },
    { vehicle: "BUS-1235", reliability: 85, totalTrips: 220, onTime: 187 },
    { vehicle: "BUS-1239", reliability: 82, totalTrips: 198, onTime: 162 },
    { vehicle: "BUS-1238", reliability: 78, totalTrips: 210, onTime: 164 },
    { vehicle: "BUS-1236", reliability: 72, totalTrips: 185, onTime: 133 },
  ];

  worstRoutesOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    plotOptions: ApexPlotOptions;
    colors: string[];
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
  } = {
      series: [{ name: "Avg Delay", data: [12.5, 9.8, 8.2, 6.5, 5.1] }],
      chart: { type: "bar", height: 300, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, distributed: true, borderRadius: 4 } },
      colors: ["#ef4444", "#f97316", "#3b82f6", "#3b82f6", "#3b82f6"],
      dataLabels: { enabled: false },
      xaxis: { categories: ["Route 42", "Route 15", "Route 28", "Route 7", "Route 33"] },
      grid: { borderColor: "#f1f1f1" }
    };

  getHeatLevel(value: number) {
    if (value === 0) return "heat-none";
    if (value <= 3) return "heat-low";
    if (value <= 6) return "heat-mid";
    if (value <= 9) return "heat-high";
    return "heat-critical";
  }

  getRankLabel(index: number) {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    return `${index + 1}th`;
  }

  getRankBadgeClass(index: number) {
    if (index === 0) return "bg-yellow-500 hover:bg-yellow-600";
    if (index === 1) return "bg-gray-400 hover:bg-gray-500";
    if (index === 2) return "bg-amber-700 hover:bg-amber-800";
    return "";
  }

  getReliabilityTextClass(score: number) {
    let base = "font-bold ";
    if (score >= 85) return base + "text-green-600";
    if (score >= 75) return base + "text-yellow-600";
    return base + "text-red-600";
  }
}
