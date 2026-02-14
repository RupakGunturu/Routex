import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Bus, AlertTriangle, Trophy } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { InputComponent } from '../../components/ui/input/input.component';
import { LabelComponent } from '../../components/ui/label/label.component';
import { AlertComponent, AlertDescriptionComponent } from '../../components/ui/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    LabelComponent,
    AlertComponent,
    AlertDescriptionComponent
  ],
  template: `
    <div class="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/40">
      <!-- Visual Side (Hidden on mobile) -->
      <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-600">
        <!-- Modern Abstract Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800"></div>
        
        <!-- Animated Blobs -->
        <div class="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
        
        <!-- Grid Pattern Overlay -->
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 40px 40px;"></div>

        <!-- Content Overlay -->
        <div class="relative z-10 flex flex-col justify-center px-20">
          <div class="flex items-center gap-3 mb-12">
            <div class="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <lucide-icon [name]="Bus" class="h-10 w-10 text-white"></lucide-icon>
            </div>
            <span class="font-heading text-4xl font-bold tracking-tighter text-white">RouteX</span>
          </div>
          
          <h2 class="font-heading text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Unlocking <br/>
            <span class="text-blue-200">Transit Intelligence.</span>
          </h2>
          
          <p class="text-xl text-blue-100 max-w-lg mb-10 leading-relaxed font-medium">
            Join the global network of transport planners using real-time delay analytics to build smarter, more reliable cities.
          </p>

          <!-- Feature Badges -->
          <div class="flex flex-wrap gap-4">
            <div class="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-semibold">Real-time Tracking</div>
            <div class="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-semibold">Predictive Analytics</div>
            <div class="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-semibold">Fleet Management</div>
          </div>
        </div>

        <!-- Bottom Branding -->
        <div class="absolute bottom-12 left-20 z-10 text-blue-300/60 text-sm font-bold tracking-widest uppercase">
          © 2026 RouteX Intelligence Systems
        </div>
      </div>

      <!-- Form Side -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative">
        <!-- Floating shapes for mobile view -->
        <div class="lg:hidden absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div class="lg:hidden absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>

        <div class="w-full max-w-[420px] relative z-10">
          <!-- Mobile Brand (Visible only on mobile) -->
          <div class="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div class="p-2.5 bg-blue-600 rounded-xl">
              <lucide-icon [name]="Bus" class="h-7 w-7 text-white"></lucide-icon>
            </div>
            <h1 class="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">RouteX</h1>
          </div>

          <div class="mb-10 text-center lg:text-left">
            <h3 class="font-heading text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">Sign In</h3>
            <p class="text-slate-500 dark:text-slate-400 font-medium">Authorized personnel only. Enter your credentials to manage the transit network.</p>
          </div>

          <form (submit)="handleLogin($event)" class="space-y-6">
            <app-alert *ngIf="error()" variant="destructive" class="border-none bg-rose-50 dark:bg-rose-900/20 ring-1 ring-rose-200 dark:ring-rose-800/30">
              <app-alert-description class="text-rose-700 dark:text-rose-400 font-bold flex items-center gap-2">
                <lucide-icon [name]="AlertTriangle" class="h-4 w-4"></lucide-icon>
                {{error()}}
              </app-alert-description>
            </app-alert>
            
            <div class="space-y-2.5">
              <div class="flex items-center justify-between px-1">
                <app-label for="email" class="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</app-label>
              </div>
              <app-input
                id="email"
                type="email"
                placeholder="name@company.com"
                [(ngModel)]="email"
                name="email"
                required
                className="h-13 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all font-medium"
              ></app-input>
            </div>

            <div class="space-y-2.5">
              <div class="flex items-center justify-between px-1">
                <app-label for="password" class="text-xs font-bold uppercase tracking-widest text-slate-500">Secure Password</app-label>
                <a href="#" class="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
              </div>
              <app-input
                id="password"
                type="password"
                placeholder="••••••••"
                [(ngModel)]="password"
                name="password"
                required
                className="h-13 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all font-medium"
              ></app-input>
            </div>

            <app-button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/25 rounded-2xl transition-all active:scale-[0.98] mt-4" [disabled]="isLoading()">
              {{isLoading() ? "Authenticating System..." : "Launch Dashboard"}}
            </app-button>

            <!-- Demo Context -->
            <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mt-10">
              <div class="flex items-start gap-4">
                <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <lucide-icon [name]="Trophy" class="h-5 w-5 text-blue-600"></lucide-icon>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-slate-200 mb-1">Public Demo Access</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">System administrators can use the following sandbox credentials:</p>
                  <div class="grid grid-cols-2 gap-2 text-[10px] font-black uppercase tracking-widest">
                    <div class="bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400">
                      Email: <span class="text-blue-600">admin&#64;transit.com</span>
                    </div>
                    <div class="bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400">
                      Pass: <span class="text-blue-600">admin12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  readonly Bus = Bus;
  readonly AlertTriangle = AlertTriangle;
  readonly Trophy = Trophy;

  email = '';
  password = '';
  error = signal('');
  isLoading = computed(() => this.authService.isLoading());

  async handleLogin(event: Event) {
    event.preventDefault();
    this.error.set('');

    const result = await this.authService.login(this.email, this.password);

    if (result.success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set(result.message || 'Login failed');
    }
  }
}
