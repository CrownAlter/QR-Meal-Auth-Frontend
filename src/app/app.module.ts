<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpBackend} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { QrCodeComponent } from 'ng-qrcode';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { QrGenerationComponent } from './user/qr-generation/qr-generation.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
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
    FormsModule,
    HttpClientModule,
    QrCodeComponent,
    ZXingScannerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
=======
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpBackend} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { QrCodeComponent } from 'ng-qrcode';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { QrGenerationComponent } from './user/qr-generation/qr-generation.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
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
    FormsModule,
    HttpClientModule,
    QrCodeComponent,
    ZXingScannerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> 774c2dbc15d0d1f2429daa384826b05dd6c18d0b
