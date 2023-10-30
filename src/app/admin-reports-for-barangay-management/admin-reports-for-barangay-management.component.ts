import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-reports-for-barangay-management',
  templateUrl: './admin-reports-for-barangay-management.component.html',
  styleUrls: ['./admin-reports-for-barangay-management.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class AdminReportsForBarangayManagementComponent {
  userData: any;
  reports: any[] = []; // Array to store all report data

  selectedReportId: string = ''; //container of selected id
  selectedReportId2: string = ''; //container of seleted reportId
  selectedUserName: string = ''; // container of selected name
  carouselModalOpen = false;

  currentPage: number = 1; // Current page number of the pagination
  itemsPerPage: number = 10; // Number of items per page in the table
  searchQuery: string = ''; // Property to store the search query
  originalReportData: any[] = [];
  currentPageForSearch: number = 1;

  isLoading: boolean = true;

  onSearch() {
    this.currentPage = 1; 
    this.reports = this.originalReportData.slice();
    // Filter the user data based on the search query
    if (this.searchQuery) {
      this.reports = this.reports.filter((report) => {
        // Check if the search query matches user.name, user.email, or user.barangay
        return (
          report.barangay.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          report.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          report.reportId.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      // If the search query is empty, reset the user data to the original data
      this.fetchAllReports();
    }
  }

  // Function to update the current pagination page
  setPage(pageNumber: number) {
    this.currentPageForSearch  = pageNumber;
    this.currentPage = pageNumber;
    window.scrollTo(0, 0);
  }

 // identify the number of  items per page
  getPages(): number[] {
    const totalItems = this.reports.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Function to move to the previous pagination page
  previousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
      window.scrollTo(0, 0);
    }
  }

  // Function to move to the next page
  nextPage() {
    const totalPages = this.getPages().length;
    if (this.currentPage < totalPages) {
      this.setPage(this.currentPage + 1);
      window.scrollTo(0, 0);
    }
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.currentPage = 1; 
  }

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminRegistrationService, private datePipe: DatePipe) {
  }

  fetchAllReports() {
    this.isLoading = true;
    this.adminService.getAllReportToBarangay().subscribe(
      (response: any) => {
        this.reports = response.reportToBarangayData;

        this.originalReportData = this.reports.slice();
        // Format the postedDate to mm/dd/yy using DatePipe

        // Sort the reports array in descending order based on postedDate
        this.reports.sort((a, b) => {
          const dateA = new Date(a.date_created).getTime();
          const dateB = new Date(b.date_created).getTime();
          return dateB - dateA;
        });
        this.reports.forEach(report => {
          report.formattedDate = this.datePipe.transform(report.date_created, 'MM/dd/yy hh:mm a');
        });
        this.isLoading = false; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openReport(report: any) {
    this.isLoading = true;
    // Fetch userData based on report.userId
    this.adminService.getUserData(report.userId).subscribe(
      (response: any) => {
        this.userData =response.userInformationData;
          // Pass userData and report data to the next page using state
          this.router.navigateByUrl('/admin-report-to-barangay-information', { state: { reports: report, userData: this.userData } });
          this.isLoading = false;
          console.log('Responding to report:', report);
          console.log('user:', this.userData);
      },
      (error) => {
        console.error(error);
      }
    );
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
        this.fetchAllReports();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      // Load user reports after fetching user data
      this.fetchAllReports();
    });
    window.scrollTo(0, 0);
  }


}
