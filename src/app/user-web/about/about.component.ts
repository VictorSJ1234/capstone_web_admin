import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../../../assets/bootstrap/bootstrap.min.css']
})
export class AboutComponent {

  formData = {
    subject: '',
    report: '',
    email: '',
  };
  selectedFile: File | null = null;
  selectedFileName = 'Choose file';

  submit() {
    if (this.isFormValid()) {
      // logged_in
      console.log('data:', this.formData);
      if (this.selectedFile) {
        // Handle file upload logic here
        console.log('File selected:', this.selectedFile);
      }
    } else {
      // Show error message
      if (this.formData.subject === '' || this.formData.report === '' || this.formData.email === '') {
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
      this.formData.report.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      !this.isEmailInvalid() 
    );
  }
  isEmailInvalid(): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return !emailPattern.test(this.formData.email);
  }

  handleFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
  }

}
