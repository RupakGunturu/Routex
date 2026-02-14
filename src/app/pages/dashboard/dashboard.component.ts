import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  TrendingUp,
  TrendingDown,
  Clock,
  Route,
  Bus,
  CheckCircle
} from 'lucide-angular';
import {
  NgApexchartsModule, ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexGrid,
  ApexMarkers,
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    NgApexchartsModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
  ],
  styles: [
    `
    :host { display: block; }
    .kpi-number { font-size: 2.25rem; font-weight: 700; line-height: 1; }
    .kpi-delta { color: #10b981; font-weight: 600; }
    .app-card { border-radius: 12px; }
    .card-header-tight { padding-bottom: 0.25rem; }
    .badge-excellent { background-color: #10b981; color: white; }
    .badge-good { background-color: #3b82f6; color: white; }
    .badge-fair { background-color: #f59e0b; color: white; }
    .badge-poor { background-color: #ef4444; color: white; }
    @media (min-width: 1024px) {
      .kpi-number { font-size: 2.5rem; }
    }
    `
  ],
  template: `
    <div class="space-y-6">
      <!-- KPI Cards -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
        <app-card class="overflow-hidden border-t-4 border-t-blue-600 app-card flex flex-col h-full">
          <app-card-header class="flex flex-row items-center justify-between space-y-0 card-header-tight">
            <app-card-title class="text-xs font-bold tracking-tight text-slate-500">Total Trips Recorded</app-card-title>
            <div class="rounded-full bg-blue-50 p-2 dark:bg-blue-900/20">
              <lucide-icon [name]="Bus" class="h-4 w-4 text-blue-600 dark:text-blue-400"></lucide-icon>
            </div>
          </app-card-header>
          <app-card-content class="flex-1 flex flex-col justify-between">
            <div class="kpi-number">{{kpiData.totalTrips.toLocaleString()}}</div>
            <p class="mt-1 text-xs text-muted-foreground flex items-center gap-2">
              <lucide-icon [name]="TrendingUp" class="h-3 w-3 text-emerald-500"></lucide-icon>
              <span class="kpi-delta">+12%</span>
              <span class="text-muted-foreground">from last month</span>
            </p>
          </app-card-content>
        </app-card>

        <app-card class="overflow-hidden border-t-4 border-t-emerald-500 app-card flex flex-col h-full">
          <app-card-header class="flex flex-row items-center justify-between space-y-0 card-header-tight">
            <app-card-title class="text-xs font-bold tracking-tight text-slate-500">Average Delay</app-card-title>
            <div class="rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
              <lucide-icon [name]="Clock" class="h-4 w-4 text-emerald-600 dark:text-emerald-400"></lucide-icon>
            </div>
          </app-card-header>
          <app-card-content class="flex-1 flex flex-col justify-between">
            <div class="kpi-number">{{kpiData.avgDelay}} <span class="text-lg font-medium text-muted-foreground">min</span></div>
            <p class="mt-1 text-xs text-muted-foreground flex items-center gap-2">
              <lucide-icon [name]="TrendingDown" class="h-3 w-3 text-emerald-500"></lucide-icon>
              <span class="kpi-delta">-0.8 min</span>
              <span class="text-muted-foreground">from last month</span>
            </p>
          </app-card-content>
        </app-card>

        <app-card class="overflow-hidden border-t-4 border-t-orange-500 app-card flex flex-col h-full">
          <app-card-header class="flex flex-row items-center justify-between space-y-0 card-header-tight">
            <app-card-title class="text-xs font-bold tracking-tight text-slate-500">Most Delayed Route</app-card-title>
            <div class="rounded-full bg-orange-50 p-2 dark:bg-orange-900/20">
              <lucide-icon [name]="Route" class="h-4 w-4 text-orange-600 dark:text-orange-400"></lucide-icon>
            </div>
          </app-card-header>
          <app-card-content class="flex-1 flex flex-col justify-between">
            <div class="kpi-number">Route 42</div>
            <p class="mt-1 text-xs text-muted-foreground">Downtown Express - 8.5 min avg</p>
          </app-card-content>
        </app-card>

        <app-card class="overflow-hidden border-t-4 border-t-emerald-500 app-card flex flex-col h-full">
          <app-card-header class="flex flex-row items-center justify-between space-y-0 card-header-tight">
            <app-card-title class="text-xs font-bold tracking-tight text-slate-500">On-Time Rate</app-card-title>
            <div class="rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
              <lucide-icon [name]="CheckCircle" class="h-4 w-4 text-emerald-600 dark:text-emerald-400"></lucide-icon>
            </div>
          </app-card-header>
          <app-card-content class="flex-1 flex flex-col justify-between">
            <div class="kpi-number">{{kpiData.onTimePerformance}}%</div>
            <p class="mt-1 text-xs text-muted-foreground flex items-center gap-2">
              <lucide-icon [name]="TrendingUp" class="h-3 w-3 text-emerald-500"></lucide-icon>
              <span class="kpi-delta">+2.1%</span>
              <span class="text-muted-foreground">from last month</span>
            </p>
          </app-card-content>
        </app-card>
      </div>

      <!-- Charts Section -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Route-wise delay bar chart -->
        <app-card class="col-span-1">
          <app-card-header>
            <app-card-title>Route-wise Delays</app-card-title>
            <app-card-description>Average delay by route (minutes)</app-card-description>
          </app-card-header>
          <app-card-content>
            <div class="h-[250px] w-full">
              <apx-chart
                [series]="barChartOptions.series!"
                [chart]="barChartOptions.chart!"
                [xaxis]="barChartOptions.xaxis!"
                [plotOptions]="barChartOptions.plotOptions!"
                [colors]="barChartOptions.colors!"
                [dataLabels]="barChartOptions.dataLabels!"
                [grid]="barChartOptions.grid!"
              ></apx-chart>
            </div>
          </app-card-content>
        </app-card>

        <!-- Hour-wise delay line chart -->
        <app-card class="col-span-1">
          <app-card-header>
            <app-card-title>Hourly Delay Pattern</app-card-title>
            <app-card-description>Average delay throughout the day</app-card-description>
          </app-card-header>
          <app-card-content>
            <div class="h-[250px] w-full">
              <apx-chart
                [series]="lineChartOptions.series!"
                [chart]="lineChartOptions.chart!"
                [xaxis]="lineChartOptions.xaxis!"
                [stroke]="lineChartOptions.stroke!"
                [colors]="lineChartOptions.colors!"
                [dataLabels]="lineChartOptions.dataLabels!"
                [grid]="lineChartOptions.grid!"
                [markers]="lineChartOptions.markers!"
              ></apx-chart>
            </div>
          </app-card-content>
        </app-card>

        <!-- Daily trend area chart -->
        <app-card class="col-span-1">
          <app-card-header>
            <app-card-title>Weekly Trend</app-card-title>
            <app-card-description>Delay trend by day</app-card-description>
          </app-card-header>
          <app-card-content>
            <div class="h-[250px] w-full">
              <apx-chart
                [series]="areaChartOptions.series!"
                [chart]="areaChartOptions.chart!"
                [xaxis]="areaChartOptions.xaxis!"
                [stroke]="areaChartOptions.stroke!"
                [colors]="areaChartOptions.colors!"
                [fill]="areaChartOptions.fill!"
                [dataLabels]="areaChartOptions.dataLabels!"
                [grid]="areaChartOptions.grid!"
              ></apx-chart>
            </div>
          </app-card-content>
        </app-card>
      </div>

      <!-- Summary Table -->
      <app-card>
        <app-card-header>
          <app-card-title>Route Performance Summary</app-card-title>
          <app-card-description>
            Overview of route delays and reliability scores
          </app-card-description>
        </app-card-header>
        <app-card-content>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-700">
                  <th class="px-4 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Route</th>
                  <th class="px-4 py-4 text-center font-semibold text-slate-700 dark:text-slate-300">Avg Delay (min)</th>
                  <th class="px-4 py-4 text-center font-semibold text-slate-700 dark:text-slate-300">Reliability Score</th>
                  <th class="px-4 py-4 text-right font-semibold text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of summaryTableData" class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td class="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">{{row.route}}</td>
                  <td class="px-4 py-4 text-center font-medium text-slate-900 dark:text-slate-100">{{row.avgDelay}}</td>
                  <td class="px-4 py-4 text-center font-medium text-slate-900 dark:text-slate-100">{{row.reliability}}%</td>
                  <td class="px-4 py-4 text-right">
                    <span [ngClass]="row.reliability >= 90 ? 'badge-excellent' : 
                                     row.reliability >= 80 ? 'badge-good' : 
                                     row.reliability >= 70 ? 'badge-fair' : 'badge-poor'"
                          class="inline-block px-3 py-1 rounded-full text-sm font-medium">
                      {{getReliabilityStatus(row.reliability)}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </app-card-content>
      </app-card>
    </div>
  `,
})
export class DashboardComponent {
  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly Clock = Clock;
  readonly Route = Route;
  readonly Bus = Bus;
  readonly CheckCircle = CheckCircle;

  kpiData = {
    totalTrips: 12458,
    avgDelay: 4.2,
    mostDelayedRoute: "Route 42 - Downtown Express",
    onTimePerformance: 87.3,
  };

  summaryTableData = [
    { route: "Route 42 - Downtown Express", avgDelay: 8.5, reliability: 72 },
    { route: "Route 15 - Airport Shuttle", avgDelay: 6.2, reliability: 78 },
    { route: "Route 28 - University Line", avgDelay: 5.8, reliability: 81 },
    { route: "Route 7 - Central Loop", avgDelay: 4.1, reliability: 86 },
    { route: "Route 33 - Suburban Connect", avgDelay: 3.5, reliability: 89 },
    { route: "Route 19 - Harbor Express", avgDelay: 2.8, reliability: 92 },
  ];

  barChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    plotOptions: ApexPlotOptions;
    colors: string[];
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
  } = {
      series: [{ name: "Avg Delay (min)", data: [8.5, 6.2, 5.8, 4.1, 3.5, 2.8] }],
      chart: { type: "bar", height: 250, toolbar: { show: false }, fontFamily: 'inherit' },
      plotOptions: { bar: { horizontal: true, borderRadius: 3, barHeight: '50%' } },
      colors: ["#0258a5"],
      dataLabels: { enabled: false },
      xaxis: { categories: ["Route 42", "Route 15", "Route 28", "Route 7", "Route 33", "Route 19"] },
      grid: { borderColor: "#f1f1f1", strokeDashArray: 4 }
    };

  lineChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    colors: string[];
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    markers: ApexMarkers;
  } = {
      series: [{ name: "Delay (min)", data: [2.1, 5.8, 8.2, 6.5, 3.2, 2.8, 3.5, 4.1, 3.8, 4.5, 6.2, 9.1, 7.8, 4.2, 2.5] }],
      chart: { type: "line", height: 250, toolbar: { show: false }, fontFamily: 'inherit' },
      stroke: { curve: "smooth", width: 2 },
      colors: ["#10b981"],
      dataLabels: { enabled: false },
      xaxis: { categories: ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"] },
      grid: { borderColor: "#f1f1f1", strokeDashArray: 4 },
      markers: { size: 4, strokeWidth: 2, hover: { size: 6 } }
    };

  areaChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    fill: ApexFill;
    colors: string[];
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
  } = {
      series: [{ name: "Delay", data: [4.2, 3.8, 4.5, 5.1, 6.2, 2.8, 2.1] }],
      chart: { type: "area", height: 250, toolbar: { show: false }, fontFamily: 'inherit' },
      stroke: { curve: "smooth", width: 2 },
      fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] } },
      colors: ["#3b82f6"],
      dataLabels: { enabled: false },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
      grid: { borderColor: "#f1f1f1", strokeDashArray: 4 }
    };

  getReliabilityStatus(score: number) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Poor";
  }

}
