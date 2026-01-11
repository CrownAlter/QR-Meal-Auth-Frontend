/**
 * @fileoverview Main Application Module
 * @description Root module that bootstraps the Angular application
 * 
 * CHANGES MADE:
 * - Resolved Git merge conflict (kept HEAD version as both were identical)
 * - Removed unused imports (HttpBackend, FormBuilder, FormGroup, Validators)
 * - Added documentation comments
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Third-party modules
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrCodeComponent } from 'ng-qrcode';

// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

// Application components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { QrGenerationComponent } from './user/qr-generation/qr-generation.component';
import { QrScannerComponent } from './admin/qr-scanner/qr-scanner.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './intro/landing-page/landing-page.component';
import { QrHistoryComponent } from './user/qr-history/qr-history.component';
import { AdminUserSearchComponent } from './admin/admin-user-search/admin-user-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    QrGenerationComponent,
    QrScannerComponent,
    AdminDashboardComponent,
    LandingPageComponent,
    QrHistoryComponent,
    AdminUserSearchComponent,
  ],
  imports: [
    // Angular core modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Third-party modules
    QrCodeComponent,
    ZXingScannerModule,
    
    // Angular Material modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    
    // Application routing
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
