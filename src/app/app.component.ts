/**
 * @fileoverview Root Application Component
 * @description Main component that handles app-wide layout, sidebar navigation, and routing
 * 
 * CHANGES MADE:
 * - Resolved Git merge conflict (kept HEAD version as both were identical)
 * - Added documentation comments
 * - Note: DOM manipulation kept for sidebar functionality (could be refactored to use Angular patterns)
 */
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QR-Frontend';
  sidebarOpen = false;

  constructor(public router: Router, private userService: UserService) {}

  /**
   * Toggles the sidebar open/closed state
   * Updates DOM classes for sidebar, overlay, and main wrapper
   */
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainWrapper = document.querySelector('.main-wrapper');

    if (this.sidebarOpen) {
      sidebar?.classList.add('open');
      overlay?.classList.add('active');
      mainWrapper?.classList.add('shifted');
    } else {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
      mainWrapper?.classList.remove('shifted');
    }
  }

  /**
   * Closes the sidebar and removes all active classes
   */
  closeSidebar() {
    this.sidebarOpen = false;
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('overlay')?.classList.remove('active');
    document.querySelector('.main-wrapper')?.classList.remove('shifted');
  }

  /**
   * Keyboard event handler - closes sidebar on Escape key press
   * @param event - The keyboard event
   */
  @HostListener('window:keydown', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.sidebarOpen) {
      this.closeSidebar();
    }
  }

  /**
   * Checks if the current route is a public page (no authentication required)
   * @returns true if on login, register, or landing page
   */
  isPublicPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register' || this.router.url === '/';
  }

  /**
   * Checks if the current route is an admin dashboard page
   * @returns true if URL starts with '/admin-dashboard'
   */
  isAdminDashboard(): boolean {
    return this.router.url.startsWith('/admin-dashboard');
  }

  /**
   * Logs out the current user via UserService
   */
  logout() {
    this.userService.logout();
  }
}
