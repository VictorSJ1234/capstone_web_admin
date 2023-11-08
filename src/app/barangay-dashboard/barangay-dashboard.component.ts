import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { DatePipe } from '@angular/common';
import { AuthService } from '../authService/auth.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-barangay-dashboard',
  templateUrl: './barangay-dashboard.component.html',
  styleUrls: ['./barangay-dashboard.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class BarangayDashboardComponent implements OnInit, AfterViewInit {

  userId:  any;
  fetchedUserData: any;
  barangay: string = ''; 

  totalReportsByBarangay: number = 0; 
  isLoading: boolean = true;
  statusArray: string[] = [];
  statusArrayData: number[] = [];

  @ViewChild('barChartCanvasForReportPerMonth') barChartCanvasForReportPerMonth: any;
  emptyChartMessage = "No data available for this chart.";
  private barChartForReportPerMonth: Chart | null = null;

  StatusList: string[] = [
    'New Report',
    'Under Review',
    'Action in Progress',
    'Resolved',
    'Cancel',
    'Follow Up',
  ];

  


  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminRegistrationService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.fetchUserCountsByMonth();
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

  ngAfterViewInit(): void {
      
  }

  getTotalReportsByBarangay() {
    this.isLoading = true;
    interval(2000) // Poll every 2 seconds 
    .pipe(
      switchMap(() =>this.adminService.getTotalReportsByBarangay(this.barangay))
    )
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

  createChartForReportPerMonth() {
    if (this.barChartForReportPerMonth) {
      this.barChartForReportPerMonth.destroy();
    }
  
    // Sort the data and labels based on the order of MonthList
    const sortedData = Array.from(this.StatusList, status => this.statusArrayData[this.statusArray.indexOf(status)]);
    const sortedLabels = Array.from(this.StatusList);
  
    const ctx = this.barChartCanvasForReportPerMonth.nativeElement;
    this.barChartForReportPerMonth = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedLabels,
        datasets: [
          {
            label: 'User concerns status sent to Pasig Dengue Task Force from barangay ' + this.barangay.toString(),
            data: sortedData,
            backgroundColor: '#28376D',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
    this.barChartForReportPerMonth.update();

    if (sortedData.length === 0) {
      ctx.fillText(this.emptyChartMessage, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }

    // For debugging
    console.log('Months:', sortedLabels);
    console.log('Report Counts by Month:', sortedData);
  }

  fetchUserCountsByMonth() {
    this.isLoading = true; 
    const StatusList = [
      'New Report',
      'Under Review',
      'Action in Progress',
      'Resolved',
      'Cancel',
      'Follow Up',
    ];
    

    StatusList.forEach((status) => {
      this.adminService.countReportsByStatusAndBarangay(this.barangay, status).subscribe(
        (response: any) => {
          this.statusArray.push(response.status ? response.status : 'New Report'); 
          this.statusArrayData.push(response.count);
          console.log(`Fetched reports count for ${status}:`, response.count);
          this.isLoading = false; 
          if (this.statusArray.length === StatusList.length) {
            this.createChartForReportPerMonth();
          }
        },
        (error) => {
          console.error(`Error fetching report counts for ${status}:`, error);
        }
      );
    });
}

}