/**
 * @fileoverview User Dashboard Component
 * @description Main dashboard for authenticated users to view meal info and generate QR codes
 * 
 * CHANGES MADE:
 * - Resolved Git merge conflict (kept HEAD version as both were identical)
 * - SECURITY FIX: Moved encryption keys to environment configuration
 * - Removed unused import (HostListener, QrGenerationComponent)
 * - Added documentation comments
 */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

/**
 * User interface for dashboard display
 */
interface User {
  id: number;
  username: string;
  matricNumber: string;
  mealId?: number;
  mealType: string;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userDetails: User | null = null;
  mealHistory: any[] = [];
  mealsLeft: number = 0;
  mealsUsed: number = 0;
  showQRCode = false;
  qrData = '';
  qrHistory: any;
  mealPlan: string = 'Not assigned';

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  /**
   * Loads current user details from the API
   * Also triggers loading of meal history and status
   */
  loadUserDetails() {
    this.userService.loadUserDetails().subscribe({
      next: (response) => {
        console.log("User Details:", response);
        this.userDetails = response;

        // Store userId in localStorage for later use
        if (this.userDetails?.id) {
          localStorage.setItem('userId', this.userDetails.id.toString());
          this.loadMealHistory(this.userDetails.id);
          this.loadMealStatus();
        }

        // Determine meal plan based on mealId
        this.mealPlan = this.getMealPlan(this.userDetails?.mealId);
      },
      error: (err) => {
        console.error("Error fetching user details:", err);
      }
    });
  }

  /**
   * Maps meal ID to human-readable meal plan description
   * @param mealId - The meal plan ID from user data
   * @returns Human-readable meal plan string
   */
  getMealPlan(mealId?: number): string {
    switch (mealId) {
      case 1:
        return 'Breakfast & Lunch';
      case 2:
        return 'Breakfast & Supper';
      case 3:
        return 'Lunch & Supper';
      case 4:
        return 'Breakfast, Lunch & Supper';
      default:
        return 'Not assigned';
    }
  }

  /**
   * Generates and toggles display of encrypted QR code for meal authentication
   * SECURITY: Uses encryption keys from environment configuration
   */
  toggleQRCode() {
    if (!this.userDetails) {
      console.error("No user details available!");
      return;
    }

    // SECURITY FIX: Keys now loaded from environment configuration
    const secretKey = environment.encryptionKey;
    const hmacKey = environment.hmacKey;
    const now = new Date();

    // Step 1: Prepare the raw data
    const qrData = JSON.stringify({
      id: this.userDetails.id,
      username: this.userDetails.username,
      matricNumber: this.userDetails.matricNumber,
      mealId: this.userDetails.mealId || 'Not assigned',
      timestamp: now.toISOString()
    });

    // Step 2: Generate HMAC Signature for integrity verification
    const hmacSignature = CryptoJS.HmacSHA256(qrData, hmacKey).toString();

    // Step 3: Append Signature to Data
    const signedData = JSON.stringify({ ...JSON.parse(qrData), signature: hmacSignature });

    // Step 4: Encrypt the Signed Data
    const encryptedData = CryptoJS.AES.encrypt(signedData, secretKey).toString();

    // Step 5: Use the Encrypted Data as QR Code Content
    this.qrData = encryptedData;

    // Toggle QR Code Display
    this.showQRCode = !this.showQRCode;
  }

  /**
   * Loads meal history for the user from the API
   * @param userId - The user's ID
   */
  loadMealHistory(userId: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No authentication token found!");
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = `${environment.apiUrl}/api/v1/meal/history/${userId}`;

    this.http.get(apiUrl, { headers }).subscribe({
      next: (history: any) => {
        console.log("Meal History:", history);
        this.mealHistory = history;
      },
      error: (err) => {
        console.error("Error fetching meal history:", err);
      }
    });
  }

  /**
   * Returns the 10 most recent meal history records for display
   * @returns Array of latest 10 meal records
   */
  getLatestMealHistory(): any[] {
    return this.mealHistory.slice(0, 10);
  }

  /**
   * Fetches the user's current meal status (meals left/used)
   */
  loadMealStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No authentication token found!");
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = `${environment.apiUrl}/api/v1/user-meal/user-meal-status`;

    this.http.get(apiUrl, { headers }).subscribe({
      next: (mealStatus: any) => {
        console.log("Meal Status:", mealStatus);
        this.mealsLeft = mealStatus.mealsLeft;
        this.mealsUsed = mealStatus.mealsUsed;
      },
      error: (err) => {
        console.error("Error fetching meal status:", err);
      }
    });
  }
}
