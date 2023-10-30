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

  isLoading: boolean = true;

  selectedReportId: string = ''; //container of selected id
  selectedReportId2: string = ''; //container of seleted reportId
  selectedUserName: string = ''; // container of selected name
  carouselModalOpen = false;

  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;

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
          report.report_status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          report.reportId.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      // If the search query is empty, reset the user data to the original data
      this.loadUserReports();
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


  // Load user reports function/ get data from the database with the use of the service file that is connected to the api
  loadUserReports() {
    this.isLoading = true;
    if (this.userData && this.userData._id) {
      this.adminService.getUserReports(this.userData._id).subscribe(
        (response: any) => {
          // Handle the response containing user report data
          // Populate the reports array with user report data received from the server
          this.reports = response.userReportData; 
          this.originalReportData = this.reports.slice();
  
          // Sort the reports array in descending order based on postedDate
          this.reports.sort((a, b) => {
            const dateA = new Date(a.postedDate).getTime();
            const dateB = new Date(b.postedDate).getTime();
            return dateB - dateA;
          });
  
          // Format the postedDate to mm/dd/yy using DatePipe
          this.reports.forEach(report => {
            report.formattedDate = this.datePipe.transform(report.postedDate, 'MM/dd/yy');
          });

          this.isLoading = false; 
  
          // Log the user reports to the console (for testing only)
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
