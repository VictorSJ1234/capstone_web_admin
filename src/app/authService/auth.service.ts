import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private official_role: string;

  constructor() {
    // Check if the user is authenticated upon initialization
    this.isAuthenticated = !!sessionStorage.getItem('token');

    this.official_role = sessionStorage.getItem('userRole') || 'Barangay Health Officer';
  }

  // Simulate a login
  login(_id: string, official_role: string) {
    this.isAuthenticated = true;
    sessionStorage.setItem('token', 'your_token_here');
    sessionStorage.setItem('userId', _id);
    sessionStorage.setItem('userRole', official_role);
    localStorage.removeItem('token');
  }

  // Simulate a logout
  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.clear();
    window.location.replace('account-login');
  }

  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Get the user ID
  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  getUserRole(): string| null {
    return sessionStorage.getItem('userRole');
  }

}
