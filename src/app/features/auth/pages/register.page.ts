import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

import { AuthService, RegisterRequest } from '../../../core';

// Custom validator for password confirmation
function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
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
            Create Account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Join Kadic Events today!
          </p>
        </div>

        <!-- Register Form -->
        <p-card class="mt-8">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Error/Success Messages -->
            @if (errorMessage()) {
              <p-message 
                severity="error" 
                [text]="errorMessage()"
                styleClass="w-full"
              />
            }
            @if (successMessage()) {
              <p-message 
                severity="success" 
                [text]="successMessage()"
                styleClass="w-full"
              />
            }

            <!-- First Name Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <input 
                  pInputText 
                  id="firstName" 
                  formControlName="firstName"
                  class="w-full"
                />
                <label for="firstName">First Name</label>
              </p-floatlabel>
              @if (registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched) {
                <small class="text-red-500">First name is required</small>
              }
            </div>

            <!-- Last Name Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <input 
                  pInputText 
                  id="lastName" 
                  formControlName="lastName"
                  class="w-full"
                />
                <label for="lastName">Last Name</label>
              </p-floatlabel>
              @if (registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched) {
                <small class="text-red-500">Last name is required</small>
              }
            </div>

            <!-- Email Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <input 
                  pInputText 
                  id="email" 
                  type="email"
                  formControlName="email"
                  class="w-full"
                />
                <label for="email">Email Address</label>
              </p-floatlabel>
              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <small class="text-red-500">
                  @if (registerForm.get('email')?.hasError('required')) {
                    Email is required
                  } @else if (registerForm.get('email')?.hasError('email')) {
                    Please enter a valid email address
                  }
                </small>
              }
            </div>

            <!-- Phone Number Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <input 
                  pInputText 
                  id="phoneNumber" 
                  type="tel"
                  formControlName="phoneNumber"
                  class="w-full"
                />
                <label for="phoneNumber">Phone Number (Optional)</label>
              </p-floatlabel>
            </div>

            <!-- Password Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <p-password 
                  inputId="password"
                  formControlName="password"
                  [feedback]="true"
                  [toggleMask]="true"
                  styleClass="w-full"
                  inputStyleClass="w-full"
                />
                <label for="password">Password</label>
              </p-floatlabel>
              @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                <small class="text-red-500">
                  @if (registerForm.get('password')?.hasError('required')) {
                    Password is required
                  } @else if (registerForm.get('password')?.hasError('minlength')) {
                    Password must be at least 6 characters long
                  }
                </small>
              }
            </div>

            <!-- Confirm Password Field -->
            <div class="space-y-1">
              <p-floatlabel>
                <p-password 
                  inputId="confirmPassword"
                  formControlName="confirmPassword"
                  [feedback]="false"
                  [toggleMask]="true"
                  styleClass="w-full"
                  inputStyleClass="w-full"
                />
                <label for="confirmPassword">Confirm Password</label>
              </p-floatlabel>
              @if (registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched) {
                <small class="text-red-500">Please confirm your password</small>
              }
              @if (registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched) {
                <small class="text-red-500">Passwords do not match</small>
              }
            </div>

            <!-- Submit Button -->
            <div>
              <p-button
                label="Create Account"
                icon="pi pi-user-plus"
                type="submit"
                [loading]="loading()"
                [disabled]="registerForm.invalid"
                styleClass="w-full"
                size="large"
              />
            </div>

            <!-- Login Link -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Already have an account?
                <a 
                  routerLink="/auth/login" 
                  class="font-medium text-blue-600 hover:text-blue-500 ml-1"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </p-card>
      </div>
    </div>
  `
})
export class RegisterPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Signals
  readonly loading = signal<boolean>(false);
  readonly errorMessage = signal<string>('');
  readonly successMessage = signal<string>('');

  // Reactive Form
  readonly registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const registerData: RegisterRequest = this.registerForm.value as RegisterRequest;

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response.success) {
            this.successMessage.set('Account created successfully! Please sign in.');
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 2000);
          } else {
            this.errorMessage.set(response.message || 'Registration failed');
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set(error.message || 'An error occurred during registration');
        }
      });
    }
  }
}
