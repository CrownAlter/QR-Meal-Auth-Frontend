/**
 * @fileoverview Application Routing Module
 * @description Defines all application routes with authentication guards
 * 
 * CHANGES MADE:
 * - Resolved Git merge conflict (kept HEAD version as both were identical)
 * - Added AuthGuard protection for authenticated routes
 * - Added AdminGuard protection for admin-only routes
 * - Added wildcard route for 404 handling
 * - Added documentation comments
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { QrScannerComponent } from './admin/qr-scanner/qr-scanner.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './intro/landing-page/landing-page.component';
import { QrHistoryComponent } from './user/qr-history/qr-history.component';
import { AdminUserSearchComponent } from './admin/admin-user-search/admin-user-search.component';

// Route Guards - ADDED: Authentication and authorization guards
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';

const routes: Routes = [
  // Public routes - accessible without authentication
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected user routes - require authentication
  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent,
    canActivate: [AuthGuard]  // ADDED: Requires authentication
  },
  { 
    path: 'qr-history', 
    component: QrHistoryComponent,
    canActivate: [AuthGuard]  // ADDED: Requires authentication
  },
  
  // Protected admin routes - require authentication and admin role
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]  // ADDED: Requires authentication + admin role
  },
  { 
    path: 'scan', 
    component: QrScannerComponent,
    canActivate: [AuthGuard, AdminGuard]  // ADDED: Requires authentication + admin role
  },
  { 
    path: 'user-search', 
    component: AdminUserSearchComponent,
    canActivate: [AuthGuard, AdminGuard]  // ADDED: Requires authentication + admin role
  },
  
  // ADDED: Wildcard route for 404 - redirects to landing page
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
