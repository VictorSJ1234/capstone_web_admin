import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { AuthService } from '../authService/auth.service';

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
  showConnectionError = false;
  showPassword = false;
  isLoading: boolean = false;

  constructor(private adminService: AdminRegistrationService, private router: Router, private authService: AuthService) {}

  async login() {
    this.isLoading = true; 
    if (this.isFormValid()) {
      try {
        const response = await this.adminService.login(
          this.formData.email,
          this.formData.password
        ).toPromise();

        if (response.status && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.official_role);
          this.authService.login(response._id, response.official_role);
          console.log(response._id);

          if (response.official_role === 'Dengue Task Force') {
            this.isLoading = false; 
            this.router.navigate(['/admin-dashboard']);
          } 
          else if (response.official_role === 'Barangay Admin') {
            this.isLoading = false; 
            this.router.navigate(['/barangay-dashboard']);
          } 
          else if (response.official_role === 'Admin') {
            this.isLoading = false; 
            this.router.navigate(['/super-admin-dashboard']);
          } 
          else {
            this.isLoading = false; 
            this.openCarouselModal();
          }
        } else {
          this.isLoading = false; 
          console.log('Invalid login credentials.');
          this.showError = true;
        }
      } catch (error) {
        this.isLoading = false; 
        console.error('An error occurred during login:', error);
        this.showConnectionError = true;
      }
    }else {
      if (this.formData.email === '' || this.formData.password === '') {
        this.isLoading = false; 
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        this.isLoading = false; 
        console.log('Invalid Email.');
      }
    }
  }

  showSuccessModal = false;


  carouselModalOpen = false;
  
  
  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.formData.email);
  }

  closeModal() {
    this.closeCarouselModal();
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
