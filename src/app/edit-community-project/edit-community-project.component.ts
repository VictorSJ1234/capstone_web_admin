import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-community-project',
  templateUrl: './edit-community-project.component.html',
  styleUrls: ['./edit-community-project.component.css',  '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService]
})
export class EditCommunityProjectComponent {

  formData = {
    project_title: '',
    project_date: '',
    project_time: '',
    details: '',
  };

  projectData: any;
  fetchedProjectData: any = {};
  projectId: any; //container of project_id

  projectImage!: string; //! means undefineds

  isLoading: boolean = false;

  //to store the converted image
  image: string | ArrayBuffer | null = null;
  imageBase64!: string;

  passwordMismatch = false;

  selectedFile: File | null = null;
  selectedFileName = 'No Selected File';

  isImageFetched: boolean = false;

  carouselModalOpen = false;
  carouselModalSuccess = false;

  base64container!: string;

  editMode = false; // Initially, edit mode is disabled

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  responseSent() {
    this.carouselModalSuccess = false;
    this.carouselModalOpen = false;
    this.router.navigate(['/community-projects-management']);
  }

  openCarouselModalSuccess() {
    this.isLoading = false; 
    this.carouselModalSuccess = true;

  }
  
  closeCarouselModal() {
    this.carouselModalOpen = false;
  }
  
  save(form: NgForm) {
    if (this.isFormValid()) {

      //open the confirmation modal
      this.openCarouselModal();

      if (this.selectedFile) {
        console.log('File selected:', this.selectedFile);
      }
      if (this.fetchedProjectData[0].uploaded_file) {
        this.imageBase64 = this.fetchedProjectData[0].uploaded_file;
        console.log('File selected:', this.imageBase64);
      }
    } else {
      // Show error message
      if (this.fetchedProjectData[0].project_title === '' || this.fetchedProjectData[0].details === ''
      || this.fetchedProjectData[0].project_time === '' || this.fetchedProjectData[0].project_date === '') {
        console.log('Please fill out all fields.');
      }
    }
  }

  confirmSave(form: NgForm) {
    this.isLoading = true; 
    if (this.selectedFile) {
      // Convert selected file to Base64
      this.convertFileToBase64(this.selectedFile, (base64String) => {
        form.value.uploaded_file = base64String; // Set uploaded_file to base64
        // Call the service to edit admin data
        this.adminService.editProject(this.fetchedProjectData[0]._id, form.value).subscribe(
          (response) => {
            this.openCarouselModalSuccess();
            console.log('Admin data updated successfully', response);
          },
          (error) => {
            console.error('Error updating admin data', error);
          }
        );
      });
    } else if (this.fetchedProjectData[0].uploaded_file && !this.isImageFetched) {
      // If there's a fetched uploaded_file and it wasn't removed
      form.value.uploaded_file = this.fetchedProjectData[0].uploaded_file; // Set uploaded_file to fetched image
      // Call the service to edit admin data
      this.adminService.editProject(this.fetchedProjectData[0]._id, form.value).subscribe(
        (response) => {
          this.openCarouselModalSuccess();
          console.log('Admin data updated successfully', response);
        },
        (error) => {
          console.error('Error updating admin data', error);
        }
      );
    } else {
      // No selected file and no fetched image
      form.value.uploaded_file = ''; // Set to an empty string
      // Call the service to edit admin data
      this.adminService.editProject(this.fetchedProjectData[0]._id, form.value).subscribe(
        (response) => {
          this.openCarouselModalSuccess();
          console.log('Admin data updated successfully', response);
        },
        (error) => {
          console.error('Error updating admin data', error);
        }
      );
    }

    this.closeCarouselModal(); // Close the confirmation modal
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
      this.fetchedProjectData[0].project_title.trim() !== '' &&
      this.fetchedProjectData[0].project_date.trim() !== '' &&
      this.fetchedProjectData[0].details.trim() !== '' &&
      this.fetchedProjectData[0].type_of_project.trim() !== '' &&
      this.fetchedProjectData[0].project_time.trim() !== '' &&
      !this.passwordMismatch 
    );
  }

  handleFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
  }

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private adminService: AdminRegistrationService,) {
    this.fetchedProjectData = [0];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.projectData = history.state.communityProjectsData;
      this.projectId = this.projectData._id;

      this.adminService.getAdminResponseById(this.projectId).subscribe(
        (response: any) => {
          this.fetchedProjectData = response.communityProjectsData; // Assign fetched data to userData

          // Convert the base64 image to a data URL
          if (this.fetchedProjectData[0].uploaded_file) {
            this.image = 'data:image/jpeg;base64,' + this.fetchedProjectData[0].uploaded_file;
            this.imageBase64 = this.fetchedProjectData[0].uploaded_file;
            this.isImageFetched = true; // Image is fetched from the DB
          }
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
    window.scrollTo(0, 0);
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

  removeImage() {
    this.image = '';
    
    if (this.isImageFetched) {
      // If the image was fetched, clear imageBase64 before updating the database
      this.imageBase64 = ''; 
    } else {
      // If the image was uploaded by the user, clear selectedFile and selectedFileName
      this.selectedFile = null;
      this.selectedFileName = 'No Chosen File';
    }

    this.fetchedProjectData[0].uploaded_file="";
    
    this.isImageFetched = false; // Enable the file input
  }
}