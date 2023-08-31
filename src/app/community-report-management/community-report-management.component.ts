import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-community-report-management',
  templateUrl: './community-report-management.component.html',
  styleUrls: ['./community-report-management.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class CommunityReportManagementComponent {
  userData: any;
  reports: any[] = []; // Array to store all report data

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminRegistrationService, private datePipe: DatePipe) {
  }

  fetchAllReports() {
    this.adminService.getAllReports().subscribe(
      (response: any) => {
        this.reports = response.allReportData;
        // Format the postedDate to mm/dd/yy using DatePipe
        this.reports.forEach(report => {
          report.formattedDate = this.datePipe.transform(report.postedDate, 'MM/dd/yy');
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //continue this
  openReport(report: any) {
    // Fetch userData based on report.userId
    this.adminService.getUserData(report.userId).subscribe(
      (response: any) => {
        this.userData =response.userInformationData;
          // Pass userData and report data to the next page using state
          this.router.navigateByUrl('/report-information', { state: { reports: report, userData: this.userData } });
          console.log('Responding to report:', report);
          console.log('User Barangay:', this.userData);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  deleteReport(report: Report) {
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', report);
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      // Load user reports after fetching user data
      this.fetchAllReports();
    });
    window.scrollTo(0, 0);
  }

}
