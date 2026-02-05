"use client";

import { useState } from "react";
import { Filter, TrendingUp, AlertTriangle, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

// Mock data for heatmap
const heatmapData = [
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

const worstRoutes = [
  { route: "Route 42", avgDelay: 12.5, trips: 450 },
  { route: "Route 15", avgDelay: 9.8, trips: 380 },
  { route: "Route 28", avgDelay: 8.2, trips: 420 },
  { route: "Route 7", avgDelay: 6.5, trips: 510 },
  { route: "Route 33", avgDelay: 5.1, trips: 290 },
];

const vehicleRanking = [
  { vehicle: "BUS-1234", reliability: 92, totalTrips: 245, onTime: 225 },
  { vehicle: "BUS-1237", reliability: 89, totalTrips: 238, onTime: 212 },
  { vehicle: "BUS-1235", reliability: 85, totalTrips: 220, onTime: 187 },
  { vehicle: "BUS-1239", reliability: 82, totalTrips: 198, onTime: 162 },
  { vehicle: "BUS-1238", reliability: 78, totalTrips: 210, onTime: 164 },
  { vehicle: "BUS-1236", reliability: 72, totalTrips: 185, onTime: 133 },
];

const routes = [
  "All Routes",
  "Route 42 - Downtown Express",
  "Route 15 - Airport Shuttle",
  "Route 28 - University Line",
  "Route 7 - Central Loop",
  "Route 33 - Suburban Connect",
];

const chartConfig: ChartConfig = {
  avgDelay: {
    label: "Average Delay",
    color: "var(--chart-3)",
  },
};

function getHeatColor(value: number) {
  if (value <= 2) return "bg-green-100 text-green-800";
  if (value <= 4) return "bg-green-200 text-green-800";
  if (value <= 6) return "bg-yellow-200 text-yellow-800";
  if (value <= 8) return "bg-orange-200 text-orange-800";
  if (value <= 10) return "bg-orange-300 text-orange-900";
  return "bg-red-400 text-white";
}

function getRankBadge(index: number) {
  if (index === 0) return <Badge className="bg-yellow-500 hover:bg-yellow-600">1st</Badge>;
  if (index === 1) return <Badge className="bg-gray-400 hover:bg-gray-500">2nd</Badge>;
  if (index === 2) return <Badge className="bg-amber-700 hover:bg-amber-800">3rd</Badge>;
  return <Badge variant="outline">{index + 1}th</Badge>;
}

export default function AnalyticsPage() {
  const [selectedRoute, setSelectedRoute] = useState("All Routes");
  const [timeRange, setTimeRange] = useState([6, 20]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics & Insights</h2>
        <p className="text-muted-foreground">Deep dive into delay patterns and performance metrics</p>
      </div>

      {/* Filter Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Route</Label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route} value={route}>
                      {route}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select defaultValue="last7">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last7">Last 7 Days</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Time Range: {timeRange[0]}:00 - {timeRange[1]}:00</Label>
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                min={0}
                max={24}
                step={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peak Delay Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Peak Delay Heatmap
          </CardTitle>
          <CardDescription>Average delays by hour and day of week (minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left font-medium">Hour</th>
                  <th className="p-2 text-center font-medium">Mon</th>
                  <th className="p-2 text-center font-medium">Tue</th>
                  <th className="p-2 text-center font-medium">Wed</th>
                  <th className="p-2 text-center font-medium">Thu</th>
                  <th className="p-2 text-center font-medium">Fri</th>
                  <th className="p-2 text-center font-medium">Sat</th>
                  <th className="p-2 text-center font-medium">Sun</th>
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row) => (
                  <tr key={row.hour}>
                    <td className="p-2 font-medium">{row.hour}</td>
                    <td className="p-1">
                      <div className={`p-2 text-center rounded ${getHeatColor(row.mon)}`}>{row.mon}</div>
                    </td>
                    <td className="p-1">
                      <div className={`p-2 text-center rounded ${getHeatColor(row.tue)}`}>{row.tue}</div>
                    </td>
                    <td className="p-1">
                      <div className={`p-2 text-center rounded ${getHeatColor(row.wed)}`}>{row.wed}</div>
                    </td>
                    <td className="p-1">
                      <div className={`p-2 text-center rounded ${getHeatColor(row.thu)}`}>{row.thu}</div>
                    </td>
                    <td className="p-1">
                      <div className={`p-2 text-center rounded ${getHeatColor(row.fri)}`}>{row.fri}</div>
                    </td>
                    <td className="p-1">
                      <div className={`p-2 text-center rounded ${getHeatColor(row.sat)}`}>{row.sat}</div>
                    </td>
                    <td className="p-1">
                      <div className={`p-2 text-center rounded ${getHeatColor(row.sun)}`}>{row.sun}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>Delay (min):</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-green-100 rounded"></div>
              <span>0-2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-yellow-200 rounded"></div>
              <span>4-6</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-orange-300 rounded"></div>
              <span>8-10</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-red-400 rounded"></div>
              <span>10+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Worst Performing Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Worst Performing Routes
            </CardTitle>
            <CardDescription>Routes with highest average delays</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={worstRoutes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickLine={false} axisLine={false} unit=" min" />
                <YAxis dataKey="route" type="category" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="avgDelay" radius={4}>
                  {worstRoutes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "var(--chart-3)" : index === 1 ? "var(--chart-5)" : "var(--chart-1)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Vehicle Reliability Ranking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Vehicle Reliability Ranking
            </CardTitle>
            <CardDescription>Top performing vehicles by on-time rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicleRanking.map((vehicle, index) => (
                <div key={vehicle.vehicle} className="flex items-center gap-4">
                  <div className="w-12">
                    {getRankBadge(index)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{vehicle.vehicle}</span>
                      <span className="text-sm text-muted-foreground">
                        {vehicle.onTime}/{vehicle.totalTrips} trips
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${vehicle.reliability}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className={`font-bold ${vehicle.reliability >= 85 ? "text-green-600" : vehicle.reliability >= 75 ? "text-yellow-600" : "text-red-600"}`}>
                      {vehicle.reliability}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
