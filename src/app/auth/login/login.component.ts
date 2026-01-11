/**
 * @fileoverview Login Component
 * @description Handles user authentication with email and password
 * 
 * CHANGES MADE:
 * - Resolved Git merge conflict (kept HEAD version as both were identical)
 * - ADDED: Store userRole in localStorage for route guards
 * - Added documentation comments
 */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Handles form submission for user login
   * Validates credentials and stores authentication data on success
   */
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginError = "Please enter valid email and password.";
      return;
    }
  
    const loginData = this.loginForm.value;
  
    // Prepare x-www-form-urlencoded data
    const formData = new HttpParams()
      .set('email', loginData.email)
      .set('password', loginData.password);
  
    // Send POST request to authentication endpoint
    this.http.post(`${environment.apiUrl}/api/v1/auth/login`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).subscribe({
      next: (response: any) => {
        alert('Login Successful!');
  
        // Extract and store the token
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
        } else {
          console.error("No token received in login response!");
          return;
        }
  
        // Extract user role and navigate based on role
        const role = response.user?.role;
        
        // ADDED: Store user role in localStorage for route guards
        if (role) {
          localStorage.setItem('userRole', role);
        }
        
        if (role === 'user') {
          this.router.navigate(['/user-dashboard']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.error("Unknown role:", role);
          alert("Unauthorized role. Contact admin.");
        }
      },
      error: (err) => {
        console.error("Login Error:", err);
        this.loginError = err.error?.message || 'Invalid credentials!';
      }
    });
  }
}
