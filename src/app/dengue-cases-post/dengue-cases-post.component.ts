import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { AdminRegistrationService } from '../shared/admin-registration.service';


@Component({
  selector: 'app-dengue-cases-post',
  templateUrl: './dengue-cases-post.component.html',
  styleUrls: ['./dengue-cases-post.component.css','../../assets/bootstrap/bootstrap.min.css'] ,
  providers: [AdminRegistrationService]
})
export class DengueCasesPostComponent {
  constructor(private adminService: AdminRegistrationService, private router: Router, private location: Location) {}
  
  formData = {
    project_title: '',
    project_date: '',
    details: '',
    project_time: '',
  };
  passwordMismatch = false;

  isLoading: boolean = false;
  

  carouselModalSuccess = false;

  base64container!: string;

  done() {
    this.carouselModalSuccess = false;
    this.router.navigate(['/manage-dengue-cases']);
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
  }


  selectedFile: File | null = null;
  selectedFileName = 'Choose file';

  save(form: NgForm) {
    this.isLoading = true;
    if (this.isFormValid()) {
      if (this.selectedFile) {
        // Convert selected file to Base64
        this.convertFileToBase64(this.selectedFile, (base64String) => {
          // Assign the Base64 string to form.value.uploaded_file
          this.base64container = base64String;
          form.value.uploaded_file = this.base64container;
          this.adminService.createPost(form.value).subscribe(
            (response) => {
              this.isLoading = false; 
              this.openCarouselModalSuccess();
              console.log('Project created successfully:', response);
            },
            (error) => {
              console.error('Error creating project:', error);
            }
          );
        });
      } 
      if (!this.selectedFile) {
        form.value.uploaded_file = '';
        this.adminService.createPost(form.value).subscribe(
          (response) => {
            this.isLoading = false; 
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
      if (this.formData.project_title === '' || this.formData.details === ''
      || this.formData.project_time === '' || this.formData.project_date === '') {
        this.isLoading = false; 
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
      this.formData.details.trim() !== '' &&
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
