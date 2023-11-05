import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BarangayAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser() && this.authService.getUserRole() === 'Barangay Health Officer') {
      return true;
    } else {
      this.router.navigate(['account-login']);
      return false;
    }
  }
}
