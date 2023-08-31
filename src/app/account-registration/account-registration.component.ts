import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AdminRegistrationService } from '../shared/admin-registration.service';
import { AdminRegistration } from '../shared/admin-registration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService]
})
export class AccountRegistrationComponent {

  constructor(private adminService: AdminRegistrationService, private router: Router) {}


  //initialize form data for validation
  formData = {
    firstname: '',
    lastname: '',
    gender: '',
    contact_number: '', 
    email: '',
    username: '',
    password: '',
    repeat_password: '',
    role: '',
    adminProfilePicture: '',
  };

  showEmailError = false;
  showUsernameError = false;

  passwordMismatch = false;
  showPassword = false;

  showSuccessModal = false;


  carouselModalOpen = false;
  
  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

  redirectToLogin() {
    this.router.navigate(['/']); // route of the login page
  }


  // Function to handle the registration process
  register(form: NgForm) {
    if (this.isFormValid()) {

      //initial rolee
      form.value.role = 'admin';
      form.value.adminProfilePicture = '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'
      +'D/2gAIAQMBAT8ArGPomoYx186Iz//Z'.toString();

      //passing the value to adminService to sshared file
      this.adminService.registerAdmin(form.value)
        .subscribe(
          response => {
            console.log('Registration successful:', response);
            this.showSuccessModal = true;
            this.openCarouselModal(); 
            // successful registration
          },
          error => {
            console.error('Registration error:', error);
            if (error.status === 400) {
              if (error.error && error.error.error === 'Email must be unique.') {
                // Show the email error message
                this.showEmailError = true;
              }
              if (error.error && error.error.error === 'Username must be unique.') {
                this.showUsernameError = true; // Show the username error message
              }
            }
          }
        );
      //data sent to console
      console.log('data:', this.formData);
    } else {
      // Show error message
      if (this.formData.password !== this.formData.repeat_password) {
        console.log('Password and repeat password do not match.');
      }
      if (!this.isPasswordValid()) {
        console.log('Password does not follow the required pattern.');
      }
      if (this.formData.firstname === '' || this.formData.email === '' || this.formData.username === '' 
      || this.formData.password === '' || this.formData.repeat_password === '' || this.formData.lastname === ''
      || this.formData.gender === '' || this.formData.contact_number === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  
  // Function to check if the password follows the required pattern
  isPasswordValid(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(this.formData.password);
  }

  // Function to check if the email is in a valid format
  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.formData.email);
  }

  // Function to check if the form is valid before submission
  //checks if data are not empty or followed the right functions
  isFormValid(): boolean {
    return (
      this.formData.firstname.trim() !== '' &&
      this.formData.lastname.trim() !== '' &&
      this.formData.username.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.password.trim() !== '' &&
      this.formData.repeat_password.trim() !== '' &&
      this.formData.gender.trim() !== '' &&
      this.formData.contact_number.trim() !== '' &&
      !this.passwordMismatch &&
      !this.isEmailInvalid()
    );
  }

  // Function to check if the password and repeat password match
  checkPasswordMatch() {
    this.passwordMismatch = this.formData.password !== this.formData.repeat_password;
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
//test test