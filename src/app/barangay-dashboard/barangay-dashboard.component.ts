import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { DatePipe } from '@angular/common';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-barangay-dashboard',
  templateUrl: './barangay-dashboard.component.html',
  styleUrls: ['./barangay-dashboard.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class BarangayDashboardComponent implements OnInit {

  userId:  any;
  fetchedUserData: any;
  barangay: string = ''; 

  totalReportsByBarangay: number = 0; 
  isLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminRegistrationService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.route.queryParams.subscribe(params => {
      // Load user reports after fetching user data
      this.adminService.getAdminData(this.userId.toString()).subscribe(
        (response: any) => {
          this.fetchedUserData = response.userAdminData; 
          console.log('name: ', this.fetchedUserData[0].office);
          this.barangay = this.fetchedUserData[0].office;
          this.isLoading = false;
          this.getTotalReportsByBarangay();
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
    
  }

  getTotalReportsByBarangay() {
    this.isLoading = true;
    this.adminService.getTotalReportsByBarangay(this.barangay)
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.totalReportsByBarangay = data.totalReports; 
        },
        error => {
          console.error('Error fetching total reports by barangay: ', error);
        }
      );
  }
}