import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { InquiryService } from '../inquiry.service'

@Component({
  selector: 'app-pasig-dengue-task-force',
  templateUrl: './pasig-dengue-task-force.component.html',
  styleUrls: ['./pasig-dengue-task-force.component.css', '../../../assets/bootstrap/bootstrap.min.css'],
  providers:  [InquiryService]
})
export class PasigDengueTaskForceComponent {
  
  formData = {
    subject: '',
    inquiry: '',
    email: '',
  };

  latestDenguePost: any;
  carouselModalSuccess = false;
  isLoading: boolean = false;
  selectedFiles: File[] = [];


  base64container!: string;

  done() {
    this.carouselModalSuccess = false;
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
  }



  constructor(private sharedService: InquiryService, private router: Router, private location: Location) {}

  selectedFile: File | null = null;
  selectedFileName = 'Choose file';

  ngOnInit(): void {
    this.isLoading = true;
    this.sharedService.getLatestDenguePost().subscribe(
      (response: any) => {
        this.latestDenguePost = response.latestDenguePost;
        console.error(this.latestDenguePost);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching latest dengue post:', error);
      }
    );
    window.scrollTo(0, 0);
  }

  convertToImage(base64String: string): string {
    // Check if the base64String is empty or null
    if (!base64String || base64String.trim() === '') {
      return '../../../assets/community_projects_images/clean_up_drive.png'; 
    }
  
    // Convert the base64 image to an image URL
    return `data:image/jpeg;base64,${base64String}`;
  }

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

  submit(form: NgForm) {
    if (this.isFormValid()) {
      this.isLoading = true;
    if (this.isFormValid()) {
      const selectedFiles = this.selectedFiles;

  
      if (selectedFiles.length > 0) {
        // Convert selected files to Base64
        this.convertFilesToBase64(selectedFiles, (base64Array) => {
          // Assign the array of Base64 strings to form.value.uploaded_file
          form.value.uploaded_file = base64Array;
  
          this.sharedService.createInquiry(form.value).subscribe(
            (inquiry) => {
              this.isLoading = false; 
              this.openCarouselModalSuccess();
              console.log('Inquiry created successfully:', inquiry);
              this.formData = {
                subject: '',
                inquiry: '',
                email: '',
              };
              this.selectedFiles = [];
            },
            (error) => {
              console.error('Error creating inquiry:', error);
            }
          );
        });
      } else {
        form.value.uploaded_file = [];
        this.sharedService.createInquiry(form.value).subscribe(
          (inquiry) => {
            this.isLoading = false; 
            this.openCarouselModalSuccess();
            console.log('inquiry created successfully:', inquiry);
            this.formData = {
              subject: '',
              inquiry: '',
              email: '',
            };
            this.selectedFiles = [];
          },
          (error) => {
            console.error('Error creating inquiry:', error);
          }
        );
      }
    }
    } else {
      this.isLoading = false; 
      // Show error message
      if (this.formData.subject === '' || this.formData.inquiry === '' || this.formData.email === '') {
        console.log('Please fill out all fields.');
      }
      if (this.isEmailInvalid()) {
        console.log('Invalid Email.');
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.subject.trim() !== '' &&
      this.formData.inquiry.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      !this.isEmailInvalid() 
    );
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

  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.formData.email);
  }

}
