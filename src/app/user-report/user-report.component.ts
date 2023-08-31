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
  deleteReport(report: Report) {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', report);
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
