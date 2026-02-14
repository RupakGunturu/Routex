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
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import {
  TableComponent,
  TableBodyComponent,
  TableCellComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent
} from '../../components/ui/table/table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    NgApexchartsModule,
    AppSidebarComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    BadgeComponent,
    TableComponent,
    TableBodyComponent,
    TableCellComponent,
    TableHeadComponent,
    TableHeaderComponent,
    TableRowComponent
  ],
  template: `
    <app-sidebar-root>
      <div class="space-y-6">
        <!-- KPI Cards -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <app-card class="overflow-hidden border-t-4 border-t-blue-500">
            <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
              <app-card-title class="text-xs font-bold uppercase tracking-wider text-slate-500">Total Trips Recorded</app-card-title>
              <div class="rounded-full bg-blue-50 p-2 dark:bg-blue-900/20">
                <lucide-icon [name]="Bus" class="h-4 w-4 text-blue-600 dark:text-blue-400"></lucide-icon>
              </div>
            </app-card-header>
            <app-card-content>
              <div class="text-3xl font-bold tracking-tight">{{kpiData.totalTrips.toLocaleString()}}</div>
              <p class="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <lucide-icon [name]="TrendingUp" class="h-3 w-3 text-emerald-500"></lucide-icon>
                <span class="text-emerald-600 font-medium">+12%</span> from last month
              </p>
            </app-card-content>
          </app-card>

          <app-card class="overflow-hidden border-t-4 border-t-indigo-500">
            <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
              <app-card-title class="text-xs font-bold uppercase tracking-wider text-slate-500">Average Delay</app-card-title>
              <div class="rounded-full bg-indigo-50 p-2 dark:bg-indigo-900/20">
                <lucide-icon [name]="Clock" class="h-4 w-4 text-indigo-600 dark:text-indigo-400"></lucide-icon>
              </div>
            </app-card-header>
            <app-card-content>
              <div class="text-3xl font-bold tracking-tight">{{kpiData.avgDelay}} <span class="text-lg font-medium text-muted-foreground">min</span></div>
              <p class="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <lucide-icon [name]="TrendingDown" class="h-3 w-3 text-emerald-500"></lucide-icon>
                <span class="text-emerald-600 font-medium">-0.8 min</span> from last month
              </p>
            </app-card-content>
          </app-card>

          <app-card class="overflow-hidden border-t-4 border-t-orange-500">
            <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
              <app-card-title class="text-xs font-bold uppercase tracking-wider text-slate-500">Most Delayed Route</app-card-title>
              <div class="rounded-full bg-orange-50 p-2 dark:bg-orange-900/20">
                <lucide-icon [name]="Route" class="h-4 w-4 text-orange-600 dark:text-orange-400"></lucide-icon>
              </div>
            </app-card-header>
            <app-card-content>
              <div class="text-2xl font-bold tracking-tight truncate">Route 42</div>
              <p class="mt-1 text-xs text-muted-foreground">
                Downtown Express - 8.5 min avg
              </p>
            </app-card-content>
          </app-card>

          <app-card class="overflow-hidden border-t-4 border-t-emerald-500">
            <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
              <app-card-title class="text-xs font-bold uppercase tracking-wider text-slate-500">On-Time Rate</app-card-title>
              <div class="rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
                <lucide-icon [name]="CheckCircle" class="h-4 w-4 text-emerald-600 dark:text-emerald-400"></lucide-icon>
              </div>
            </app-card-header>
            <app-card-content>
              <div class="text-3xl font-bold tracking-tight">{{kpiData.onTimePerformance}}%</div>
              <p class="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <lucide-icon [name]="TrendingUp" class="h-3 w-3 text-emerald-500"></lucide-icon>
                <span class="text-emerald-600 font-medium">+2.1%</span> from last month
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
            <app-table>
              <app-table-header>
                <app-table-row>
                  <app-table-head>Route</app-table-head>
                  <app-table-head class="text-right">Avg Delay (min)</app-table-head>
                  <app-table-head class="text-right">Reliability Score</app-table-head>
                  <app-table-head class="text-right">Status</app-table-head>
                </app-table-row>
              </app-table-header>
              <app-table-body>
                <app-table-row *ngFor="let row of summaryTableData">
                  <app-table-cell class="font-medium">{{row.route}}</app-table-cell>
                  <app-table-cell class="text-right">{{row.avgDelay}}</app-table-cell>
                  <app-table-cell class="text-right">{{row.reliability}}%</app-table-cell>
                  <app-table-cell class="text-right">
                    <app-badge [className]="row.reliability >= 90 ? 'bg-green-500 hover:bg-green-600 border-none' : 
                                           row.reliability >= 80 ? 'bg-blue-500 hover:bg-blue-600 border-none' : 
                                           row.reliability >= 70 ? 'bg-yellow-500 hover:bg-yellow-600 border-none' : ''"
                              [variant]="row.reliability < 70 ? 'destructive' : 'default'">
                      {{getReliabilityStatus(row.reliability)}}
                    </app-badge>
                  </app-table-cell>
                </app-table-row>
              </app-table-body>
            </app-table>
          </app-card-content>
        </app-card>
      </div>
    </app-sidebar-root>
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
      plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '60%' } },
      colors: ["#3b82f6"],
      dataLabels: { enabled: true, style: { fontSize: '10px' } },
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
      stroke: { curve: "smooth", width: 3 },
      colors: ["#6366f1"],
      dataLabels: { enabled: false },
      xaxis: { categories: ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"] },
      grid: { borderColor: "#f1f1f1", strokeDashArray: 4 },
      markers: { size: 5, strokeWidth: 2, hover: { size: 7 } }
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
      stroke: { curve: "smooth", width: 3 },
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
