/**
 * @fileoverview Admin Authorization Guard
 * @description Route guard that protects admin-only routes
 * 
 * NEW FILE: Created to implement role-based access control for admin routes
 * 
 * Usage: Add to route configuration with canActivate: [AuthGuard, AdminGuard]
 * Note: Should be used together with AuthGuard to ensure user is authenticated first
 * Protected routes: /admin-dashboard, /scan, /user-search
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Determines if a route can be activated based on admin role
   * @returns true if user has admin role, otherwise redirects to user dashboard
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.authService.getUserRole();
    
    if (userRole === 'admin') {
      return true;
    }
    
    // User is not an admin, redirect to user dashboard
    console.warn('AdminGuard: User does not have admin role, redirecting to user dashboard');
    return this.router.createUrlTree(['/user-dashboard']);
  }
}
