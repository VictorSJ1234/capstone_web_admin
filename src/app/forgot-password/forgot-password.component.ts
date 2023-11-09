import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AdminRegistrationService } from '../shared/admin-registration.service';
import { AdminRegistration } from '../shared/admin-registration.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService]
})
export class ForgotPasswordComponent {
  constructor(private adminService: AdminRegistrationService, private router: Router) {}


  //initialize form data for validation
  formData = {
    email: '',
    password: '',
    repeat_password: '',
  };

  isLoading: boolean = false;

  selectedFiles: File[] = [];

  openFileInput() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
      fileInput.click();
    }
  }

  removeSelectedFile(index: number) {
    if (index >= 0 && index < this.selectedFiles.length) {
      this.selectedFiles.splice(index, 1);
    }
  }

  handleFileUpload(event: any) {
    const files = event.target.files;
    if (files) {
      if (this.selectedFiles.length + files.length > 2) {
        console.log('You can upload a maximum of 2 files.');
        return;
      }
  

      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }
  
  


  convertFilesToBase64(files: File[], callback: (base64Array: string[]) => void) {
    const base64Array: string[] = [];
    let remainingFiles = files.length;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        let base64String = reader.result as string;
        const prefixIndex = base64String.indexOf(';base64,');
        if (prefixIndex !== -1) {
          base64String = base64String.slice(prefixIndex + 8);
        }
        base64Array.push(base64String);

        // Check if all files have been processed
        remainingFiles--;
        if (remainingFiles === 0) {
          callback(base64Array);
        }
      };
      reader.readAsDataURL(file);
    });
  }
  
  showEmailError = false;

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
    this.router.navigate(['/account-login']); // route of the login page
  }


  // Function to handle the registration process
  register(form: NgForm) {
    this.isLoading = true; 
    if (this.isFormValid()) {
      this.adminService.resetPassword(this.formData.email, this.formData.password).subscribe(
        (response) => {
            this.formData = {
                email: '',
                password: '',
                repeat_password: '',
            };
            this.isLoading = false; 
            this.openCarouselModal();
            console.log('Password changed successfully', response);
        },
        (error) => {

          if (error.status === 404) {
            this.isLoading = false; 
            if (error.error && error.error.error === 'USER_NOT_FOUND') {
              this.showEmailError = true;
            }
          }
          /** 
          if (error.statusCode == 404 || error.statusCode == 500) {
            // Show the password error
            this.isLoading = false; 
            this.showEmailError = true;
          } 
          */else {
            false
            console.error('Error changing password', error);
          }
        }
    );


    } else {
      this.isLoading = false; 
      // Show error message
      if (this.formData.password !== this.formData.repeat_password) {
        console.log('Password and repeat password do not match.');
      }
      if (!this.isPasswordValid()) {
        console.log('Password does not follow the required pattern.');
      }
      if (this.formData.email === '' || this.formData.password === '' || this.formData.repeat_password === '' ) {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  
  // Function to check if the password follows the required pattern
  isPasswordValid(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*]).{10,}$/;
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
      this.formData.email.trim() !== '' &&
      this.formData.password.trim() !== '' &&
      this.formData.repeat_password.trim() !== '' &&
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
//test
