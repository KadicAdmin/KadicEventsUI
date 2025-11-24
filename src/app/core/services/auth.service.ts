import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { API_CONFIG } from '../config/api.config';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
  ApiResponse 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  
  // Signals para el estado de autenticación
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private readonly _isAuthenticated = signal<boolean>(false);
  
  // Getters públicos para las señales
  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor() {
    this.loadTokenFromStorage();
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    // TODO: Remove this mock and use real API
    if (credentials.email === 'admin@kadic.com' && credentials.password === 'admin123') {
      const mockResponse: ApiResponse<LoginResponse> = {
        success: true,
        message: 'Login successful',
        data: {
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
          user: {
            id: 1,
            email: credentials.email,
            firstName: 'Admin',
            lastName: 'User',
            roles: ['ADMIN'],
            isActive: true
          },
          expiresAt: new Date(Date.now() + 3600000) // 1 hour from now
        }
      };
      this.setAuthData(mockResponse.data);
      return new Observable(observer => {
        setTimeout(() => {
          observer.next(mockResponse);
          observer.complete();
        }, 1000); // Simulate network delay
      });
    } else if (credentials.email === 'user@kadic.com' && credentials.password === 'user123') {
      const mockResponse: ApiResponse<LoginResponse> = {
        success: true,
        message: 'Login successful',
        data: {
          token: 'mock-jwt-token-user',
          refreshToken: 'mock-refresh-token-user',
          user: {
            id: 2,
            email: credentials.email,
            firstName: 'Regular',
            lastName: 'User',
            roles: ['USER'],
            isActive: true
          },
          expiresAt: new Date(Date.now() + 3600000)
        }
      };
      this.setAuthData(mockResponse.data);
      return new Observable(observer => {
        setTimeout(() => {
          observer.next(mockResponse);
          observer.complete();
        }, 1000);
      });
    } else {
      return new Observable(observer => {
        setTimeout(() => {
          observer.error(new Error('Invalid email or password'));
        }, 1000);
      });
    }

    // Real API call (commented out for now)
    /*
    return this.http.post<ApiResponse<LoginResponse>>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.login}`,
      credentials
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setAuthData(response.data);
        }
      })
    );
    */
  }

  register(userData: RegisterRequest): Observable<ApiResponse<User>> {
    // TODO: Remove this mock and use real API
    const mockResponse: ApiResponse<User> = {
      success: true,
      message: 'User registered successfully',
      data: {
        id: Math.floor(Math.random() * 1000),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        roles: ['USER'],
        isActive: true
      }
    };

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });

    // Real API call (commented out for now)
    /*
    return this.http.post<ApiResponse<User>>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.register}`,
      userData
    );
    */
  }

  refreshToken(request: RefreshTokenRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.refreshToken}`,
      request
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setAuthData(response.data);
        }
      })
    );
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.forgotPassword}`,
      request
    );
  }

  resetPassword(request: ResetPasswordRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.resetPassword}`,
      request
    );
  }

  logout(): void {
    this.clearAuthData();
  }

  private setAuthData(loginResponse: LoginResponse): void {
    this._user.set(loginResponse.user);
    this._token.set(loginResponse.token);
    this._isAuthenticated.set(true);
    
    // Guardar en localStorage
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('refreshToken', loginResponse.refreshToken);
    localStorage.setItem('user', JSON.stringify(loginResponse.user));
  }

  private clearAuthData(): void {
    this._user.set(null);
    this._token.set(null);
    this._isAuthenticated.set(false);
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  private loadTokenFromStorage(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this._user.set(user);
        this._token.set(token);
        this._isAuthenticated.set(true);
      } catch (error) {
        this.clearAuthData();
      }
    }
  }

  hasRole(role: string): boolean {
    const currentUser = this._user();
    return currentUser?.roles.includes(role) ?? false;
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }
}
