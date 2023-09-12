import { Component } from '@angular/core';

@Component({
  selector: 'app-dengue-cases-post',
  templateUrl: './dengue-cases-post.component.html',
  styleUrls: ['./dengue-cases-post.component.css','../../assets/bootstrap/bootstrap.min.css']
})
export class DengueCasesPostComponent {

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
