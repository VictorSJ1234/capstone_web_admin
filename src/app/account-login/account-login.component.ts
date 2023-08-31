import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService]
})
export class AccountLoginComponent {
  formData = {
    email: '',
    password: '',
    role: '' 
  };
  showError = false;
  showPassword = false;

  constructor(private adminService: AdminRegistrationService, private router: Router) {}

  async login() {
    if (this.isFormValid()) {
      try {
        const response = await this.adminService.login(
          this.formData.email,
          this.formData.password
        ).toPromise();

        if (response.status && response.token) {
          // Save the token in local storage or a secure storage mechanism
          localStorage.setItem('token', response.token);

          if (response.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/account-registration']);
          }
        } else {
          console.log('Invalid login credentials.');
          this.showError = true;
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
        this.showError = true;
      }
    }else {
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


  //for testing only
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
