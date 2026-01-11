import { Component } from '@angular/core';
import { User, UserService } from '../../user/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  userDetails: User | null = null;
  qrHistory: any;
  showScanner = false; // ✅ Controls QR scanner visibility

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.loadUserDetails().subscribe({
      next: (response) => {
        console.log("User Details:", response);
        this.userDetails = response; // ✅ Assign response to userDetails
      },
      error: (err) => {
        console.error("Error fetching user details:", err);
      }
    });
  }

  // ✅ Toggle QR Scanner visibility
  toggleScanner() {
    this.showScanner = !this.showScanner;
  }
}
