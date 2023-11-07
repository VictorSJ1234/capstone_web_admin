import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-admin-reports-for-barangay-management',
  templateUrl: './admin-reports-for-barangay-management.component.html',
  styleUrls: ['./admin-reports-for-barangay-management.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class AdminReportsForBarangayManagementComponent {
  userData: any;
  reports: any[] = []; // Array to store all report data
  selectedReportIds: string[] = [];

  selectedReportId: string = ''; //container of selected id
  selectedReportId2: string = ''; //container of seleted reportId
  selectedUserName: string = ''; // container of selected name
  carouselModalOpen = false;
  carouselModalOpen2 = false;


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
    this.carouselModalOpen2 = false;
  }

  openCarouselModal2() {
    this.carouselModalOpen2 = true;
  }



  // Function to confirm and delete the selected report
  confirmDelete() {
    this.isLoading = true;
    // Call the admin service to delete the report
    this.adminService.deleteReportToBarangay(this.selectedReportId).subscribe(
      () => {
        console.log('Deleted report:', this.selectedReportId);

        // After successfully deleting the report, call the deleteBarangayResponse method with the same reportId
        this.adminService.deleteBarangayResponse(this.selectedReportId).subscribe(
          () => {
            console.log('Deleted response for report:', this.selectedReportId);
          },
          (error) => {
            console.error(error);
          }
        );

        this.adminService.deleteAdminResponse(this.selectedReportId).subscribe(
          () => {
            console.log('Deleted response for report:', this.selectedReportId);
          },
          (error) => {
            console.error(error);
          }
        );
         // Delete the report notification
        this.adminService.deleteReportNotificationById(this.selectedReportId).subscribe(
          () => {
            console.log('Deleted report notification for report:', this.selectedReportId);
          },
          (error) => {
            console.error(error);
          }
        );

        this.isLoading = false;
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

  toggleSelectReport(reportId: string) {
    if (this.selectedReportIds.includes(reportId)) {
      this.selectedReportIds = this.selectedReportIds.filter(id => id !== reportId);
    } else {
      this.selectedReportIds.push(reportId);
    }
  }

  downloadSelectedReports() {
    if (this.selectedReportIds.length === 0) {
      return;
    }
  
    const selectedReports = this.reports.filter(report => this.selectedReportIds.includes(report._id));
    
    if (selectedReports.length === 0) {
      return;
    }
  
    const doc = new jsPDF();
  
    // Add a header
    doc.setFontSize(16);
    doc.text('Downloaded Reports', 10, 10);
  
    // Add a date at the top
    doc.setFontSize(12);
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    doc.text(`Date: ${formattedDate}`, 10, 20);
  
    let yPos = 40;
    selectedReports.forEach((report) => {
      doc.text(`Concern ID: ${report.reportId}`, 10, yPos);
      doc.text(`Subject of Concern: ${report.report_subject}`, 10, yPos + 10);
      doc.text(`Received on: ${report.formattedDate}`, 10, yPos + 20);
      doc.text(`Concern Location: ${report.barangay}`, 10, yPos + 30);
      doc.text(`Status: ${report.status}`, 10, yPos + 40);
      doc.text(`Description: ${report.details}`, 10, yPos + 50);
      yPos += 70;
    });
  
    // Save the PDF 
    doc.save('Selected Downloaded Reports.pdf');
  }

  // Function to delete checked reports by _id
  deleteCheckedReports() {
    if (this.selectedReportIds.length === 0) {
      return;
    }

    this.isLoading = true;

    // Call the admin service to delete the reports by their _id
    for (const reportId of this.selectedReportIds) {
      this.adminService.deleteReportToBarangay(reportId).subscribe(
        () => {
          console.log('Deleted report by _id:', reportId);
          
           // After successfully deleting the report, call the deleteBarangayResponse method with the same reportId
          this.adminService.deleteBarangayResponse(reportId).subscribe(
            () => {
            },
            (error) => {
              console.error(error);
            }
          );

          this.adminService.deleteAdminResponse(reportId).subscribe(
            () => {
            },
            (error) => {
              console.error(error);
            }
          );
          // Delete the report notification
          this.adminService.deleteReportNotificationById(reportId).subscribe(
            () => {
            },
            (error) => {
              console.error(error);
            }
          );
          this.selectedReportIds = [];
          this.isLoading = false;
          this.closeCarouselModal();
          this.fetchAllReports();

        },
        (error) => {
          console.error(error);
        }
      );
    }    
  }

  checkAll(event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
  
    if (checked) {
      // If the master checkbox is checked, add all report ids to the selectedReportIds array
      this.selectedReportIds = this.reports.map(report => report._id);
    } else {
      // If the master checkbox is unchecked, clear the selectedReportIds array
      this.selectedReportIds = [];
    }
  }
  
  
}
