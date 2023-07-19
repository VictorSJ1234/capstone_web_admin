import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css', '../../assets/bootstrap/bootstrap.min.css']
})
export class EditUserProfileComponent {
  image: string;
  username: string;

  formData = {
    fullname: '',
    email: '',
    password: '',
    repeat_password: '',
    birthday: '',
    gender: '',
    contactNumber: '',
    barangay: '',
    city: 'Pasig City',
  };
  passwordMismatch = false;

  save() {
    if (this.isFormValid()) {
      // logged_in
      console.log('data:', this.formData);
    } else {
      // Show error message
      if (this.formData.password !== this.formData.repeat_password) {
        console.log('Password and repeat password do not match.');
      }
      if (!this.isPasswordValid()) {
        console.log('Password does not follow the required pattern.');
      }
      if (this.formData.fullname === '' || this.formData.email === ''
      || this.formData.password === '' || this.formData.repeat_password === '' 
      || this.formData.gender === '' || this.formData.contactNumber === ''
      || this.formData.barangay === '' || this.formData.city === '') {
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
      this.formData.fullname.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.birthday.trim() !== '' &&
      this.formData.password.trim() !== '' &&
      this.formData.repeat_password.trim() !== '' &&
      this.formData.gender.trim() !== '' &&
      this.formData.contactNumber.trim() !== '' &&
      !this.passwordMismatch &&
      this.formData.barangay.trim() !== '' &&
      this.formData.city.trim() !== '' &&
      !this.isEmailInvalid()
    );
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.formData.password !== this.formData.repeat_password;
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.username = '';
    this.image = '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.image = params['image'];
    });
    window.scrollTo(0, 0);
  }
}
