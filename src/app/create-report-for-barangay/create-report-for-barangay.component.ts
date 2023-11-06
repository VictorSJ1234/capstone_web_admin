import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { AdminRegistrationService } from '../shared/admin-registration.service';

@Component({
  selector: 'app-create-report-for-barangay',
  templateUrl: './create-report-for-barangay.component.html',
  styleUrls: ['./create-report-for-barangay.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class CreateReportForBarangayComponent {

  constructor(private adminService: AdminRegistrationService, private router: Router, private location: Location, private datePipe: DatePipe) {}
  
  formData = {
    status: '',
    barangay: '',
    report_subject: '',
    details:'',
  };

  allAdminData: any[] = []; 
  allAdminId: string[] = [];

  isLoading: boolean = false;
  
  passwordMismatch = false;
  

  carouselModalSuccess = false;

  base64container!: string;

  done() {
    this.carouselModalSuccess = false;
    this.router.navigate(['/admin-reports-for-barangay-management']);
  }

  openCarouselModalSuccess() {
    this.isLoading = false;
    this.carouselModalSuccess = true;
  }


  selectedFiles: File[] = [];

  save(form: NgForm) {
    this.isLoading = true;
    if (this.isFormValid()) {
      const selectedFiles = this.selectedFiles;

  
      if (selectedFiles.length > 0) {
        // Convert selected files to Base64
        this.convertFilesToBase64(selectedFiles, (base64Array) => {
          // Assign the array of Base64 strings to form.value.uploaded_file
          form.value.uploaded_file = base64Array;
          form.value.status = 'New Report';
  
          this.adminService.createReportToBarangay(form.value).subscribe(
            (report) => {
              console.log('Project created successfully:', report);
              this.adminService.getAllReportToBarangay()
              .subscribe((projectsResponse) => {
                // Find the latest project by comparing creation dates
                const latestReport = projectsResponse.reportToBarangayData[0]; 

                if (latestReport) {
                  const reportId = latestReport._id;
                  for (const userId of this.allAdminId) {
                    const notificationData = {
                      _id: '',
                      projectId: 'Not Applicable'.toString(),
                      userId: 'For Barangay Report',
                      adminId: userId,
                      recipient: this.formData.barangay.toString(),
                      reportId: reportId,
                      title: 'The Pasig Dengue Task Force has created a concern for your barangay.'.toString(),
                      message: this.formData.report_subject.toString(),
                      notificationStatus: 'Unread',
                      createdDate: '',
                    };

                    this.adminService.createAdminNotification(notificationData)
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
      } else {
        form.value.uploaded_file = [];
        form.value.status = 'New Report';
        this.adminService.createReportToBarangay(form.value).subscribe(
          (report) => {
            console.log('Project created successfully:', report);
            this.adminService.getAllReportToBarangay()
            .subscribe((projectsResponse) => {
              // Find the latest project by comparing creation dates
              const latestReport = projectsResponse.reportToBarangayData[0]; 

              if (latestReport) {
                const reportId = latestReport._id;
                for (const userId of this.allAdminId) {
                  const notificationData = {
                    _id: '',
                    projectId: 'Not Applicable'.toString(),
                    userId: 'For Barangay Report',
                    adminId: userId,
                    recipient: this.formData.barangay.toString(),
                    reportId: reportId,
                    title: 'The Pasig Dengue Task Force has created a concern for your barangay.'.toString(),
                    message: this.formData.report_subject.toString(),
                    notificationStatus: 'Unread',
                    createdDate: '',
                  };

                  this.adminService.createAdminNotification(notificationData)
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
    } else {
      // Show error message
      this.isLoading = false; 
      console.log('Please fill out all fields.');
    }
  }

   // Function to fetch all user data from the service
   fetchAllUsers() {
    this.isLoading = true;
    this.adminService.getAllAdmin().subscribe(
      (response: any) => {
        // Store the fetched user data in the allUserData array
        this.allAdminData = response.allAdminData;
        
        // Extract user IDs into allUserId
        this.allAdminId = this.allAdminData.map(admin => admin._id);

        // Sort the reports array in descending order based on postedDate
        this.allAdminData.sort((a, b) => {
          const dateA = new Date(a.postedDate).getTime();
          const dateB = new Date(b.postedDate).getTime();
          return dateB - dateA;
        });

        this.allAdminData.forEach(admin => {
          admin.formattedDate = this.datePipe.transform(admin.postedDate, 'MM/dd/yy h:mm a');
        });

        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
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
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }


  isFormValid(): boolean {
    return (
      this.formData.status.trim() !== '' &&
      this.formData.barangay.trim() !== '' &&
      this.formData.report_subject.trim() !== '' &&
      this.formData.details.trim() !== ''
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

  cancel() {
    this.location.back();
  } 

  ngOnInit() {
   this.fetchAllUsers();
    window.scrollTo(0, 0);
  }

}
