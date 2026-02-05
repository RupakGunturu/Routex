"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Truck } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Vehicle {
  id: string;
  vehicleNumber: string;
  route: string;
  status: "Active" | "Maintenance" | "Inactive";
  capacity: string;
}

const routes = [
  "Route 42 - Downtown Express",
  "Route 15 - Airport Shuttle",
  "Route 28 - University Line",
  "Route 7 - Central Loop",
  "Route 33 - Suburban Connect",
];

const initialVehicles: Vehicle[] = [
  { id: "V001", vehicleNumber: "BUS-1234", route: "Route 42 - Downtown Express", status: "Active", capacity: "45" },
  { id: "V002", vehicleNumber: "BUS-1235", route: "Route 15 - Airport Shuttle", status: "Active", capacity: "50" },
  { id: "V003", vehicleNumber: "BUS-1236", route: "Route 28 - University Line", status: "Maintenance", capacity: "40" },
  { id: "V004", vehicleNumber: "BUS-1237", route: "Route 7 - Central Loop", status: "Active", capacity: "45" },
  { id: "V005", vehicleNumber: "BUS-1238", route: "Route 33 - Suburban Connect", status: "Inactive", capacity: "55" },
  { id: "V006", vehicleNumber: "BUS-1239", route: "Route 42 - Downtown Express", status: "Active", capacity: "45" },
];

function getStatusBadge(status: Vehicle["status"]) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    case "Maintenance":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Maintenance</Badge>;
    case "Inactive":
      return <Badge variant="secondary">Inactive</Badge>;
  }
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddVehicle = () => {
    if (vehicleNumber && selectedRoute) {
      const newVehicle: Vehicle = {
        id: `V${String(vehicles.length + 1).padStart(3, "0")}`,
        vehicleNumber,
        route: selectedRoute,
        status: "Active",
        capacity: capacity || "45",
      };
      setVehicles([...vehicles, newVehicle]);
      setVehicleNumber("");
      setSelectedRoute("");
      setCapacity("");
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? editingVehicle : v));
      setIsEditDialogOpen(false);
      setEditingVehicle(null);
    }
  };

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Vehicle Management</h2>
        <p className="text-muted-foreground">Add, edit, and manage fleet vehicles</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add Vehicle Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Add New Vehicle
            </CardTitle>
            <CardDescription>Register a new vehicle to the fleet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                placeholder="e.g., BUS-1234"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="route">Assigned Route</Label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a route" />
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
              <Label htmlFor="capacity">Capacity (seats)</Label>
              <Input
                id="capacity"
                placeholder="e.g., 45"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <Button onClick={handleAddVehicle} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </CardContent>
        </Card>

        {/* Vehicles Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fleet Vehicles</CardTitle>
            <CardDescription>
              {vehicles.length} vehicles in fleet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-mono text-sm">{vehicle.id}</TableCell>
                    <TableCell className="font-medium">{vehicle.vehicleNumber}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{vehicle.route}</TableCell>
                    <TableCell>{vehicle.capacity}</TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(vehicle)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>
              Update vehicle details and assignment
            </DialogDescription>
          </DialogHeader>
          {editingVehicle && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Vehicle Number</Label>
                <Input
                  value={editingVehicle.vehicleNumber}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, vehicleNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Assigned Route</Label>
                <Select
                  value={editingVehicle.route}
                  onValueChange={(value) => setEditingVehicle({ ...editingVehicle, route: value })}
                >
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
                <Label>Status</Label>
                <Select
                  value={editingVehicle.status}
                  onValueChange={(value: Vehicle["status"]) => setEditingVehicle({ ...editingVehicle, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input
                  value={editingVehicle.capacity}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, capacity: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
