/**
 * @fileoverview Authentication Service
 * @description Handles user authentication operations including login state management
 * 
 * CHANGES MADE:
 * - Resolved Git merge conflict (kept HEAD version as both were identical)
 * - Added isAuthenticated() method for route guards
 * - Added getUserRole() method for role-based access control
 * - Added documentation comments
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  /**
   * ADDED: Checks if user is currently authenticated
   * Used by AuthGuard to protect routes
   * @returns true if a valid token exists in localStorage
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * ADDED: Gets the current user's role from localStorage
   * Used by AdminGuard for role-based access control
   * @returns The user's role ('admin', 'user', or null)
   */
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  /**
   * Gets the current authenticated user from the API
   * @returns Observable with user data
   */
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${environment.apiUrl}/current-user`, { headers });
  }

  /**
   * Registers a new user
   * @param userData - User registration data (email, password, name, matricNo)
   * @returns Observable with registration response
   */
  registerUser(userData: any) {
    const formData = new URLSearchParams();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${environment.apiUrl}/register`, formData.toString(), { headers });
  }
}
