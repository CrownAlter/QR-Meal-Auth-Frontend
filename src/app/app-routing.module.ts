import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { QrScannerComponent } from './admin/qr-scanner/qr-scanner.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './intro/landing-page/landing-page.component';
import { QrHistoryComponent } from './user/qr-history/qr-history.component';
import { AdminUserSearchComponent } from './admin/admin-user-search/admin-user-search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingPageComponent},
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'scan', component: QrScannerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'qr-history', component: QrHistoryComponent },
  { path: 'user-search', component: AdminUserSearchComponent },
  // { path: 'landing', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
