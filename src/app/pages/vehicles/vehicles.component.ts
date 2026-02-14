import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plus, Pencil, Trash2, Truck } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

import {
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardHeaderComponent,
    CardTitleComponent
} from '../../components/ui/card/card.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { InputComponent } from '../../components/ui/input/input.component';
import { LabelComponent } from '../../components/ui/label/label.component';
import { SelectComponent, SelectItemComponent } from '../../components/ui/select/select.component';
import {
    TableComponent,
    TableBodyComponent,
    TableCellComponent,
    TableHeadComponent,
    TableHeaderComponent,
    TableRowComponent
} from '../../components/ui/table/table.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import {
    DialogComponent,
    DialogContentComponent,
    DialogDescriptionComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogTitleComponent
} from '../../components/ui/dialog/dialog.component';

interface Vehicle {
    id: string;
    vehicleNumber: string;
    route: string;
    status: "Active" | "Maintenance" | "Inactive";
    capacity: string;
}

@Component({
    selector: 'app-vehicles',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        LucideAngularModule,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardDescriptionComponent,
        CardContentComponent,
        ButtonComponent,
        InputComponent,
        LabelComponent,
        SelectComponent,
        SelectItemComponent,
        TableComponent,
        TableHeaderComponent,
        TableRowComponent,
        TableHeadComponent,
        TableBodyComponent,
        TableCellComponent,
        BadgeComponent,
        DialogComponent,
        DialogContentComponent,
        DialogDescriptionComponent,
        DialogFooterComponent,
        DialogHeaderComponent,
        DialogTitleComponent
    ],
    template: `
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Vehicle Management</h2>
        <p class="text-muted-foreground">Add, edit, and manage fleet vehicles</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Add Vehicle Form -->
        <app-card class="lg:col-span-1 border-t-4 border-t-orange-500">
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="Truck" class="h-5 w-5 text-orange-500"></lucide-icon>
              Add New Vehicle
            </app-card-title>
            <app-card-description>Register a new vehicle to the fleet</app-card-description>
          </app-card-header>
          <app-card-content class="space-y-4">
            <div class="space-y-2">
              <app-label>Vehicle Number</app-label>
              <app-input
                placeholder="e.g., BUS-1234"
                [(ngModel)]="vehicleNumber"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Assigned Route</app-label>
              <app-select [(ngModel)]="selectedRoute">
                <app-select-item value="">Select a route</app-select-item>
                <app-select-item *ngFor="let route of routes" [value]="route">
                  {{route}}
                </app-select-item>
              </app-select>
            </div>
            <div class="space-y-2">
              <app-label>Capacity (seats)</app-label>
              <app-input
                placeholder="e.g., 45"
                [(ngModel)]="capacity"
              ></app-input>
            </div>
            <app-button (click)="handleAddVehicle()" className="w-full">
              <lucide-icon [name]="Plus" class="h-4 w-4 mr-2"></lucide-icon>
              Add Vehicle
            </app-button>
          </app-card-content>
        </app-card>

        <!-- Vehicles Table -->
        <app-card class="lg:col-span-2">
          <app-card-header>
            <app-card-title>Fleet Vehicles</app-card-title>
            <app-card-description>
              {{vehicles.length}} vehicles in fleet
            </app-card-description>
          </app-card-header>
          <app-card-content>
            <app-table>
              <app-table-header>
                <app-table-row>
                  <app-table-head>Vehicle ID</app-table-head>
                  <app-table-head>Number</app-table-head>
                  <app-table-head>Route</app-table-head>
                  <app-table-head>Capacity</app-table-head>
                  <app-table-head>Status</app-table-head>
                  <app-table-head class="text-right">Actions</app-table-head>
                </app-table-row>
              </app-table-header>
              <app-table-body>
                <app-table-row *ngFor="let vehicle of vehicles">
                  <app-table-cell class="font-mono text-sm">{{vehicle.id}}</app-table-cell>
                  <app-table-cell class="font-medium">{{vehicle.vehicleNumber}}</app-table-cell>
                  <app-table-cell class="max-w-[200px] truncate text-xs text-muted-foreground">{{vehicle.route}}</app-table-cell>
                  <app-table-cell>{{vehicle.capacity}}</app-table-cell>
                  <app-table-cell>
                    <app-badge [className]="getStatusBadgeClass(vehicle.status)">
                      {{vehicle.status}}
                    </app-badge>
                  </app-table-cell>
                  <app-table-cell class="text-right">
                    <div class="flex justify-end gap-2">
                      <app-button
                        variant="outline"
                        size="icon"
                        (click)="handleEdit(vehicle)"
                      >
                        <lucide-icon [name]="Pencil" class="h-4 w-4"></lucide-icon>
                      </app-button>
                      <app-button
                        variant="outline"
                        size="icon"
                        (click)="handleDelete(vehicle.id)"
                      >
                        <lucide-icon [name]="Trash2" class="h-4 w-4 text-rose-500"></lucide-icon>
                      </app-button>
                    </div>
                  </app-table-cell>
                </app-table-row>
              </app-table-body>
            </app-table>
          </app-card-content>
        </app-card>
      </div>

      <!-- Edit Dialog -->
      <app-dialog [(open)]="isEditDialogOpen">
        <app-dialog-header>
          <app-dialog-title>Edit Vehicle</app-dialog-title>
          <app-dialog-description>
            Update vehicle details and assignment
          </app-dialog-description>
        </app-dialog-header>
        <app-dialog-content *ngIf="editingVehicle">
          <div class="space-y-4">
            <div class="space-y-2">
              <app-label>Vehicle Number</app-label>
              <app-input
                [(ngModel)]="editingVehicle.vehicleNumber"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Assigned Route</app-label>
              <app-select [(ngModel)]="editingVehicle.route">
                <app-select-item *ngFor="let route of routes" [value]="route">
                  {{route}}
                </app-select-item>
              </app-select>
            </div>
            <div class="space-y-2">
              <app-label>Status</app-label>
              <app-select [(ngModel)]="editingVehicle.status">
                <app-select-item value="Active">Active</app-select-item>
                <app-select-item value="Maintenance">Maintenance</app-select-item>
                <app-select-item value="Inactive">Inactive</app-select-item>
              </app-select>
            </div>
            <div class="space-y-2">
              <app-label>Capacity</app-label>
              <app-input
                [(ngModel)]="editingVehicle.capacity"
              ></app-input>
            </div>
          </div>
        </app-dialog-content>
        <app-dialog-footer>
          <app-button variant="outline" (click)="isEditDialogOpen = false">
            Cancel
          </app-button>
          <app-button (click)="handleSaveEdit()">Save Changes</app-button>
        </app-dialog-footer>
      </app-dialog>
    </div>
  `,
})
export class VehiclesComponent {
    readonly Plus = Plus;
    readonly Pencil = Pencil;
    readonly Trash2 = Trash2;
    readonly Truck = Truck;

    routes = [
        "Route 42 - Downtown Express",
        "Route 15 - Airport Shuttle",
        "Route 28 - University Line",
        "Route 7 - Central Loop",
        "Route 33 - Suburban Connect",
    ];

    vehicles: Vehicle[] = [
        { id: "V001", vehicleNumber: "BUS-1234", route: "Route 42 - Downtown Express", status: "Active", capacity: "45" },
        { id: "V002", vehicleNumber: "BUS-1235", route: "Route 15 - Airport Shuttle", status: "Active", capacity: "50" },
        { id: "V003", vehicleNumber: "BUS-1236", route: "Route 28 - University Line", status: "Maintenance", capacity: "40" },
        { id: "V004", vehicleNumber: "BUS-1237", route: "Route 7 - Central Loop", status: "Active", capacity: "45" },
        { id: "V005", vehicleNumber: "BUS-1238", route: "Route 33 - Suburban Connect", status: "Inactive", capacity: "55" },
        { id: "V006", vehicleNumber: "BUS-1239", route: "Route 42 - Downtown Express", status: "Active", capacity: "45" },
    ];

    vehicleNumber = "";
    selectedRoute = "";
    capacity = "";
    editingVehicle: Vehicle | null = null;
    isEditDialogOpen = false;

    handleAddVehicle() {
        if (this.vehicleNumber && this.selectedRoute) {
            const newVehicle: Vehicle = {
                id: `V${String(this.vehicles.length + 1).padStart(3, "0")}`,
                vehicleNumber: this.vehicleNumber,
                route: this.selectedRoute,
                status: "Active",
                capacity: this.capacity || "45",
            };
            this.vehicles = [...this.vehicles, newVehicle];
            this.vehicleNumber = "";
            this.selectedRoute = "";
            this.capacity = "";
        }
    }

    handleEdit(vehicle: Vehicle) {
        this.editingVehicle = { ...vehicle };
        this.isEditDialogOpen = true;
    }

    handleSaveEdit() {
        if (this.editingVehicle) {
            this.vehicles = this.vehicles.map(v => v.id === this.editingVehicle!.id ? this.editingVehicle! : v);
            this.isEditDialogOpen = false;
            this.editingVehicle = null;
        }
    }

    handleDelete(id: string) {
        this.vehicles = this.vehicles.filter(v => v.id !== id);
    }

    getStatusBadgeClass(status: Vehicle["status"]) {
        switch (status) {
            case "Active":
                return "bg-green-500 hover:bg-green-600 border-none text-white";
            case "Maintenance":
                return "bg-amber-500 hover:bg-amber-600 border-none text-white";
            case "Inactive":
                return "bg-slate-500 hover:bg-slate-600 border-none text-white";
            default:
                return "";
        }
    }
}
