/**
 * @fileoverview User Service
 * @description Handles user-related operations including profile loading and logout
 * 
 * CHANGES MADE:
 * - Resolved Git merge conflict (kept HEAD version as both were identical)
 * - Updated logout() to also remove userRole from localStorage (for route guards)
 * - Added documentation comments
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

/**
 * User interface representing the user data structure
 */
export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  matricNumber: string;
  mealId?: number; 
  roleId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/v1/auth/curr-user`;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Loads the current user's details from the API
   * @returns Observable with user details or error if not authenticated
   */
  loadUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("No token found! User might not be logged in.");
      return new Observable(observer => observer.error("No token found"));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl, { headers });
  }

  /**
   * Logs out the current user by clearing all stored session data
   * UPDATED: Now also removes userRole for route guard consistency
   */
  logout() {
    console.log("Logging out user...");

    // Remove all stored user session details
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');  // ADDED: Clear user role for route guards
    sessionStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
