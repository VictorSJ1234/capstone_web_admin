import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AdminRegistrationService } from '../shared/admin-registration.service';

@Component({
  selector: 'app-create-community-project',
  templateUrl: './create-community-project.component.html',
  styleUrls: ['./create-community-project.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService]
})
export class CreateCommunityProjectComponent {

  constructor(private adminService: AdminRegistrationService, private router: Router, private location: Location) {}
  
  formData = {
    project_title: '',
    project_date: '',
    attachment_description: '',
    post_description: '',
    project_time: '',
  };
  passwordMismatch = false;
  

  carouselModalSuccess = false;

  base64container!: string;

  done() {
    this.carouselModalSuccess = false;
    this.ngOnInit();
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
  }


  selectedFile: File | null = null;
  selectedFileName = 'Choose file';

  save(form: NgForm) {
    if (this.isFormValid()) {
      if (this.selectedFile) {
        // Convert selected file to Base64
        this.convertFileToBase64(this.selectedFile, (base64String) => {
          // Assign the Base64 string to form.value.uploaded_file
          this.base64container = base64String;
          form.value.uploaded_file = this.base64container;
          this.adminService.createProject(form.value).subscribe(
            (response) => {
              this.openCarouselModalSuccess();
              console.log('Project created successfully:', response);
            },
            (error) => {
              console.error('Error creating project:', error);
            }
          );
        });
      } 
      else{
        form.value.uploaded_file = '';
        this.adminService.createProject(form.value).subscribe(
          (response) => {
            this.openCarouselModalSuccess();
            console.log('Project created successfully:', response);
          },
          (error) => {
            console.error('Error creating project:', error);
          }
        );
      }
    }
    else {
      // Show error message
      if (this.formData.project_title === '' || this.formData.post_description === '' || this.formData.attachment_description === '' 
      || this.formData.project_time === '' || this.formData.project_date === '') {
        console.log('Please fill out all fields.');
      }
    }
  }

  removeSelectedFile() {
    this.selectedFile = null;
    this.selectedFileName = 'No Chosen File';
  }

  openFileInput() {
      const fileInput = document.getElementById('fileUpload');
      if (fileInput) {
          fileInput.click();
      }
  }


  isFormValid(): boolean {
    return (
      this.formData.project_title.trim() !== '' &&
      this.formData.project_date.trim() !== '' &&
      this.formData.attachment_description.trim() !== '' &&
      this.formData.post_description.trim() !== '' &&
      this.formData.project_time.trim() !== '' &&
      !this.passwordMismatch 
    );
  }

  handleFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
  }

  // Function to convert a File to Base64
  convertFileToBase64(file: File, callback: (base64String: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let base64String = reader.result as string;
      const prefixIndex = base64String.indexOf(';base64,');
      if (prefixIndex !== -1) {
        base64String = base64String.slice(prefixIndex + 8);
      }

      callback(base64String);
    };
    reader.readAsDataURL(file);
  }

  cancel() {
    this.location.back();
  } 

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
