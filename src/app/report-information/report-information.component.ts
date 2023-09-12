import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-report-information',
  templateUrl: './report-information.component.html',
  styleUrls: ['./report-information.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class ReportInformationComponent {
  //initialize data containers
  //! means undefined
  userData: any;
  reports: any;
  userId!: string;
  reportId!: string;
  name!: string;
  email!: string;
  latestResponseStatus: string = ''; 


  //response data container
  adminResponseData: any[] = []; 
  

  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;

  carouselModalOpen = false;
  carouselModalSuccess = false;

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  responseSent() {
    this.carouselModalSuccess = false;
    this.carouselModalOpen = false;
    this.ngOnInit();
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private adminRegistrationService: AdminRegistrationService, private datePipe: DatePipe) {}

  deleteReport() {
    this.router.navigate(['/admin-chat']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reports = history.state.reports;
      this.userId = this.reports.userId; // userId is a property in the report data.
      this.reportId = this.reports._id; 

      // Fetch user data based on userId.
      this.adminRegistrationService.getUserData(this.userId).subscribe(
        (data: any) => {
          this.userData = data.userInformationData; // Assign fetched user data to userData.
          // Convert the base64 image to a data URL
          if (this.userData[0].profilePicture) {
            this.image = 'data:image/jpeg;base64,' + this.userData[0].profilePicture;
          }

          console.log('User Reports:', this.userData[0].name);
          this.name = this.userData[0].name;
          this.email = this.userData[0].email;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
    });

    //fetch admin response based on report's id
    this.adminRegistrationService.getAdminResponse(this.reportId)
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
          this.latestResponseStatus = this.adminResponseData[0].report_status;

        } else {
          console.error('No admin response data found.');
          console.error(this.reports._id);
        }
      },
      error => {
        console.error('Error fetching admin response data:', error);
      }
    );


    window.scrollTo(0, 0);
  }

  //for report response
  formData = {
    report_status: '',
    action_to_do: '',
    date: '',
    response_description: '',
  };

  passwordMismatch = false;

  register(form: NgForm) {
    if (this.isFormValid()) {

      form.value.reportId = this.reports._id.toString();
      form.value.userId = this.reports.userId.toString();

      this.adminRegistrationService.adminResponse(form.value)
        .subscribe(
          response => {
            this.openCarouselModalSuccess();
            console.log('Responded successfully:', response);
            // successful registration
          },
          (error) => {
            console.error('Error adding data', error);
          }
        );
      //data sent to console
      
      //data sent to console
      console.log('data:', this.formData);
    } else {
      // Show error message
      if (this.formData.report_status === '' || this.formData.action_to_do === '' || this.formData.date === '' || this.formData.response_description === '') {
        console.log('Please fill out all fields.');
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.report_status.trim() !== '' &&
      this.formData.action_to_do.trim() !== '' &&
      this.formData.response_description.trim() !== '' &&
      this.formData.date.trim() !== '' 
    );
  }

  isLatestResponse(response: any): boolean {
    // Check if 'adminResponseData' has at least one response.
    if (this.adminResponseData.length > 0) {

      // If they are equal, 'response' is the latest.
      return response === this.adminResponseData[0];
    }
     // If 'adminResponseData' is empty, 'response' cannot be the latest so its false
    return false;
  }

   //background color of the status
  getStatusBackgroundColor(reportStatus: string): string {
    switch (reportStatus) {
        case 'New Report':
            return 'lightblue';
        case 'Under Review':
            return 'orange';
        case 'Resolved':
            return 'lightgreen';
        default:
            return 'lightblue';
    }
}

  //text color of the status in the status table
  getStatusColor(reportStatus: string): string {
    switch (reportStatus) {
        case 'New Report':
            return 'blue';
        case 'Under Review':
            return 'orange';
        case 'Resolved':
            return 'green';
        default:
            return '';
    }
}

}
