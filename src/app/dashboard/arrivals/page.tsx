"use client";

import { useState } from "react";
import { Plus, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const schedules = [
  { id: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00" },
  { id: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30" },
  { id: "S003", vehicle: "BUS-1236", route: "Route 28 - University Line", scheduledTime: "07:00" },
  { id: "S004", vehicle: "BUS-1237", route: "Route 7 - Central Loop", scheduledTime: "06:15" },
  { id: "S005", vehicle: "BUS-1238", route: "Route 33 - Suburban Connect", scheduledTime: "07:30" },
  { id: "S006", vehicle: "BUS-1239", route: "Route 42 - Downtown Express", scheduledTime: "08:00" },
];

const initialLogs: ArrivalLog[] = [
  { id: "L001", scheduleId: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00", actualTime: "06:08", delayMinutes: 8, date: "2025-02-04" },
  { id: "L002", scheduleId: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30", actualTime: "06:32", delayMinutes: 2, date: "2025-02-04" },
  { id: "L003", scheduleId: "S003", vehicle: "BUS-1236", route: "Route 28 - University Line", scheduledTime: "07:00", actualTime: "07:15", delayMinutes: 15, date: "2025-02-04" },
  { id: "L004", scheduleId: "S004", vehicle: "BUS-1237", route: "Route 7 - Central Loop", scheduledTime: "06:15", actualTime: "06:14", delayMinutes: -1, date: "2025-02-04" },
  { id: "L005", scheduleId: "S005", vehicle: "BUS-1238", route: "Route 33 - Suburban Connect", scheduledTime: "07:30", actualTime: "07:35", delayMinutes: 5, date: "2025-02-04" },
  { id: "L006", scheduleId: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00", actualTime: "06:12", delayMinutes: 12, date: "2025-02-03" },
  { id: "L007", scheduleId: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30", actualTime: "06:28", delayMinutes: -2, date: "2025-02-03" },
];

function calculateDelay(scheduled: string, actual: string): number {
  const [schHours, schMins] = scheduled.split(":").map(Number);
  const [actHours, actMins] = actual.split(":").map(Number);
  const schTotal = schHours * 60 + schMins;
  const actTotal = actHours * 60 + actMins;
  return actTotal - schTotal;
}

function getDelayBadge(delay: number) {
  if (delay <= 0) return <Badge className="bg-green-500 hover:bg-green-600">On Time</Badge>;
  if (delay <= 5) return <Badge className="bg-blue-500 hover:bg-blue-600">Minor ({delay} min)</Badge>;
  if (delay <= 10) return <Badge className="bg-yellow-500 hover:bg-yellow-600">Moderate ({delay} min)</Badge>;
  return <Badge variant="destructive">Severe ({delay} min)</Badge>;
}

export default function ArrivalsPage() {
  const [logs, setLogs] = useState<ArrivalLog[]>(initialLogs);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [actualTime, setActualTime] = useState("");

  const getScheduleDetails = (scheduleId: string) => {
    return schedules.find(s => s.id === scheduleId);
  };

  const handleSubmitLog = () => {
    if (selectedSchedule && actualTime) {
      const schedule = getScheduleDetails(selectedSchedule);
      if (schedule) {
        const delay = calculateDelay(schedule.scheduledTime, actualTime);
        const newLog: ArrivalLog = {
          id: `L${String(logs.length + 1).padStart(3, "0")}`,
          scheduleId: selectedSchedule,
          vehicle: schedule.vehicle,
          route: schedule.route,
          scheduledTime: schedule.scheduledTime,
          actualTime,
          delayMinutes: delay,
          date: new Date().toISOString().split("T")[0],
        };
        setLogs([newLog, ...logs]);
        setSelectedSchedule("");
        setActualTime("");
      }
    }
  };

  const onTimeCount = logs.filter(l => l.delayMinutes <= 0).length;
  const avgDelay = logs.length > 0 
    ? (logs.reduce((sum, l) => sum + Math.max(0, l.delayMinutes), 0) / logs.length).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Arrival Logging</h2>
        <p className="text-muted-foreground">Record actual arrival times and track delays</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.filter(l => l.date === "2025-02-04").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Arrivals</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onTimeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Delay</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDelay} min</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Log Arrival Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Log Arrival
            </CardTitle>
            <CardDescription>Record actual arrival time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Select value={selectedSchedule} onValueChange={setSelectedSchedule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a schedule" />
                </SelectTrigger>
                <SelectContent>
                  {schedules.map((schedule) => (
                    <SelectItem key={schedule.id} value={schedule.id}>
                      {schedule.vehicle} - {schedule.scheduledTime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSchedule && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Route: {getScheduleDetails(selectedSchedule)?.route}</p>
                  <p>Scheduled: {getScheduleDetails(selectedSchedule)?.scheduledTime}</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="actualTime">Actual Arrival Time</Label>
              <Input
                id="actualTime"
                type="time"
                value={actualTime}
                onChange={(e) => setActualTime(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmitLog} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Submit Log
            </Button>
          </CardContent>
        </Card>

        {/* Recent Logs Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Arrival Logs</CardTitle>
            <CardDescription>
              {logs.length} logs recorded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Delay</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.date}</TableCell>
                    <TableCell className="font-medium">{log.vehicle}</TableCell>
                    <TableCell>{log.scheduledTime}</TableCell>
                    <TableCell>{log.actualTime}</TableCell>
                    <TableCell className={log.delayMinutes > 0 ? "text-red-600" : "text-green-600"}>
                      {log.delayMinutes > 0 ? `+${log.delayMinutes}` : log.delayMinutes} min
                    </TableCell>
                    <TableCell className="text-right">
                      {getDelayBadge(log.delayMinutes)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
