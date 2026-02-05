"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Route {
  id: string;
  name: string;
  source: string;
  destination: string;
  distance: string;
  status: "Active" | "Inactive";
}

const initialRoutes: Route[] = [
  { id: "R001", name: "Route 42 - Downtown Express", source: "Central Station", destination: "Downtown Terminal", distance: "12.5 km", status: "Active" },
  { id: "R002", name: "Route 15 - Airport Shuttle", source: "City Center", destination: "International Airport", distance: "25.0 km", status: "Active" },
  { id: "R003", name: "Route 28 - University Line", source: "North Park", destination: "University Campus", distance: "8.3 km", status: "Active" },
  { id: "R004", name: "Route 7 - Central Loop", source: "East Terminal", destination: "West Terminal", distance: "15.2 km", status: "Active" },
  { id: "R005", name: "Route 33 - Suburban Connect", source: "Suburb Plaza", destination: "Central Station", distance: "18.7 km", status: "Inactive" },
];

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeName, setRouteName] = useState("");
  const [distance, setDistance] = useState("");
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddRoute = () => {
    if (source && destination && routeName) {
      const newRoute: Route = {
        id: `R${String(routes.length + 1).padStart(3, "0")}`,
        name: routeName,
        source,
        destination,
        distance: distance || "N/A",
        status: "Active",
      };
      setRoutes([...routes, newRoute]);
      setSource("");
      setDestination("");
      setRouteName("");
      setDistance("");
    }
  };

  const handleEdit = (route: Route) => {
    setEditingRoute(route);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingRoute) {
      setRoutes(routes.map(r => r.id === editingRoute.id ? editingRoute : r));
      setIsEditDialogOpen(false);
      setEditingRoute(null);
    }
  };

  const handleDelete = (id: string) => {
    setRoutes(routes.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Route Management</h2>
        <p className="text-muted-foreground">Add, edit, and manage transport routes</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add Route Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Route
            </CardTitle>
            <CardDescription>Create a new transport route</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="routeName">Route Name</Label>
              <Input
                id="routeName"
                placeholder="e.g., Route 42 - Downtown Express"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                placeholder="Starting point"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="End point"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                placeholder="e.g., 12.5"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <Button onClick={handleAddRoute} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Route
            </Button>
          </CardContent>
        </Card>

        {/* Routes Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Routes</CardTitle>
            <CardDescription>
              {routes.length} routes configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Route Name</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-mono text-sm">{route.id}</TableCell>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>{route.source}</TableCell>
                    <TableCell>{route.destination}</TableCell>
                    <TableCell>{route.distance}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(route)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(route.id)}
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
            <DialogTitle>Edit Route</DialogTitle>
            <DialogDescription>
              Make changes to the route details
            </DialogDescription>
          </DialogHeader>
          {editingRoute && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Route Name</Label>
                <Input
                  value={editingRoute.name}
                  onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Input
                  value={editingRoute.source}
                  onChange={(e) => setEditingRoute({ ...editingRoute, source: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Destination</Label>
                <Input
                  value={editingRoute.destination}
                  onChange={(e) => setEditingRoute({ ...editingRoute, destination: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Distance</Label>
                <Input
                  value={editingRoute.distance}
                  onChange={(e) => setEditingRoute({ ...editingRoute, distance: e.target.value })}
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
