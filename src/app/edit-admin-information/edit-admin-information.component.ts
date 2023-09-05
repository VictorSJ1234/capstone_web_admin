// edit-admin-information.component.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { NgForm } from '@angular/forms';

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
      if (this.adminData.firstname === '' || this.adminData.email === '' || this.adminData.username === '' || this.adminData.lastname === ''
      || this.adminData.gender === '' || this.adminData.contact_number === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  confirmSave(form: NgForm) {
    this.closeCarouselModal(); // Close the confirmation modal
  
    form.value.role = 'admin';
    form.value.adminProfilePicture = this.adminData.adminProfilePicture;

    // Call the service to edit admin data
    this.adminService.editAdmin(this.adminData._id, form.value).subscribe(
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

      this.adminData.gender.trim() !== '' &&
      this.adminData.contact_number.trim() !== '' &&
      !this.isEmailInvalid()
    );
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.adminData.password !== this.adminData.repeat_password;
  }

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private adminService: AdminRegistrationService,) {}

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

    cancel() {
      this.location.back();
    }  
}
