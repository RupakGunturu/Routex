import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plus, Pencil, Trash2 } from 'lucide-angular';
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
import {
    TableComponent,
    TableBodyComponent,
    TableCellComponent,
    TableHeadComponent,
    TableHeaderComponent,
    TableRowComponent
} from '../../components/ui/table/table.component';
import {
    DialogComponent,
    DialogContentComponent,
    DialogDescriptionComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogTitleComponent
} from '../../components/ui/dialog/dialog.component';

interface Route {
    id: string;
    name: string;
    source: string;
    destination: string;
    distance: string;
    status: "Active" | "Inactive";
}

@Component({
    selector: 'app-routes',
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
        TableComponent,
        TableHeaderComponent,
        TableRowComponent,
        TableHeadComponent,
        TableBodyComponent,
        TableCellComponent,
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
        <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Route Management</h2>
        <p class="text-muted-foreground">Add, edit, and manage transport routes</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Add Route Form -->
        <app-card class="lg:col-span-1 border-t-4 border-t-emerald-500">
          <app-card-header>
            <app-card-title class="flex items-center gap-2">
              <lucide-icon [name]="Plus" class="h-5 w-5 text-emerald-500"></lucide-icon>
              Add New Route
            </app-card-title>
            <app-card-description>Create a new transport route</app-card-description>
          </app-card-header>
          <app-card-content class="space-y-4">
            <div class="space-y-2">
              <app-label>Route Name</app-label>
              <app-input
                placeholder="e.g., Route 42 - Downtown Express"
                [(ngModel)]="routeName"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Source</app-label>
              <app-input
                placeholder="Starting point"
                [(ngModel)]="source"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Destination</app-label>
              <app-input
                placeholder="End point"
                [(ngModel)]="destination"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Distance (km)</app-label>
              <app-input
                placeholder="e.g., 12.5"
                [(ngModel)]="distance"
              ></app-input>
            </div>
            <app-button (click)="handleAddRoute()" className="w-full">
              <lucide-icon [name]="Plus" class="h-4 w-4 mr-2"></lucide-icon>
              Add Route
            </app-button>
          </app-card-content>
        </app-card>

        <!-- Routes Table -->
        <app-card class="lg:col-span-2">
          <app-card-header>
            <app-card-title>All Routes</app-card-title>
            <app-card-description>
              {{routes.length}} routes configured
            </app-card-description>
          </app-card-header>
          <app-card-content>
            <app-table>
              <app-table-header>
                <app-table-row>
                  <app-table-head>ID</app-table-head>
                  <app-table-head>Route Name</app-table-head>
                  <app-table-head>Source</app-table-head>
                  <app-table-head>Destination</app-table-head>
                  <app-table-head>Distance</app-table-head>
                  <app-table-head class="text-right">Actions</app-table-head>
                </app-table-row>
              </app-table-header>
              <app-table-body>
                <app-table-row *ngFor="let route of routes">
                  <app-table-cell class="font-mono text-sm">{{route.id}}</app-table-cell>
                  <app-table-cell class="font-medium">{{route.name}}</app-table-cell>
                  <app-table-cell>{{route.source}}</app-table-cell>
                  <app-table-cell>{{route.destination}}</app-table-cell>
                  <app-table-cell>{{route.distance}}</app-table-cell>
                  <app-table-cell class="text-right">
                    <div class="flex justify-end gap-2">
                      <app-button
                        variant="outline"
                        size="icon"
                        (click)="handleEdit(route)"
                      >
                        <lucide-icon [name]="Pencil" class="h-4 w-4"></lucide-icon>
                      </app-button>
                      <app-button
                        variant="outline"
                        size="icon"
                        (click)="handleDelete(route.id)"
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
          <app-dialog-title>Edit Route</app-dialog-title>
          <app-dialog-description>
            Make changes to the route details
          </app-dialog-description>
        </app-dialog-header>
        <app-dialog-content *ngIf="editingRoute">
          <div class="space-y-4">
            <div class="space-y-2">
              <app-label>Route Name</app-label>
              <app-input
                [(ngModel)]="editingRoute.name"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Source</app-label>
              <app-input
                [(ngModel)]="editingRoute.source"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Destination</app-label>
              <app-input
                [(ngModel)]="editingRoute.destination"
              ></app-input>
            </div>
            <div class="space-y-2">
              <app-label>Distance</app-label>
              <app-input
                [(ngModel)]="editingRoute.distance"
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
export class RoutesComponent {
    readonly Plus = Plus;
    readonly Pencil = Pencil;
    readonly Trash2 = Trash2;

    routes: Route[] = [
        { id: "R001", name: "Route 42 - Downtown Express", source: "Central Station", destination: "Downtown Terminal", distance: "12.5 km", status: "Active" },
        { id: "R002", name: "Route 15 - Airport Shuttle", source: "City Center", destination: "International Airport", distance: "25.0 km", status: "Active" },
        { id: "R003", name: "Route 28 - University Line", source: "North Park", destination: "University Campus", distance: "8.3 km", status: "Active" },
        { id: "R004", name: "Route 7 - Central Loop", source: "East Terminal", destination: "West Terminal", distance: "15.2 km", status: "Active" },
        { id: "R005", name: "Route 33 - Suburban Connect", source: "Suburb Plaza", destination: "Central Station", distance: "18.7 km", status: "Inactive" },
    ];

    source = "";
    destination = "";
    routeName = "";
    distance = "";
    editingRoute: Route | null = null;
    isEditDialogOpen = false;

    handleAddRoute() {
        if (this.source && this.destination && this.routeName) {
            const newRoute: Route = {
                id: `R${String(this.routes.length + 1).padStart(3, "0")}`,
                name: this.routeName,
                source: this.source,
                destination: this.destination,
                distance: this.distance || "N/A",
                status: "Active",
            };
            this.routes = [...this.routes, newRoute];
            this.source = "";
            this.destination = "";
            this.routeName = "";
            this.distance = "";
        }
    }

    handleEdit(route: Route) {
        this.editingRoute = { ...route };
        this.isEditDialogOpen = true;
    }

    handleSaveEdit() {
        if (this.editingRoute) {
            this.routes = this.routes.map(r => r.id === this.editingRoute!.id ? this.editingRoute! : r);
            this.isEditDialogOpen = false;
            this.editingRoute = null;
        }
    }

    handleDelete(id: string) {
        this.routes = this.routes.filter(r => r.id !== id);
    }
}
