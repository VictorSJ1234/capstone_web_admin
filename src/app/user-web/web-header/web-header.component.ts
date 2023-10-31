import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css']
})
export class WebHeaderComponent {
  currentDate = '';
  currentTime = '';

  constructor(private router: Router) {
    this.updateDateTime();

    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentDate = this.formatDate(now);
    this.currentTime = this.formatTime(now);
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  private formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  }

  redirectToLogin(): void {
    this.router.navigate(['/account-login']); 
  }

  // Redirect to the registration page
  redirectToRegister(): void {
    this.router.navigate(['/account-registration']); 
  }
}
