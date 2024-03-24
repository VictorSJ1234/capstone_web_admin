import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface information {
  image: string;
  username: string;
}

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class AdminsComponent implements OnInit{

  formData = {
    role: '',
    file_attachment: '',
    file_content: '',
    response_description: '',
  };

  isLoading: boolean = true;

  originalUserData: any[] = [];
  adminData: any[] = []; // Array to store admin data

  selectedAdminId: string = ''; //container of seleted userId
  selectedAdminName: string = ''; // container of selected name
  carouselModalOpen = false;
  validationModal = false;
  deleteModalOpen = false;
  selectedUser: any = {}; // Property to store selected user data for valication
  fileContent: string = ''; // Property to store the base64 content
  searchQuery: string = ''; // Property to store the search query
  currentPageForSearch: number = 1;

  onSearch() {
    this.currentPage = 1; 
    this.adminData = this.originalUserData.slice();
    // Filter the user data based on the search query
    if (this.searchQuery) {
      this.adminData = this.adminData.filter((user) => {
        // Check if the search query matches user.name, user.email, or user.barangay
        return (
          user.fullname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.accountStatus.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.official_role.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      // If the search query is empty, reset the user data to the original data
      this.fetchAllAdmins();
    }
  }

  openValidation(Admin: any) {
    // Store the selected user's data
    this.selectedUser = Admin;
  
    // Fetch the base64 content from the user data
    this.fileContent = Admin.uploaded_file;
    // Open the validation modal
    this.validationModal = true;
  }
  closeValidationModal() {
    this.validationModal = false;
  }

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  convertBase64ToUrl(base64Data: string): SafeUrl {
    const mimeType = 'image/png'; 
    const imageUrl = `data:${mimeType};base64,${base64Data}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  currentPage: number = 1; // Current page number of the pagination
  itemsPerPage: number = 10; // Number of items per page in the table

  // Function to update the current pagination page
  setPage(pageNumber: number) {
    this.currentPageForSearch  = pageNumber;
    this.currentPage = pageNumber;
    window.scrollTo(0, 0);
  }

 // identify the number of  items per page
  getPages(): number[] {
    const totalItems = this.adminData.length;
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

  constructor(private router: Router, private adminService: AdminRegistrationService,  private datePipe: DatePipe, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchAllAdmins();
  }

  fetchAllAdmins() {
    this.isLoading = true;
    this.adminService.getAllAdmin().subscribe(
      (response: any) => {
        // Store the fetched admin data in the adminData array
        this.adminData = response.allAdminData;

        this.originalUserData = this.adminData.slice();
        
        // Sort the reports array in descending order based on postedDate
        this.adminData.sort((a, b) => {
          const dateA = new Date(a.postedDate).getTime();
          const dateB = new Date(b.postedDate).getTime();
          return dateB - dateA;
        });

        this.adminData.forEach(admin => {
          admin.formattedDate = this.datePipe.transform(admin.postedDate, 'MM/dd/yy h:mm a');
        });

        this.isLoading = false; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirmValidation() {
    this.isLoading = true;
    if (this.isFormValid()) {
      this.selectedUser.official_role = this.formData.role; 
      this.selectedUser.accountStatus = 'Validated'; 
      this.adminService.editAdminRole(this.selectedUser._id, this.selectedUser).subscribe(
        () => {
          this.isLoading = false;
          console.log('Account status updated to Validated');
          const inquiry = {
            _id: '',
            email: this.selectedUser.email.toString(),
            response_subject: 'Mosquinator Account Validation Successful',
            uploaded_file: ['', ''],
            inquiry_response: 'Congratulations! We are pleased to inform you that your account has been successfully validated.'.toString(),
          };
  
          this.adminService.InquiryResponse(inquiry)
            .subscribe((notificationResponse) => {
              console.log(notificationResponse);
              this.isLoading = false; 
            }, (notificationError) => {
              console.error(notificationError);
          });
          this.closeValidationModal(); 
        },
        (error) => {
          console.error('Error updating account status:', error);
        }
      );
    }

    else {
      // Show error message
      if (this.formData.role === '' || this.formData.file_attachment === '' || this.formData.file_content === '' || this.formData.response_description === '') {
        this.isLoading = false;
        console.log('Please fill out all fields.');
      }
    }
  }

  register() {
    if (this.isFormValid()) {
      //data sent to console
      
      //data sent to console
      console.log('data:', this.formData);
    } else {
      // Show error message
      if (this.formData.role === '') {
        console.log('Please fill out all fields.');
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.role.trim() !== ''
    );
  }
  
  editReport(Admin: any) {
     // Pass adminData to the next page using state
     this.router.navigateByUrl('/edit-admin-information', { state: { adminData: Admin } });
     console.log('Responding to report:', Admin);
  }

  openDeleteModal(Admin: any) {
     // Store the selected admin's id to the initialized container "sekectedAdminId"
    this.selectedAdminId = Admin._id;
    this.selectedAdminName = Admin.fullname;

    //open the modal
    this.deleteModalOpen = true;
  }


  closeCarouselModal() {
    this.carouselModalOpen = false;
    this.validationModal = false;
    this.deleteModalOpen = false;
  }


  // Function to confirm and delete the selected admin
  confirmDelete() {
    this.isLoading = true;
     // Call the admin service to delete the admin
    this.adminService.deleteAdmin(this.selectedAdminId).subscribe(
      () => {
        this.isLoading = false; 
        console.log('Deleted admin:', this.selectedAdminName);
        this.closeCarouselModal(); // Close the modal
        this.fetchAllAdmins(); // Reload admin data after deletion
      },
      (error) => {
        console.error(error);
      }
    );
  }
  convertToImage(base64String: string): string {
    // Convert the base64 image to an image URL
    return `data:image/jpeg;base64,${base64String}`;
  }

  downloadFile(index: number) {
    if (this.selectedUser.uploaded_file && Array.isArray(this.selectedUser.uploaded_file) && index >= 0 && index < this.selectedUser.uploaded_file.length) {
      const base64String = this.selectedUser.uploaded_file[index];
      try {
        // Create a Blob from the base64 string
        const byteString = atob(base64String);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
  
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
  
        const blob = new Blob([ab]);
  
        // Create a file reader to read the file type
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
  
          // Detect the file type
          let fileType = '';
          if (uint8Array && uint8Array.length >= 2) {
            const hex = uint8Array[0].toString(16) + uint8Array[1].toString(16);
  
            switch (hex) {
              case '8950':
                fileType = 'png';
                break;
              case '4749':
                fileType = 'gif';
                break;
              case 'ffd8':
                fileType = 'jpg';
                break;
              case '2550':
                fileType = 'pdf';
                break;
              case '504b':
                fileType = 'docx';
                break;
              case 'd0cf':
                fileType = 'doc';
                break;
              case '7b5c':
                fileType = 'txt'; 
                break;
  
              default:
                fileType = 'dat'; // Default to .dat for unknown types
                break;
            }
          }
  
          // Create a download link with the appropriate file extension
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `report_uploaded_file_${index}.${fileType}`;
          a.click();
          window.URL.revokeObjectURL(url);
        };
  
        // Read the Blob as an ArrayBuffer
        fileReader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    } else {
      console.error('Invalid or missing uploaded file data at index:', index);
    }
  }
  
  
  
  
  // Function to convert Data URI to Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mimeString });
    }

    openFileInNewTab(index: number) {
      if (
        this.selectedUser.uploaded_file &&
        Array.isArray(this.selectedUser.uploaded_file) &&
        index >= 0 &&
        index < this.selectedUser.uploaded_file.length
      ) {
        const base64String = this.selectedUser.uploaded_file[index];
        try {
          // Create a Blob from the base64 string
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: this.getFileTypeFromBase64(base64String),
          });
  
          // Create a data URL for the blob
          const url = window.URL.createObjectURL(blob);
  
          // Open the file in a new tab
          window.open(url, '_blank');
  
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error opening file in a new tab:', error);
        }
      } else {
        console.error('Invalid or missing uploaded file data at index:', index);
      }
    }
  
    getFileTypeFromBase64(base64String: string): string {
      // Detect the file type based on the base64 string
  
      // Common patterns for image/jpeg (JPEG)
      if (base64String.startsWith('/9j/') || base64String.startsWith('/9J/') || base64String.startsWith('/9f/') || base64String.startsWith('/9F/')) {
        return 'image/jpeg';
      }
  
      // Common patterns for image/png (PNG)
      if (base64String.startsWith('iVBORw0') || base64String.startsWith('iVBORw0KGgo')) {
        return 'image/png';
      }
  
      // Common patterns for application/pdf (PDF)
      if (base64String.startsWith('JVBERi0xLj') || base64String.startsWith('JVBERi0xMj') || base64String.startsWith('JVBERi0xNb') || base64String.startsWith('JVBERi0xNT')) {
        return 'application/pdf';
      }
  
      // Common patterns for application/vnd.openxmlformats-officedocument.wordprocessingml.document (DOCX)
      if (base64String.startsWith('UEsFBgABAA') || base64String.startsWith('UEsFBgACAA')) {
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }
  
      // Default to octet-stream if the type cannot be reliably detected
      return 'application/octet-stream';
    }

    openResponseFileInNewTab(response: any, index: number) {
      if (
          response.uploaded_file &&
          Array.isArray(response.uploaded_file) &&
          index >= 0 &&
          index < response.uploaded_file.length
      ) {
          const base64String = response.uploaded_file[index];
          try {
              // Create a Blob from the base64 string
              const byteCharacters = atob(base64String);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], {
                  type: this.getFileTypeFromBase64(base64String),
              });
    
              // Create a data URL for the blob
              const url = window.URL.createObjectURL(blob);
    
              // Open the file in a new tab
              window.open(url, '_blank');
    
              window.URL.revokeObjectURL(url);
          } catch (error) {
              console.error('Error opening file in a new tab:', error);
          }
      } else {
          console.error('Invalid or missing uploaded file data at index:', index);
      }
    }
  
}
