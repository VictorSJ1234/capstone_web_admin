import { Component } from '@angular/core';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css', '../../assets/bootstrap/bootstrap.min.css']
})
export class AccountRegistrationComponent {
  formData = {
    firstname: '',
    lastname: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    repeat_password: '',
  };

  passwordMismatch = false;

  register() {
    if (this.isFormValid()) {
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
      || this.formData.gender === '' || this.formData.contactNumber === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  isPasswordValid(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(this.formData.password);
  }

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.formData.email);
  }

  isFormValid(): boolean {
    return (
      this.formData.firstname.trim() !== '' &&
      this.formData.lastname.trim() !== '' &&
      this.formData.username.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.password.trim() !== '' &&
      this.formData.repeat_password.trim() !== '' &&
      this.formData.gender.trim() !== '' &&
      this.formData.contactNumber.trim() !== '' &&
      !this.passwordMismatch &&
      !this.isEmailInvalid()
    );
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.formData.password !== this.formData.repeat_password;
  }
}
