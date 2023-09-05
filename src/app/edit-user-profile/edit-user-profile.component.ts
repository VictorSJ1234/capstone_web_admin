import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css', '../../assets/bootstrap/bootstrap.min.css']
})
export class EditUserProfileComponent {
  
  userData: any;
  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;


  passwordMismatch = false;

  carouselModalOpen = false;


  openCarouselModal() {
    this.carouselModalOpen = true;
  }
  
  closeCarouselModal() {
    this.carouselModalOpen = false;
  }
  
 
  save(form: NgForm) {
    if (this.isFormValid()) {

      //open the confirmation modal
      this.openCarouselModal();
    } else {
      // Show error message
      if (this.userData.password !== this.userData.repeat_password) {
        console.log('Password and repeat password do not match.');
      }
      /** 
      if (!this.isPasswordValid()) {
        console.log('Password does not follow the required pattern.');
      }
      */
      if (this.userData.name === '' || this.userData.email === ''
      //|| this.userData.password === '' || this.userData.repeat_password === '' 
      || this.userData.gender === '' || this.userData.contact_number === ''
      || this.userData.barangay === '' || this.userData.city === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  confirmSave(form: NgForm) {
    this.closeCarouselModal(); // Close the confirmation modal
  
    // Call the service to edit admin data
    form.value.profilePicture = this.userData.profilePicture;

      // Call the service to edit admin data
      this.adminService.editUser(this.userData._id, form.value).subscribe(
        (response) => {
          console.log('Admin data updated successfully', response);
        },
        (error) => {
          console.error('Error updating admin data', error);
        }
      );
  }

  isPasswordValid(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(this.userData.password);
  }

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.userData.email);
  }

  isFormValid(): boolean {
    return (
      this.userData.name.trim() !== '' &&
      this.userData.email.trim() !== '' &&
      this.userData.birthday.trim() !== '' &&
      this.userData.gender.trim() !== '' &&
      this.userData.contact_number.trim() !== '' &&
      //!this.passwordMismatch &&
      this.userData.barangay.trim() !== '' &&
      !this.isEmailInvalid()
    );
  }

  /** 

  checkPasswordMatch() {
    this.passwordMismatch = this.userData.password !== this.userData.repeat_password;
  }
  */

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private adminService: AdminRegistrationService,) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userData = history.state.userData;
      this.profilePicture = this.userData.profilePicture;
      // Convert the base64 image to a data URL
      if (this.profilePicture) {
        this.image = 'data:image/jpeg;base64,' + this.profilePicture;
      }
    });
    window.scrollTo(0, 0);
  }

  cancel() {
    this.location.back();
  }  
}
