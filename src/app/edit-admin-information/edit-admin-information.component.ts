// edit-admin-information.component.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-admin-information',
  templateUrl: './edit-admin-information.component.html',
  styleUrls: ['./edit-admin-information.component.css', '../../assets/bootstrap/bootstrap.min.css']
})
export class EditAdminInformationComponent {
  adminData: any;
  adminProfilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;


  passwordMismatch = false;

  save() {
    if (this.isFormValid()) {
      // logged_in
      console.log('data:', this.adminData);
    } else {
      // Show error message
      if (this.adminData.password !== this.adminData.repeat_password) {
        console.log('Password and repeat password do not match.');
      }
      if (!this.isPasswordValid()) {
        console.log('Password does not follow the required pattern.');
      }
      if (this.adminData.firstname === '' || this.adminData.email === '' || this.adminData.username === '' || this.adminData.lastname === ''
      || this.adminData.gender === '' || this.adminData.contactNumber === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  isPasswordValid(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(this.adminData.password);
  }

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.adminData.email);
  }

  isFormValid(): boolean {
    return (
      this.adminData.firstname.trim() !== '' &&
      this.adminData.lastname.trim() !== '' &&
      this.adminData.username.trim() !== '' &&
      this.adminData.email.trim() !== '' &&
      //
      //this.adminData.password.trim() !== '' &&
     //this.adminData.repeat_password.trim() !== '' &&
      this.adminData.gender.trim() !== '' &&
      this.adminData.contactNumber.trim() !== '' &&
      !this.passwordMismatch &&
      !this.isEmailInvalid()
    );
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.adminData.password !== this.adminData.repeat_password;
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.adminData = history.state.adminData;
        this.adminProfilePicture = this.adminData.adminProfilePicture;
        // Convert the base64 image to a data URL
        if (this.adminProfilePicture) {
          this.image = 'data:image/jpeg;base64,' + this.adminProfilePicture;
        }
      });
      window.scrollTo(0, 0);
    }
}
