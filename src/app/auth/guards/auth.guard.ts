/**
 * @fileoverview Authentication Guard
 * @description Route guard that protects routes requiring authentication
 * 
 * NEW FILE: Created to implement route protection for authenticated users
 * 
 * Usage: Add to route configuration with canActivate: [AuthGuard]
 * Protected routes: /user-dashboard, /qr-history, /admin-dashboard, /scan, /user-search
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Determines if a route can be activated based on authentication status
   * @returns true if user is authenticated, otherwise redirects to login
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    // User is not authenticated, redirect to login page
    console.warn('AuthGuard: User not authenticated, redirecting to login');
    return this.router.createUrlTree(['/login']);
  }
}
