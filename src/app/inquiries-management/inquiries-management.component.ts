import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-inquiries-management',
  templateUrl: './inquiries-management.component.html',
  styleUrls: ['./inquiries-management.component.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class InquiriesManagementComponent {
  userData: any;
  inquiries: any[] = []; // Array to store all inquiry data

  selectedInquiryId: string = ''; //container of selected id
  selectedInquiryId2: string = ''; //container of seleted inquiryId
  selectedUserName: string = ''; // container of selected name
  selectedEmail: string = '';
  carouselModalOpen = false;
  selectedReportIds: string[] = [];

  currentPage: number = 1; // Current page number of the pagination
  itemsPerPage: number = 10; // Number of items per page in the table
  searchQuery: string = ''; // Property to store the search query
  originalInquiryData: any[] = [];
  selectedInquiryIds: string[] = [];
  currentPageForSearch: number = 1;

  carouselModalOpen2 = false;

  isLoading: boolean = true;

  onSearch() {
    this.currentPage = 1; 
    this.inquiries = this.originalInquiryData.slice();
    // Filter the user data based on the search query
    if (this.searchQuery) {
      this.inquiries = this.inquiries.filter((inquiry) => {
        // Check if the search query matches user.name, user.email, or user.barangay
        return (
          inquiry.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inquiry.date_created.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      // If the search query is empty, reset the user data to the original data
      this.fetchAllInquiries();
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
    const totalItems = this.inquiries.length;
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

  fetchAllInquiries() {
    this.isLoading = true;
    this.adminService.getAllInquiries().subscribe(
      (response: any) => {
        this.inquiries = response.inquiryData;

        this.originalInquiryData = this.inquiries.slice();
        // Format the postedDate to mm/dd/yy using DatePipe

        // Sort the inquiries array in descending order based on postedDate
        this.inquiries.sort((a, b) => {
          const dateA = new Date(a.date_created).getTime();
          const dateB = new Date(b.date_created).getTime();
          return dateB - dateA;
        });
        this.inquiries.forEach(inquiry => {
          inquiry.formattedDate = this.datePipe.transform(inquiry.date_created, 'MM/dd/yy hh:mm a');
        });
        this.isLoading = false; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openInquiry(inquiry: any) {
    this.isLoading = true;
    // Fetch userData based on inquiry.userId
    this.adminService.getUserData(inquiry.userId).subscribe(
      (response: any) => {
        this.userData =response.userInformationData;
          // Pass userData and inquiry data to the next page using state
          this.router.navigateByUrl('/inquiry-information', { state: { inquiries: inquiry} });
          this.isLoading = false;
          console.log('Responding to inquiry:', inquiry);
          console.log('user:', this.userData);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  openCarouselModal(inquiry: any) {
     // Store the selected inquiries's id to the initialized container "selectedInquiryId"
    this.selectedInquiryId = inquiry._id;
    this.selectedInquiryId2 = inquiry.inquiryId;
    this.selectedEmail = inquiry.email;
    this.selectedUserName = inquiry.name;

    // Open the modal
    this.carouselModalOpen = true;
  }

  openCarouselModal2() {
    this.carouselModalOpen2 = true;
  }

  // Function to close the delete modal
  closeCarouselModal() {
    this.carouselModalOpen = false;
    this.carouselModalOpen2 = false;
  }


  // Function to confirm and delete the selected inquiry
  confirmDelete() {
    // Call the admin service to delete the inquiry
    this.adminService.deleteInquiry(this.selectedInquiryId).subscribe(
      () => {
        console.log('Deleted inquiry:', this.selectedInquiryId);
        this.closeCarouselModal();
        this.fetchAllInquiries();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      // Load user inquiries after fetching user data
      this.fetchAllInquiries();
    });
    window.scrollTo(0, 0);
  }

  toggleSelectReport(reportId: string) {
    if (this.selectedInquiryIds.includes(reportId)) {
      this.selectedInquiryIds = this.selectedInquiryIds.filter(id => id !== reportId);
    } else {
      this.selectedInquiryIds.push(reportId);
    }

    // Update the selectedReportIds based on selectedInquiryIds
    this.selectedInquiryIds = this.inquiries
      .filter(inquiry => this.selectedInquiryIds.includes(inquiry._id))
      .map(inquiry => inquiry._id);
}


  downloadSelectedReports() {
    if (this.selectedInquiryIds.length === 0) {
      return;
    }
  
    const selectedInquiries = this.inquiries.filter(inquiry => this.selectedInquiryIds.includes(inquiry._id));
  
    if (selectedInquiries.length === 0) {
      return;
    }
  
    const doc = new jsPDF();
  
    // Add a header
    doc.setFontSize(16);
    doc.text('Downloaded Inquiries', 10, 10);
  
    // Add a date at the top
    doc.setFontSize(12);
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    doc.text(`Date: ${formattedDate}`, 10, 20);
  
    let yPos = 30;
    selectedInquiries.forEach((inquiry) => {
      doc.text(`Sender: ${inquiry.email}`, 10, yPos + 10);
      doc.text(`Inquiry Subject: ${inquiry.subject}`, 10, yPos + 20);
      doc.text(`Date: ${inquiry.in}`, 10, yPos + 30);
      doc.text(`Inquiry Message: ${inquiry.inquiry}`, 10, yPos + 40);
      yPos += 40;
    });
  
    // Save the PDF
    doc.save('Selected Downloaded Inquiries.pdf');
  }

  deleteCheckedReports() {
    if (this.selectedInquiryIds.length === 0) {
      return;
    }
  
    this.isLoading = true;
  
    for (const inquiryId of this.selectedInquiryIds) {
      this.adminService.deleteInquiry(inquiryId).subscribe(
        () => {
          console.log('Deleted inquiry by _id:', inquiryId);
          this.selectedInquiryIds = [];
          this.isLoading = false;
          this.closeCarouselModal(); 
          this.fetchAllInquiries(); 
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
      this.selectedInquiryIds = this.inquiries.map(report => report._id);
    } else {
      // If the master checkbox is unchecked, clear the selectedReportIds array
      this.selectedInquiryIds = [];
    }
  }

}
