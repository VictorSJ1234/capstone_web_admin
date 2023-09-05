import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class UserReportComponent {

  userData: any;
  reports: any[] = []; // Array to store user data

  selectedReportId: string = ''; //container of selected id
  selectedReportId2: string = ''; //container of seleted reportId
  selectedUserName: string = ''; // container of selected name
  carouselModalOpen = false;

  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;


  // Load user reports function/ get data from the database with the use of the service file that is connected to the api
  loadUserReports() {
    // Check if userData and _id exist to ensure we have the necessary data for the request
    if (this.userData && this.userData._id) {
      this.adminService.getUserReports(this.userData._id).subscribe(
        (response: any) => {
          // Handle the response containing user report data
          // Populate the reports array with user report data received from the server
          this.reports = response.userReportData; 
          // Format the postedDate to mm/dd/yy using DatePipe
          this.reports.forEach(report => {
          report.formattedDate = this.datePipe.transform(report.postedDate, 'MM/dd/yy');
        });
        // Log the user reports to the console(for testing only)
          console.log('User Reports:', response.userReportData);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
    

  constructor(private adminService: AdminRegistrationService, private router: Router, private route: ActivatedRoute,
    private datePipe: DatePipe) {}

  openReport(report: Report) {
    // Pass userData to the next page using state
   this.router.navigateByUrl('/report-information', { state: { reports: report} });
   console.log('Responding to report:', report);
  }
  openCarouselModal(report: any) {
    // Store the selected reports's id to the initialized container "selectedReportId"
   this.selectedReportId = report._id;
   this.selectedReportId2 = report.reportId;
   this.selectedUserName = report.name;

   // Open the modal
   this.carouselModalOpen = true;
 }

 // Function to close the delete modal
 closeCarouselModal() {
   this.carouselModalOpen = false;
 }


 // Function to confirm and delete the selected report
 confirmDelete() {
   // Call the admin service to delete the report
   this.adminService.deleteUserReport(this.selectedReportId2).subscribe(
     () => {
       console.log('Deleted report:', this.selectedReportId2);
       this.closeCarouselModal();
       this.loadUserReports();
     },
     (error) => {
       console.error(error);
     }
   );
 }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Retrieve passed data from the previous page
      this.userData = history.state.userData;

      // Set the user's profile picture based on userData
      this.profilePicture = this.userData.profilePicture;
      // Convert the base64 image to a data URL
      if (this.profilePicture) {
        this.image = 'data:image/jpeg;base64,' + this.profilePicture;
      }
      // Load user reports after fetching user data
      this.loadUserReports();
    });
    window.scrollTo(0, 0);
  }
}
