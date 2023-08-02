import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-community-project',
  templateUrl: './edit-community-project.component.html',
  styleUrls: ['./edit-community-project.component.css',  '../../assets/bootstrap/bootstrap.min.css']
})
export class EditCommunityProjectComponent {

  formData = {
    title: '',
    date: '',
    fileDescription: '',
    postDescription: '',
    time: '',
  };
  passwordMismatch = false;

  selectedFile: File | null = null;
  selectedFileName = 'Choose file';

  save() {
    if (this.isFormValid()) {
      // logged_in
      console.log('data:', this.formData);
      if (this.selectedFile) {
        // Handle file upload logic here
        console.log('File selected:', this.selectedFile);
      }
    } else {
      // Show error message
      if (this.formData.title === '' || this.formData.postDescription === '' || this.formData.fileDescription === '' 
      || this.formData.time === '' || this.formData.date === '') {
        console.log('Please fill out all fields.');
      }
    }
  }


  isFormValid(): boolean {
    return (
      this.formData.title.trim() !== '' &&
      this.formData.date.trim() !== '' &&
      this.formData.fileDescription.trim() !== '' &&
      this.formData.postDescription.trim() !== '' &&
      this.formData.time.trim() !== '' &&
      !this.passwordMismatch 
    );
  }

  handleFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
