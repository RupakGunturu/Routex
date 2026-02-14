import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-placeholder',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div class="p-4 bg-muted rounded-full">
        <div class="h-12 w-12 text-muted-foreground opacity-20 animate-pulse">
           <!-- Placeholder icon -->
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
      </div>
      <h2 class="text-2xl font-bold tracking-tight">Component Coming Soon</h2>
      <p class="text-muted-foreground">This section is currently under development.</p>
    </div>
  `,
})
export class PlaceholderComponent { }
