"use client";

import { useState } from "react";
import { FileText, Download, Filter, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ReportData {
  route: string;
  totalTrips: number;
  avgDelay: number;
  maxDelay: number;
  onTimeRate: number;
  reliability: "Excellent" | "Good" | "Fair" | "Poor";
}

const reportData: ReportData[] = [
  { route: "Route 42 - Downtown Express", totalTrips: 450, avgDelay: 8.5, maxDelay: 25, onTimeRate: 72, reliability: "Fair" },
  { route: "Route 15 - Airport Shuttle", totalTrips: 380, avgDelay: 6.2, maxDelay: 18, onTimeRate: 78, reliability: "Fair" },
  { route: "Route 28 - University Line", totalTrips: 420, avgDelay: 5.8, maxDelay: 22, onTimeRate: 81, reliability: "Good" },
  { route: "Route 7 - Central Loop", totalTrips: 510, avgDelay: 4.1, maxDelay: 15, onTimeRate: 86, reliability: "Good" },
  { route: "Route 33 - Suburban Connect", totalTrips: 290, avgDelay: 3.5, maxDelay: 12, onTimeRate: 89, reliability: "Good" },
  { route: "Route 19 - Harbor Express", totalTrips: 320, avgDelay: 2.8, maxDelay: 10, onTimeRate: 92, reliability: "Excellent" },
];

const routes = [
  "All Routes",
  "Route 42 - Downtown Express",
  "Route 15 - Airport Shuttle",
  "Route 28 - University Line",
  "Route 7 - Central Loop",
  "Route 33 - Suburban Connect",
  "Route 19 - Harbor Express",
];

function getReliabilityBadge(reliability: ReportData["reliability"]) {
  switch (reliability) {
    case "Excellent":
      return <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>;
    case "Good":
      return <Badge className="bg-blue-500 hover:bg-blue-600">Good</Badge>;
    case "Fair":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Fair</Badge>;
    case "Poor":
      return <Badge variant="destructive">Poor</Badge>;
  }
}

export default function ReportsPage() {
  const [selectedRoute, setSelectedRoute] = useState("All Routes");
  const [dateFrom, setDateFrom] = useState("2025-01-01");
  const [dateTo, setDateTo] = useState("2025-02-04");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);

  const filteredData = selectedRoute === "All Routes" 
    ? reportData 
    : reportData.filter(r => r.route === selectedRoute);

  const totals = {
    trips: filteredData.reduce((sum, r) => sum + r.totalTrips, 0),
    avgDelay: (filteredData.reduce((sum, r) => sum + r.avgDelay, 0) / filteredData.length).toFixed(1),
    maxDelay: Math.max(...filteredData.map(r => r.maxDelay)),
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1000);
  };

  const handleExportPDF = () => {
    alert("PDF export would be triggered here. In production, this would generate a PDF report.");
  };

  const handleExportCSV = () => {
    const headers = ["Route", "Total Trips", "Avg Delay (min)", "Max Delay (min)", "On-Time Rate (%)", "Reliability"];
    const rows = filteredData.map(r => [
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
    a.download = `delay-report-${dateFrom}-to-${dateTo}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">Generate and export delay analytics reports</p>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Parameters
          </CardTitle>
          <CardDescription>Configure report filters and date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Route Filter</Label>
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
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button onClick={handleGenerateReport} className="w-full" disabled={isGenerating}>
                <Calendar className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Summary */}
      {reportGenerated && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.trips.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {dateFrom} to {dateTo}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Delay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.avgDelay} min</div>
                <p className="text-xs text-muted-foreground">
                  Across all selected routes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Maximum Delay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.maxDelay} min</div>
                <p className="text-xs text-muted-foreground">
                  Worst single delay recorded
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Report Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Delay Report
                  </CardTitle>
                  <CardDescription>
                    Report period: {dateFrom} to {dateTo}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExportPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead className="text-right">Total Trips</TableHead>
                    <TableHead className="text-right">Avg Delay (min)</TableHead>
                    <TableHead className="text-right">Max Delay (min)</TableHead>
                    <TableHead className="text-right">On-Time Rate</TableHead>
                    <TableHead className="text-right">Reliability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((row) => (
                    <TableRow key={row.route}>
                      <TableCell className="font-medium">{row.route}</TableCell>
                      <TableCell className="text-right">{row.totalTrips.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{row.avgDelay}</TableCell>
                      <TableCell className="text-right">{row.maxDelay}</TableCell>
                      <TableCell className="text-right">{row.onTimeRate}%</TableCell>
                      <TableCell className="text-right">
                        {getReliabilityBadge(row.reliability)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
