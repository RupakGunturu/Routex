"use client";

import { useState } from "react";
import { Plus, Calendar, Trash2 } from "lucide-react";
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

interface Schedule {
  id: string;
  vehicle: string;
  route: string;
  scheduledTime: string;
  frequency: string;
}

const vehicles = [
  { id: "BUS-1234", route: "Route 42 - Downtown Express" },
  { id: "BUS-1235", route: "Route 15 - Airport Shuttle" },
  { id: "BUS-1236", route: "Route 28 - University Line" },
  { id: "BUS-1237", route: "Route 7 - Central Loop" },
  { id: "BUS-1238", route: "Route 33 - Suburban Connect" },
  { id: "BUS-1239", route: "Route 42 - Downtown Express" },
];

const initialSchedules: Schedule[] = [
  { id: "S001", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "06:00", frequency: "Every 15 min" },
  { id: "S002", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "06:30", frequency: "Every 30 min" },
  { id: "S003", vehicle: "BUS-1236", route: "Route 28 - University Line", scheduledTime: "07:00", frequency: "Every 20 min" },
  { id: "S004", vehicle: "BUS-1237", route: "Route 7 - Central Loop", scheduledTime: "06:15", frequency: "Every 10 min" },
  { id: "S005", vehicle: "BUS-1238", route: "Route 33 - Suburban Connect", scheduledTime: "07:30", frequency: "Every 45 min" },
  { id: "S006", vehicle: "BUS-1239", route: "Route 42 - Downtown Express", scheduledTime: "06:00", frequency: "Every 15 min" },
  { id: "S007", vehicle: "BUS-1234", route: "Route 42 - Downtown Express", scheduledTime: "08:00", frequency: "Every 15 min" },
  { id: "S008", vehicle: "BUS-1235", route: "Route 15 - Airport Shuttle", scheduledTime: "09:00", frequency: "Every 30 min" },
];

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [frequency, setFrequency] = useState("");

  const getRouteForVehicle = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle?.route || "Unknown Route";
  };

  const handleAddSchedule = () => {
    if (selectedVehicle && scheduledTime) {
      const newSchedule: Schedule = {
        id: `S${String(schedules.length + 1).padStart(3, "0")}`,
        vehicle: selectedVehicle,
        route: getRouteForVehicle(selectedVehicle),
        scheduledTime,
        frequency: frequency || "Single trip",
      };
      setSchedules([...schedules, newSchedule]);
      setSelectedVehicle("");
      setScheduledTime("");
      setFrequency("");
    }
  };

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Schedule Management</h2>
        <p className="text-muted-foreground">Create and manage vehicle schedules</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add Schedule Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Create Schedule
            </CardTitle>
            <CardDescription>Add a new trip schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedVehicle && (
                <p className="text-xs text-muted-foreground">
                  Route: {getRouteForVehicle(selectedVehicle)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Scheduled Time</Label>
              <Input
                id="scheduledTime"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single trip">Single trip</SelectItem>
                  <SelectItem value="Every 10 min">Every 10 min</SelectItem>
                  <SelectItem value="Every 15 min">Every 15 min</SelectItem>
                  <SelectItem value="Every 20 min">Every 20 min</SelectItem>
                  <SelectItem value="Every 30 min">Every 30 min</SelectItem>
                  <SelectItem value="Every 45 min">Every 45 min</SelectItem>
                  <SelectItem value="Every 60 min">Every 60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddSchedule} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Schedules Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Schedules</CardTitle>
            <CardDescription>
              {schedules.length} schedules configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Schedule ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Scheduled Time</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-mono text-sm">{schedule.id}</TableCell>
                    <TableCell className="font-medium">{schedule.vehicle}</TableCell>
                    <TableCell className="max-w-[180px] truncate">{schedule.route}</TableCell>
                    <TableCell>{schedule.scheduledTime}</TableCell>
                    <TableCell>{schedule.frequency}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(schedule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
