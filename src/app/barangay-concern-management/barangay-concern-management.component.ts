import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { DatePipe } from '@angular/common';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-barangay-concern-management',
  templateUrl: './barangay-concern-management.component.html',
  styleUrls: ['./barangay-concern-management.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class BarangayConcernManagementComponent {

  userData: any;
  reports: any[] = []; // Array to store all report data
  fetchedUserData: any;

  selectedReportId: string = ''; //container of selected id
  selectedReportId2: string = ''; //container of seleted reportId
  selectedUserName: string = ''; // container of selected name
  carouselModalOpen = false;

  isLoading: boolean = false;

  userId:  any;

  currentPage: number = 1; // Current page number of the pagination
  itemsPerPage: number = 10; // Number of items per page in the table
  searchQuery: string = ''; // Property to store the search query
  originalReportData: any[] = [];
  currentPageForSearch: number = 1;

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
      this.fetchReportsByBarangay(this.fetchedUserData[0].office); 
    }
  }

  // Function to update the current pagination page
  setPage(pageNumber: number) {
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

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminRegistrationService, private datePipe: DatePipe, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  fetchReportsByBarangay(barangay: string) {
    this.isLoading = true;
    this.adminService.getReportsByBarangay(barangay)
      .subscribe(
        (response) => {
          this.reports = response.reportToBarangayData;

          this.originalReportData = this.reports.slice();

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
          console.error('Error fetching community reports:', error);
        }
      );
  }

  openReport(report: any) {
    this.isLoading = true;
    // Fetch userData based on report.userId
    this.adminService.getAdminData(this.userId).subscribe(
      (response: any) => {
        this.fetchedUserData =response.userAdminData;
          // Pass userData and report data to the next page using state
          this.router.navigateByUrl('/admin-report-barangay-view', { state: { reports: report, fetchedUserData: this.fetchedUserData } });
          this.isLoading = false;
          console.log('Responding to report:', report);
          console.log('user:', this.fetchedUserData);
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
    this.isLoading = true;
    // Call the admin service to delete the report
    this.adminService.deleteUserReport(this.selectedReportId2).subscribe(
      () => {
        console.log('Deleted report:', this.selectedReportId2);
        this.isLoading = false;

        this.closeCarouselModal();
        this.fetchReportsByBarangay(this.fetchedUserData[0].office.toString());
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.route.queryParams.subscribe(params => {
      // Load user reports after fetching user data
      this.adminService.getAdminData(this.userId.toString()).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.fetchedUserData = response.userAdminData; 
          this.fetchReportsByBarangay(this.fetchedUserData[0].office); 
          console.log('office: ', this.fetchedUserData[0].office);
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
  
    window.scrollTo(0, 0);
    
  }
  
  


}
