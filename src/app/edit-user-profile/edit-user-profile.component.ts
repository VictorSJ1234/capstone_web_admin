import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService]
})
export class EditUserProfileComponent {
  
  userData: any;
  fetchedUserData: any = {};
  userId: any; //container of userId
  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;

  passwordMismatch = false;

  carouselModalOpen = false;
  carouselModalSuccess = false;

  isLoading: boolean = true;


  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  responseSent() {
    this.carouselModalSuccess = false;
    this.carouselModalOpen = false;
    this.ngOnInit();
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
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
      if (this.fetchedUserData[0].password !== this.fetchedUserData[0].repeat_password) {
        console.log('Password and repeat password do not match.');
      }
      /** 
      if (!this.isPasswordValid()) {
        console.log('Password does not follow the required pattern.');
      }
      */
      if (this.fetchedUserData[0].name === '' || this.fetchedUserData[0].email === ''
      //|| this.userData.password === '' || this.userData.repeat_password === '' 
      || this.fetchedUserData[0].gender === '' || this.fetchedUserData[0].contact_number === ''
      || this.fetchedUserData[0].barangay === '' || this.fetchedUserData[0].city === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  confirmSave(form: NgForm) {
    this.isLoading = true;
    this.closeCarouselModal(); // Close the confirmation modal
  
    // Call the service to edit admin data
    form.value.profilePicture = this.fetchedUserData[0].profilePicture;

      // Call the service to edit admin data
      this.adminService.editUser(this.fetchedUserData[0]._id, form.value).subscribe(
        (response) => {
          this.isLoading = false; 
          this.openCarouselModalSuccess();
          console.log('Admin data updated successfully', response);
        },
        (error) => {
          console.error('Error updating admin data', error);
        }
      );
  }

  isPasswordValid(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(this.fetchedUserData[0].password);
  }

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.fetchedUserData[0].email);
  }

  isFormValid(): boolean {
    return (
      this.fetchedUserData[0].name.trim() !== '' &&
      this.fetchedUserData[0].email.trim() !== '' &&
      this.fetchedUserData[0].birthday.trim() !== '' &&
      this.fetchedUserData[0].gender.trim() !== '' &&
      this.fetchedUserData[0].contact_number.trim() !== '' &&
      //!this.passwordMismatch &&
      this.fetchedUserData[0].barangay.trim() !== '' &&
      !this.isEmailInvalid()
    );
  }

  /** 

  checkPasswordMatch() {
    this.passwordMismatch = this.userData.password !== this.userData.repeat_password;
  }
  */

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private adminService: AdminRegistrationService,) {
    this.fetchedUserData = [0];
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.queryParams.subscribe(params => {
      this.userData = history.state.userData;
      this.userId = this.userData._id;

      this.adminService.getUserData(this.userId).subscribe(
        (response: any) => {
          this.isLoading = false; 
          this.fetchedUserData = response.userInformationData; // Assign fetched data to userData

          // Convert the base64 image to a data URL
          if (this.fetchedUserData[0].profilePicture) {
            this.image = 'data:image/jpeg;base64,' + this.fetchedUserData[0].profilePicture;
          }
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
    window.scrollTo(0, 0);
  }

  cancel() {
    this.location.back();
  }  
}
