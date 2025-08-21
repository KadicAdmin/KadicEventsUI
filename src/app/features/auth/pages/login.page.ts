import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

import { AuthService, LoginRequest } from '../../../core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to Kadic Events
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <!-- Login Form -->
        <p-card class="mt-8">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Error Message -->
            @if (errorMessage()) {
              <p-message 
                severity="error" 
                [text]="errorMessage()"
                styleClass="w-full"
              />
            }

            <!-- Email Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <input 
                  pInputText 
                  id="email" 
                  type="email"
                  formControlName="email"
                  class="w-full"
                  [class.ng-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                />
                <label for="email">Email Address</label>
              </p-floatlabel>
              @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
                <small class="text-red-500">
                  @if (loginForm.get('email')?.hasError('required')) {
                    Email is required
                  } @else if (loginForm.get('email')?.hasError('email')) {
                    Please enter a valid email address
                  }
                </small>
              }
            </div>

            <!-- Password Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <p-password 
                  inputId="password"
                  formControlName="password"
                  [feedback]="false"
                  [toggleMask]="true"
                  styleClass="w-full"
                  inputStyleClass="w-full"
                />
                <label for="password">Password</label>
              </p-floatlabel>
              @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                <small class="text-red-500">
                  Password is required
                </small>
              }
            </div>

            <!-- Forgot Password Link -->
            <div class="flex items-center justify-end">
              <a 
                href="#" 
                class="text-sm text-blue-600 hover:text-blue-500"
                (click)="$event.preventDefault(); forgotPassword()"
              >
                Forgot your password?
              </a>
            </div>

            <!-- Submit Button -->
            <div>
              <p-button
                label="Sign In"
                icon="pi pi-sign-in"
                type="submit"
                [loading]="loading()"
                [disabled]="loginForm.invalid"
                styleClass="w-full"
                size="large"
              />
            </div>

            <!-- Register Link -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Don't have an account?
                <a 
                  routerLink="/auth/register" 
                  class="font-medium text-blue-600 hover:text-blue-500 ml-1"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </p-card>
      </div>
    </div>
  `
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Signals
  readonly loading = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  // Reactive Form
  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');

      const loginData: LoginRequest = this.loginForm.value as LoginRequest;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage.set(response.message || 'Login failed');
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set(error.message || 'An error occurred during login');
        }
      });
    }
  }

  forgotPassword(): void {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked');
  }
}
