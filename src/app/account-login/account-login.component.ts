import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css', '../../assets/bootstrap/bootstrap.min.css']
})
export class AccountLoginComponent {
  formData = {
    email: '',
    password: '',
    role: '' // Add role property to formData
  };
  showError = false;
  showPassword = false;

  constructor(private router: Router) {}

  register() {
    if (this.isFormValid()) {
      const matchedCredentials = this.isValidCredentials();
      if (matchedCredentials) {
        console.log('Logged in:', this.formData);
        this.showError = false;
        if (matchedCredentials.role === 'admin') {
          this.router.navigate(['/admin-dashboard']); // Redirect to admin-dashboard component for admin
        } else {
          this.router.navigate(['/reporting-home']); // Redirect to reporting-home component for user
        }
      } else {
        console.log('Invalid login credentials.');
        this.showError = true;
      }
    } else {
      // Show error message
      if (this.formData.email === '' || this.formData.password === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.formData.email);
  }

  isFormValid(): boolean {
    return (
      this.formData.email.trim() !== '' &&
      this.formData.password.trim() !== ''
    );
  }

  isValidCredentials(): { email: string; password: string; role: string } | undefined {
    const credentials = [
      { email: 'renesanjuan3302@gmail.com', password: 'Victor123@', role: 'user' },
      { email: 'admin@gmail.com', password: 'Admin123@', role: 'admin' },
      { email: 'user3@example.com', password: 'password3', role: 'user' },
    ];

    return credentials.find(
      (cred) =>
        cred.email === this.formData.email && cred.password === this.formData.password
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
