"use client";

import {
  TrendingUp,
  TrendingDown,
  Clock,
  Route,
  Bus,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

// Mock data
const kpiData = {
  totalTrips: 12458,
  avgDelay: 4.2,
  mostDelayedRoute: "Route 42 - Downtown Express",
  onTimePerformance: 87.3,
};

const routeDelayData = [
  { route: "Route 42", delay: 8.5 },
  { route: "Route 15", delay: 6.2 },
  { route: "Route 28", delay: 5.8 },
  { route: "Route 7", delay: 4.1 },
  { route: "Route 33", delay: 3.5 },
  { route: "Route 19", delay: 2.8 },
];

const hourlyDelayData = [
  { hour: "6AM", delay: 2.1 },
  { hour: "7AM", delay: 5.8 },
  { hour: "8AM", delay: 8.2 },
  { hour: "9AM", delay: 6.5 },
  { hour: "10AM", delay: 3.2 },
  { hour: "11AM", delay: 2.8 },
  { hour: "12PM", delay: 3.5 },
  { hour: "1PM", delay: 4.1 },
  { hour: "2PM", delay: 3.8 },
  { hour: "3PM", delay: 4.5 },
  { hour: "4PM", delay: 6.2 },
  { hour: "5PM", delay: 9.1 },
  { hour: "6PM", delay: 7.8 },
  { hour: "7PM", delay: 4.2 },
  { hour: "8PM", delay: 2.5 },
];

const dailyTrendData = [
  { day: "Mon", delay: 4.2, trips: 1850 },
  { day: "Tue", delay: 3.8, trips: 1920 },
  { day: "Wed", delay: 4.5, trips: 1880 },
  { day: "Thu", delay: 5.1, trips: 1950 },
  { day: "Fri", delay: 6.2, trips: 2100 },
  { day: "Sat", delay: 2.8, trips: 1200 },
  { day: "Sun", delay: 2.1, trips: 900 },
];

const summaryTableData = [
  { route: "Route 42 - Downtown Express", avgDelay: 8.5, reliability: 72 },
  { route: "Route 15 - Airport Shuttle", avgDelay: 6.2, reliability: 78 },
  { route: "Route 28 - University Line", avgDelay: 5.8, reliability: 81 },
  { route: "Route 7 - Central Loop", avgDelay: 4.1, reliability: 86 },
  { route: "Route 33 - Suburban Connect", avgDelay: 3.5, reliability: 89 },
  { route: "Route 19 - Harbor Express", avgDelay: 2.8, reliability: 92 },
];

const chartConfigBar: ChartConfig = {
  delay: {
    label: "Avg Delay (min)",
    color: "var(--chart-1)",
  },
};

const chartConfigLine: ChartConfig = {
  delay: {
    label: "Delay (min)",
    color: "var(--chart-2)",
  },
};

const chartConfigArea: ChartConfig = {
  delay: {
    label: "Delay",
    color: "var(--chart-1)",
  },
  trips: {
    label: "Trips",
    color: "var(--chart-2)",
  },
};

function getReliabilityBadge(score: number) {
  if (score >= 90) return <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>;
  if (score >= 80) return <Badge className="bg-blue-500 hover:bg-blue-600">Good</Badge>;
  if (score >= 70) return <Badge className="bg-yellow-500 hover:bg-yellow-600">Fair</Badge>;
  return <Badge variant="destructive">Poor</Badge>;
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips Recorded</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalTrips.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Delay</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.avgDelay} min</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-green-500" />
              <span className="text-green-500">-0.8 min</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Delayed Route</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Route 42</div>
            <p className="text-xs text-muted-foreground">
              Downtown Express - 8.5 min avg delay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.onTimePerformance}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Route-wise delay bar chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Route-wise Delays</CardTitle>
            <CardDescription>Average delay by route (minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBar} className="h-[250px] w-full aspect-auto">
              <BarChart data={routeDelayData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="route" type="category" tickLine={false} axisLine={false} width={70} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="delay" fill="var(--chart-1)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hour-wise delay line chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Hourly Delay Pattern</CardTitle>
            <CardDescription>Average delay throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigLine} className="h-[250px] w-full aspect-auto">
              <LineChart data={hourlyDelayData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="delay"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily trend area chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly Trend</CardTitle>
            <CardDescription>Delay and trip volume by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigArea} className="h-[250px] w-full aspect-auto">
              <AreaChart data={dailyTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="delay"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Performance Summary</CardTitle>
          <CardDescription>
            Overview of route delays and reliability scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead className="text-right">Avg Delay (min)</TableHead>
                <TableHead className="text-right">Reliability Score</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryTableData.map((row) => (
                <TableRow key={row.route}>
                  <TableCell className="font-medium">{row.route}</TableCell>
                  <TableCell className="text-right">{row.avgDelay}</TableCell>
                  <TableCell className="text-right">{row.reliability}%</TableCell>
                  <TableCell className="text-right">
                    {getReliabilityBadge(row.reliability)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
