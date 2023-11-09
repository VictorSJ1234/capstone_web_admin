// edit-admin-information.component.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-barangay-admin-profile-edit',
  templateUrl: './barangay-admin-profile-edit.component.html',
  styleUrls: ['./barangay-admin-profile-edit.component.css', '../../assets/bootstrap/bootstrap.min.css']
})
export class BarangayAdminProfileEditComponent {

  adminData: any;
  fetchedAdminData: any = {};
  adminId: any; //container of adminId
  adminProfilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;


  passwordMismatch = false;

  carouselModalOpen = false;
  carouselModalSuccess = false;
  confirmSavePasswordModal = false;
  changePasswordModal = false;

  showPasswordError = false;

  isLoading: boolean = true;

  editMode = false; // Initially, edit mode is disabled

  formData = {
    password: '',
    repeat_password: '', 
    currentPassword: ''
  };

  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openImageUploader() {
    const imageUpload = document.getElementById('imageUpload') as HTMLInputElement;
    imageUpload.click();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Extract the base64 data from the URL
        const base64Data = e.target.result.split(',')[1]; // This will remove "data:image/png;base64," prefix
        this.image = e.target.result; 
        this.fetchedAdminData[0].adminProfilePicture = base64Data; 
      };
      reader.readAsDataURL(file);
    } else {
      // No file uploaded, clear the adminProfilePicture
      this.image = null;
      this.fetchedAdminData[0].adminProfilePicture = null;
    }
  }
  
  
  resetProfilePicture() {
    this.image = 'data:image/png;base64,' +
    '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'
      +'D/2gAIAQMBAT8ArGPomoYx186Iz//Z'.toString();
      
      this.fetchedAdminData[0].adminProfilePicture = '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'
      +'D/2gAIAQMBAT8ArGPomoYx186Iz//Z'.toString();
  }

  onDeleteButtonClicked() {
    // Reset the profile picture to the default
    this.resetProfilePicture();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  openConfirmSavePasswordModal() {
    this.confirmSavePasswordModal = true;
  }

  responseSent() {
    this.carouselModalSuccess = false;
    this.carouselModalOpen = false;
    this.confirmSavePasswordModal = false;
    this.ngOnInit();
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
  }
  
  closeCarouselModal() {
    this.carouselModalOpen = false;
    this.confirmSavePasswordModal = false;
    this.changePasswordModal = false;
  }

  save(form: NgForm) {
    if (this.isFormValid()) {
      //open the confirmation modal
      this.openCarouselModal();

    } else {
      // Show error message
      if (this.fetchedAdminData[0].fullname === '' || this.fetchedAdminData[0].birthday === ''
       || this.fetchedAdminData[0].email === '' || this.fetchedAdminData[0].gender === '' || this.fetchedAdminData[0].contact_number === '') {
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
  
    form.value.role = 'admin';
    form.value.office = this.fetchedAdminData[0].office.toString();
    form.value.official_role = this.fetchedAdminData[0].official_role.toString();
    form.value.adminProfilePicture = this.fetchedAdminData[0].adminProfilePicture;

    // Call the service to edit admin data
    this.adminService.editAdmin(this.adminData._id, form.value).subscribe(
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

  confirmSavePassword(form: NgForm){
    this.isLoading = true;
    this.adminService.changePassword(this.adminData._id, this.formData.currentPassword, this.formData.password).subscribe(
      (response) => {
          // Password changed successfully
          this.closeChangePasswordModal();
          this.formData = {
              password: '',
              repeat_password: '',
              currentPassword: '',
          };
          this.isLoading = false; 
          this.openCarouselModalSuccess();
          console.log('Password changed successfully', response);
      },
      (error) => {
        if (error.status === 401) {
          // Show the password error
          this.isLoading = false; 
          this.showPasswordError = true;
          this.confirmSavePasswordModal = false;
        } else {
          false
          console.error('Error changing password', error);
          this.confirmSavePasswordModal = false;
        }
      }
  );

  }

  savePassword(form: NgForm) {
    if (this.isPasswordFormValid()) {
      this.openConfirmSavePasswordModal();
        
    } else {
      this.isLoading = false; 
        console.log('Invalid password form');
    }
  }

  openChangePassword() {
    this.changePasswordModal = true;
  }

  closeChangePasswordModal() {
    this.changePasswordModal = false;
    this.formData = {
      password: '',
      repeat_password: '', 
      currentPassword: ''
    };
  }

  isPasswordValid(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*]).{10,}$/;
    return passwordPattern.test(this.formData.currentPassword);
  }

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.adminData.email);
  }

  isFormValid(): boolean {
    return (
      this.fetchedAdminData[0].fullname.trim() !== '' &&
      this.fetchedAdminData[0].birthday.trim() !== '' &&
      this.fetchedAdminData[0].email.trim() !== '' &&
      this.fetchedAdminData[0].gender.trim() !== '' &&
      this.fetchedAdminData[0].contact_number.trim() !== '' &&
      !this.isEmailInvalid()
    );
  }

  isPasswordFormValid(): boolean {
    return (
      this.formData.password.trim() !== '' &&
      this.formData.repeat_password.trim() !== '' &&
      this.formData.currentPassword.trim() !== '' &&
      !this.passwordMismatch 
    );
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.formData.password !== this.formData.repeat_password;
  }

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private adminService: AdminRegistrationService,) {
    this.fetchedAdminData = [0];
  }

  ngOnInit() {
    this.isLoading = true; 
    this.route.queryParams.subscribe(params => {
        this.adminData = history.state.adminData;
        this.adminId = this.adminData._id;

      this.adminService.getAdminData(this.adminId).subscribe(
        (response: any) => {
          this.isLoading = false; 
          this.fetchedAdminData = response.userAdminData; // Assign fetched data to userData

          // Convert the base64 image to a data URL
          if (this.fetchedAdminData[0].adminProfilePicture) {
            this.image = 'data:image/jpeg;base64,' + this.fetchedAdminData[0].adminProfilePicture;
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

