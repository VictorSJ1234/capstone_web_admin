import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../authService/auth.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-admin-report-barangay-view',
  templateUrl: './admin-report-barangay-view.component.html',
  styleUrls: ['./admin-report-barangay-view.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class AdminReportBarangayViewComponent {
 //initialize data containers
  //! means undefined
  userData: any;
  reports: any;
  reportId!: string;
  name!: string;
  email!: string;
  senderId!: string;
  office!: string;
  uploadedFile: string = '';
  uploadedFile2: string = '';
  latestResponseStatus: string = 'New Report'; 
  isLoading: boolean = false;

  //for report response
  formData = {
    report_status: '',
    action_to_do: '',
    recipient: '',
    date: '',
    response_description: '',
  };

  
  userId:  any;

  selectedFiles: File[] = [];
  
  isImageFetched: boolean = false;

  allAdminData: any[] = []; 
  allAdminId: string[] = [];

  
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


   // Function to convert a File to Base64
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


  //response data container
  barangayResponseData: any[] = []; 
  adminResponseData: any[] = []; 
  mergedResponseData: any[] = []; 
  

  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;
  image2: string | ArrayBuffer | null = null;

  carouselModalOpen = false;
  carouselModalSuccess = false;
  carouselModalResponseAlert = false;

  openCarouselModal() {
    if (this.adminResponseData.length > 0 && this.adminResponseData[0].report_status === 'Resolved') {
      this.openCarouselModalResponseAlert();
    } else {
      this.carouselModalOpen = true;
    }
  }

  responseSent() {
    this.carouselModalSuccess = false;
    this.carouselModalResponseAlert = false;
    this.carouselModalOpen = false;
    this.ngOnInit();
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
  }

  openCarouselModalResponseAlert() {
    this.carouselModalResponseAlert = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
    this.carouselModalResponseAlert = false;
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private adminRegistrationService: AdminRegistrationService, private datePipe: DatePipe, private authService: AuthService) {
      this.userId = this.authService.getUserId();
    }

  deleteReport() {
    this.router.navigate(['/admin-chat']);
  }
  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.route.queryParams.subscribe(params => {
      this.reports = history.state.reports;
      this.reportId = this.reports._id; 
      console.log("asfddf:", this.reports)

      // Fetch user data based on userId.
      this.adminRegistrationService.getAdminData(this.userId.toString()).subscribe(
        (data: any) => {
          this.userData = data.userAdminData; // Assign fetched user data to userData.
          // Convert the base64 image to a data URL
          if (this.userData[0].adminProfilePicture) {
            this.image = 'data:image/jpeg;base64,' + this.userData[0].adminProfilePicture;
          }

          console.log('User Reports:', this.userData[0].name);
          this.name = this.userData[0].name;
          this.email = this.userData[0].email;
          this.senderId = this.userData[0]._id;
          this.office = this.userData[0].office;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
    });

    this.adminRegistrationService.getBarangayResponse(this.reportId)
    .subscribe(
      (data: any) => {
        if (data && data.barangayResponseData) {
          this.barangayResponseData = data.barangayResponseData;
          console.log('123:', this.barangayResponseData);

          // Format the postedDate to mm/dd/yy using DatePipe
          this.barangayResponseData.forEach(Response => {
            Response.formattedDate = this.datePipe.transform(Response.date_responded, 'MM/dd/yy h:mm a');
          });

          // Sort the barangayResponseData array based on the date_responded property in descending order.
          this.barangayResponseData.sort((a, b) => {
            const dateA = new Date(a.date_responded).getTime();
            const dateB = new Date(b.date_responded).getTime();
            return dateB - dateA;
          });
          console.log('barangayResponseData:', this.barangayResponseData);
           // Combine and sort the response data
          const combinedResponseData = [...this.barangayResponseData, ...this.adminResponseData];
          combinedResponseData.sort((a, b) => {
            const dateA = new Date(a.date_responded).getTime();
            const dateB = new Date(b.date_responded).getTime();
            return dateB - dateA;
          });
        // Assign the combined and sorted response data to a single variable
        this.mergedResponseData = combinedResponseData;

        if (this.mergedResponseData.length > 0) {
          this.latestResponseStatus = this.mergedResponseData[0].report_status;
        } else {
          this.latestResponseStatus = 'New Report'; //  default status if no responses are available
        }

        } else {
          console.error('No admin response data found.');
          console.error(this.reports._id);
        }
        this.isLoading = false; 
      },
      error => {
        console.error('Error fetching admin response data:', error);
      }
    );

        //fetch admin response based on report's id
        //fetch admin response based on report's id
      this.adminRegistrationService.getAdminResponseToBarangay(this.reportId)
        .subscribe(
          (data: any) => {
            if (data && data.adminResponseData) {
              this.adminResponseData = data.adminResponseData;
              console.log('123:', this.adminResponseData);
    
              // Format the postedDate to mm/dd/yy using DatePipe
              this.adminResponseData.forEach(Response => {
                Response.formattedDate = this.datePipe.transform(Response.date_responded, 'MM/dd/yy h:mm a');
              });
    
              // Sort the adminResponseData array based on the date_responded property in descending order.
              this.adminResponseData.sort((a, b) => {
                const dateA = new Date(a.date_responded).getTime();
                const dateB = new Date(b.date_responded).getTime();
                return dateB - dateA;
              });
              console.log('adminResponseData:', this.adminResponseData);
               // Combine and sort the response data
              const combinedResponseData = [...this.barangayResponseData, ...this.adminResponseData];
              combinedResponseData.sort((a, b) => {
                const dateA = new Date(a.date_responded).getTime();
                const dateB = new Date(b.date_responded).getTime();
                return dateB - dateA;
              });

              // Assign the combined and sorted response data to a single variable
              this.mergedResponseData = combinedResponseData;

              if (this.mergedResponseData.length > 0) {
                this.latestResponseStatus = this.mergedResponseData[0].report_status;
              } else {
                this.latestResponseStatus = 'New Report'; // default status if no responses are available
              }
    
            } else {
              console.error('No admin response data found.');
            }
          },
          error => {
            console.error('Error fetching admin response data:', error);
          }
        );

    if (this.reports && this.reports.postedDate) {
      this.reports.formattedPostedDate = this.datePipe.transform(this.reports.postedDate, 'MM/dd/yy');
      this.reports.formattedTime = this.datePipe.transform(this.reports.postedDate, 'h:mm a');
    }
    this.fetchAllUsers();
    window.scrollTo(0, 0);

  }

  

  passwordMismatch = false;

  respond(form: NgForm) {
    this.isLoading = true; 
    if (this.isFormValid()) {
  
      form.value.reportId = this.reports._id.toString();
      form.value.sender = this.office.toString();
  
      // Get the selected files from the component's selectedFiles array
      const selectedFiles = this.selectedFiles;
  
      form.value.action_to_do = 'Sleep'.toString();
      form.value.userId = this.senderId;
  
      if (selectedFiles.length > 0) {
  
        this.convertFilesToBase64(selectedFiles, (base64Array) => {
          // Assign the array of Base64 strings to form.value.uploaded_file
          form.value.uploaded_file = base64Array;
          this.adminRegistrationService.barangayResponse(form.value)
            .subscribe(
              response => {
                for (const userId of this.allAdminId) {
                  const notificationData = {
                    _id: '',
                    projectId: 'Not Applicable'.toString(),
                    userId: 'For Barangay Report',
                    adminId: userId,
                    recipient: "Pasig Dengue Task Force",
                    reportId: this.reports._id,
                    title: this.reports.barangay+' updated the status of a concern'.toString(),
                    message: this.reports.report_subject,
                    notificationStatus: 'Unread',
                    createdDate: '',
                  };

                  this.adminRegistrationService.createAdminNotification(notificationData)
                    .subscribe((notificationResponse) => {
                      console.log(`Project notification created successfully for user ${userId}:`, notificationResponse);
                    }, (notificationError) => {
                      console.error(`Error creating project notification for user ${userId}:`, notificationError);
                    });
                }
                this.isLoading = false; 
                this.openCarouselModalSuccess();

                this.formData = {
                  report_status: '',
                  action_to_do: '',
                  recipient: '',
                  date: '',
                  response_description: '',
                };
                this.selectedFiles = [];
                console.log('Responded successfully:', response);
                // successful registration
              },
              (error) => {
                console.error('Error adding data', error);
              }
            );
  
          // Update report status in reports collection
          form.value.reportId = this.reports._id.toString();
          form.value.status = this.formData.report_status.toString();
  
          this.adminRegistrationService.editBarangayReportStatus(this.reportId, form.value).subscribe(
            (response) => {
              console.log('Admin data updated successfully', response);
            },
            (error) => {
              console.error('Error updating admin data', error);
            }
          )
        });
  
        // Data sent to console
        console.log('data:', this.formData);
      } else {
        form.value.uploaded_file = [];
        this.adminRegistrationService.barangayResponse(form.value)
          .subscribe(
            response => {
              for (const userId of this.allAdminId) {
                const notificationData = {
                  _id: '',
                  projectId: 'Not Applicable'.toString(),
                  userId: 'For Barangay Report',
                  adminId: userId,
                  recipient: "Pasig Dengue Task Force",
                  reportId: this.reports._id,
                  title: this.reports.barangay+' updated the status of a concern'.toString(),
                  message: this.reports.report_subject,
                  notificationStatus: 'Unread',
                  createdDate: '',
                };

                this.adminRegistrationService.createAdminNotification(notificationData)
                  .subscribe((notificationResponse) => {
                    console.log(`Project notification created successfully for user ${userId}:`, notificationResponse);
                  }, (notificationError) => {
                    console.error(`Error creating project notification for user ${userId}:`, notificationError);
                  });
              }
              this.isLoading = false; 
              this.openCarouselModalSuccess();
              this.formData = {
                report_status: '',
                action_to_do: '',
                recipient: '',
                date: '',
                response_description: '',
              };
              console.log('Responded successfully:', response);
              // successful registration
            },
            (error) => {
              console.error('Error adding data', error);
            }
          );
  
        // Update report status in reports collection
        form.value.reportId = this.reports._id.toString();
        form.value.status = this.formData.report_status.toString();
  
        this.adminRegistrationService.editBarangayReportStatus(this.reportId, form.value).subscribe(
          (response) => {
            console.log('Admin data updated successfully', response);
          },
          (error) => {
            console.error('Error updating admin data', error);
          }
        );
  
        // Data sent to console
        console.log('data:', this.formData);
      }
    } else {
      // Show error message
      if (this.formData.report_status === '' || this.formData.response_description === '') {
        console.log('Please fill out all fields.');
        this.isLoading = false; 
      }
    }
  }
  
  // Function to fetch all user data from the service
  fetchAllUsers() {
    this.isLoading = true;
    this.adminRegistrationService.getAllAdmin().subscribe(
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

  isFormValid(): boolean {
    return (
      this.formData.report_status.trim() !== '' &&
      this.formData.response_description.trim() !== '' 
      //this.formData.action_to_do.trim() !== '' &&
     // this.formData.response_description.trim() !== '' &&
      //this.formData.date.trim() !== '' 
    );
  }

  isLatestResponse(response: any): boolean {
    // Check if 'barangayResponseData' has at least one response.
    if (this.barangayResponseData.length > 0) {

      // If they are equal, 'response' is the latest.
      return response === this.barangayResponseData[0];
    }
     // If 'barangayResponseData' is empty, 'response' cannot be the latest so its false
    return false;
  }

   //background color of the status
  getStatusBackgroundColor(reportStatus: string): string {
    switch (reportStatus) {
        case 'New Report':
            return 'red';
        case 'Under Review':
            return 'blue';
        case 'Resolved':
            return 'green';
        default:
            return 'lightblue';
    }
}

  //text color of the status in the status table
  getStatusColor(reportStatus: string): string {
    switch (reportStatus) {
        case 'New Report':
            return 'red';
        case 'Under Review':
            return 'blue';
        case 'Resolved':
            return 'green';
        default:
            return '';
      }
  }

  rowColor(response: any): string {
    if (response.sender === 'Pasig Dengue Task Force') {
      return '#28376D'; 
    } else {
      return 'green'; 
    }
  }

// Function to convert Data URI to Blob
dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

openFileInNewTab(index: number) {
  if (
    this.reports.uploaded_file &&
    Array.isArray(this.reports.uploaded_file) &&
    index >= 0 &&
    index < this.reports.uploaded_file.length
  ) {
    const base64String = this.reports.uploaded_file[index];
    try {
      // Create a Blob from the base64 string
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: this.getFileTypeFromBase64(base64String),
      });

      // Create a data URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url, '_blank');

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error opening file in a new tab:', error);
    }
  } else {
    console.error('Invalid or missing uploaded file data at index:', index);
  }
}

openResponseFileInNewTab(response: any, index: number) {
  if (
      response.uploaded_file &&
      Array.isArray(response.uploaded_file) &&
      index >= 0 &&
      index < response.uploaded_file.length
  ) {
      const base64String = response.uploaded_file[index];
      try {
          // Create a Blob from the base64 string
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
              type: this.getFileTypeFromBase64(base64String),
          });

          // Create a data URL for the blob
          const url = window.URL.createObjectURL(blob);

          // Open the file in a new tab
          window.open(url, '_blank');

          window.URL.revokeObjectURL(url);
      } catch (error) {
          console.error('Error opening file in a new tab:', error);
      }
  } else {
      console.error('Invalid or missing uploaded file data at index:', index);
  }
}

getFileTypeFromBase64(base64String: string): string {
  // Detect the file type based on the base64 string

  // Common patterns for image/jpeg (JPEG)
  if (base64String.startsWith('/9j/') || base64String.startsWith('/9J/') || base64String.startsWith('/9f/') || base64String.startsWith('/9F/')) {
    return 'image/jpeg';
  }

  // Common patterns for image/png (PNG)
  if (base64String.startsWith('iVBORw0') || base64String.startsWith('iVBORw0KGgo')) {
    return 'image/png';
  }

  // Common patterns for application/pdf (PDF)
  if (base64String.startsWith('JVBERi0xLj') || base64String.startsWith('JVBERi0xMj') || base64String.startsWith('JVBERi0xNb') || base64String.startsWith('JVBERi0xNT')) {
    return 'application/pdf';
  }

  // Common patterns for application/vnd.openxmlformats-officedocument.wordprocessingml.document (DOCX)
  if (base64String.startsWith('UEsFBgABAA') || base64String.startsWith('UEsFBgACAA')) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }

  // Default to octet-stream if the type cannot be reliably detected
  return 'application/octet-stream';
}


}
