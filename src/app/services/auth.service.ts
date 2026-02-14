import { Injectable, signal, computed } from '@angular/core';

export interface User {
    id: string;
    email: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user = signal<User | null>(null);
    private _isLoading = signal(false);

    user = computed(() => this._user());
    isLoading = computed(() => this._isLoading());
    isAuthenticated = computed(() => !!this._user());

    async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
        this._isLoading.set(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (email === "admin@transit.com" && password === "admin123") {
            this._user.set({
                id: "1",
                email: "admin@transit.com",
                name: "Admin User"
            });
            this._isLoading.set(false);
            return { success: true };
        } else {
            this._isLoading.set(false);
            return { success: false, message: "Invalid email or password. Try admin@transit.com / admin123" };
        }
    }

    logout() {
        this._user.set(null);
    }
}
