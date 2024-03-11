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
  showTermsModal = false;

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

  // Open terms and conditions modal
  redirectToRegister(): void {
    this.showTermsModal = true;
  }

  // Close terms and conditions modal
  closeTermsModal(): void {
    this.showTermsModal = false;
  }

  // Proceed with registration if terms are agreed
  agreeTermsAndRegister(): void {
    this.router.navigate(['/account-registration']);
    this.showTermsModal = false;
  }

  // Disagree with terms
  disagreeTerms(): void {
    this.showTermsModal = false;
  }

  openPdfInNewTab() {
    const pdfUrl = '../assets/terms_conditions/TERMS AND CONDITIONS_Mosquinator 2.pdf'; 
    window.open(pdfUrl, '_blank');
  }
}


