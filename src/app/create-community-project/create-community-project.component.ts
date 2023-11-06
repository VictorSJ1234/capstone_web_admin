import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

import { AdminRegistrationService } from '../shared/admin-registration.service';

@Component({
  selector: 'app-create-community-project',
  templateUrl: './create-community-project.component.html',
  styleUrls: ['./create-community-project.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class CreateCommunityProjectComponent {

  constructor(private adminService: AdminRegistrationService, private router: Router, private location: Location, private datePipe: DatePipe) {}
  
  formData = {
    project_title: '',
    project_date: '',
    project_time: '',
    type_of_project: '',
    location: '',
    details: '',
  };

  allUserData: any[] = []; 
  allUserId: string[] = [];

  passwordMismatch = false;
  

  carouselModalSuccess = false;

  base64container!: string;

  isLoading: boolean = false;

  done() {
    this.carouselModalSuccess = false;
    this.router.navigate(['/community-projects-management']);
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
    this.isLoading = false;
  }


  selectedFile: File | null = null;
  selectedFileName = 'Choose file';

  save(form: NgForm) {
    this.isLoading = true;
    this.fetchAllUsers();
    if (this.isFormValid()) {
      if (this.selectedFile) {
        // Convert selected file to Base64
        this.convertFileToBase64(this.selectedFile, (base64String) => {
          // Assign the Base64 string to form.value.uploaded_file
          this.base64container = base64String;
          form.value.uploaded_file = this.base64container;
          this.adminService.createProject(form.value).subscribe(
            (response) => {
              console.log('Project created successfully:', response);
              this.adminService.getAllCommunityProjects()
              .subscribe((projectsResponse) => {
                // Find the latest project by comparing creation dates
                const latestProject = projectsResponse.communityProjectsData[0]; 

                if (latestProject) {
                  const projectId = latestProject._id;
                  for (const userId of this.allUserId) {
                    const notificationData = {
                      _id: '',
                      projectId: projectId,
                      userId: userId,
                      reportId: 'Not Applicable'.toString(),
                      title: this.formData.project_title.toString(),
                      message: this.formData.type_of_project.toString(),
                      notificationStatus: 'Unread',
                    };

                    this.adminService.createProjectNotification(notificationData)
                      .subscribe((notificationResponse) => {
                        console.log(`Project notification created successfully for user ${userId}:`, notificationResponse);
                      }, (notificationError) => {
                        console.error(`Error creating project notification for user ${userId}:`, notificationError);
                      });
                  }
                } else {
                  console.error('No projects found after project creation.');
                }

                this.openCarouselModalSuccess();
                
              }, (projectsError) => {
                console.error('Error fetching projects after project creation:', projectsError);
              });
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
            console.log('Project created successfully:', response);
            this.adminService.getAllCommunityProjects()
            .subscribe((projectsResponse) => {
              const latestProject = projectsResponse.communityProjectsData[0]; 

              if (latestProject) {
                const projectId = latestProject._id;
                for (const userId of this.allUserId) {
                  const notificationData = {
                    _id: '',
                    projectId: projectId, 
                    userId: userId,
                    reportId: 'Not Applicable'.toString(),
                    title: this.formData.project_title.toString(),
                    message: this.formData.type_of_project.toString(),
                    notificationStatus: 'Unread',
                  };

                  this.adminService.createProjectNotification(notificationData)
                    .subscribe((notificationResponse) => {
                      console.log(`Project notification created successfully for user ${userId}:`, notificationResponse);
                    }, (notificationError) => {
                      console.error(`Error creating project notification for user ${userId}:`, notificationError);
                    });
                }
              } else {
                console.error('No projects found after project creation.');
              }

              this.openCarouselModalSuccess();

            }, (projectsError) => {
              console.error('Error fetching projects after project creation:', projectsError);
            });
          },
          (error) => {
            console.error('Error creating project:', error);
          }
        );
      }
    }
    else {
      // Show error message
      if (this.formData.project_title === '' || this.formData.details === '' || this.formData.type_of_project === '' || this.formData.location === ''
      || this.formData.project_time === '' || this.formData.project_date === '') {
        this.isLoading = false;
        console.log('Please fill out all fields.');
      }
    }
  }

  // Function to fetch all user data from the service
  fetchAllUsers() {
    this.isLoading = true;
    this.adminService.getAllUsers().subscribe(
      (response: any) => {
        // Store the fetched user data in the allUserData array
        this.allUserData = response.allUserData;
        
        // Extract user IDs into allUserId
        this.allUserId = this.allUserData.map(user => user._id);

        // Sort the reports array in descending order based on postedDate
        this.allUserData.sort((a, b) => {
          const dateA = new Date(a.postedDate).getTime();
          const dateB = new Date(b.postedDate).getTime();
          return dateB - dateA;
        });

        this.allUserData.forEach(user => {
          user.formattedDate = this.datePipe.transform(user.postedDate, 'MM/dd/yy h:mm a');
        });

        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
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
      this.formData.type_of_project.trim() !== '' &&
      this.formData.details.trim() !== '' &&
      this.formData.location.trim() !== '' &&
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
    this.fetchAllUsers();
    window.scrollTo(0, 0);
  }

}
