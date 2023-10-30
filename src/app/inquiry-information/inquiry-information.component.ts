import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inquiry-information',
  templateUrl: './inquiry-information.component.html',
  styleUrls: ['./inquiry-information.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService, DatePipe]
})
export class InquiryInformationComponent {
  //! means undefined
  userData: any;
  inquiries: any;
  inquiryId!: string;
  name!: string;
  email!: string;
  uploadedFile: string = '';
  latestResponseStatus: string = 'New Inquiry'; 

  //for inquiry response
  formData = {
    inquiry_response: '',
    response_subject: '',
    date: new Date().getDate(),
    response_description: '',
  };
  
  isLoading: boolean = true;
  selectedFiles: File[] = [];

  openFileInput() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
      fileInput.click();
    }
  }

  removeSelectedFile(index: number) {
    if (index >= 0 && index < this.selectedFiles.length) {
      this.selectedFiles.splice(index, 1);
    }
  }

  handleFileUpload(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }

  // Function to convert a File to Base64
  convertFilesToBase64(files: File[], callback: (base64Array: string[]) => void) {
    const base64Array: string[] = [];
    let remainingFiles = files.length;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        let base64String = reader.result as string;
        const prefixIndex = base64String.indexOf(';base64,');
        if (prefixIndex !== -1) {
          base64String = base64String.slice(prefixIndex + 8);
        }
        base64Array.push(base64String);

        // Check if all files have been processed
        remainingFiles--;
        if (remainingFiles === 0) {
          callback(base64Array);
        }
      };
      reader.readAsDataURL(file);
    });
  }

 
   // Function to convert a File to Base64
   convertFileToBase64(file: File, callback: (base64String: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let base64String = reader.result as string;
      const prefixIndex = base64String.indexOf(';base64,');
      if (prefixIndex !== -1) {
        base64String = base64String.slice(prefixIndex + 8);
      }

      callback(base64String);
    };
    reader.readAsDataURL(file);
  }



  //response data container
  adminResponseData: any[] = []; 
  

  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;

  carouselModalOpen = false;
  carouselModalSuccess = false;

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  responseSent() {
    this.carouselModalSuccess = false;
    this.carouselModalOpen = false;
    this.ngOnInit();
  }

  openCarouselModalSuccess() {
    this.carouselModalSuccess = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private adminRegistrationService: AdminRegistrationService, private datePipe: DatePipe) {}

  deleteInquiry() {
    this.router.navigate(['/admin-chat']);
  }
  ngOnInit() {
    this.isLoading = true;
    this.route.queryParams.subscribe(params => {
      this.inquiries = history.state.inquiries;
      this.inquiryId = this.inquiries._id; 
      this.isLoading = false; 
    });

    // Format and set the inquiries.date_created
    if (this.inquiries && this.inquiries.date_created) {
      this.inquiries.formattedDate = this.datePipe.transform(this.inquiries.date_created, 'MM/dd/yy');
      this.inquiries.formattedTime = this.datePipe.transform(this.inquiries.date_created, 'h:mm a');
      this.isLoading = false; 
    }
    window.scrollTo(0, 0);
  }

  

  passwordMismatch = false;

  respond(form: NgForm) {
    this.isLoading = true;
    if (this.isFormValid()) {
      form.value.email = this.inquiries.email.toString();
      this.adminRegistrationService.InquiryResponse(form.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.openCarouselModalSuccess();
          console.log('response created successfully:', response);
        },
        (error) => {
          console.error('Error creating project:', error);
        }
      );
    }
    else {
      // Show error message
      if (this.formData.inquiry_response === '' || this.formData.response_subject === '') {
        this.isLoading = false;
        console.log('Please fill out all fields.');
      }
    }

  }

  isFormValid(): boolean {
    return (
      this.formData.inquiry_response.trim() !== '' &&
      this.formData.response_subject.trim() !== '' 
      //this.formData.date.trim() !== '' 
    );
  }

  isLatestResponse(response: any): boolean {
    // Check if 'adminResponseData' has at least one response.
    if (this.adminResponseData.length > 0) {

      return response === this.adminResponseData[0];
    }
     // If 'adminResponseData' is empty, 'response' cannot be the latest so its false
    return false;
  }

   //background color of the status
  getStatusBackgroundColor(inquiryStatus: string): string {
    switch (inquiryStatus) {
        case 'New Inquiry':
            return 'red';
        case 'Under Review':
            return 'blue';
        case 'Resolved':
            return 'green';
        default:
            return 'lightblue';
    }
}

  //text color of the status in the status table
  getStatusColor(inquiryStatus: string): string {
    switch (inquiryStatus) {
        case 'New Inquiry':
            return 'red';
        case 'Under Review':
            return 'blue';
        case 'Resolved':
            return 'green';
        default:
            return '';
    }
  }

  downloadFile(index: number) {
    if (this.inquiries.uploaded_file && Array.isArray(this.inquiries.uploaded_file) && index >= 0 && index < this.inquiries.uploaded_file.length) {
      const base64String = this.inquiries.uploaded_file[index];
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
          a.download = `inquiry_uploaded_file_${index}.${fileType}`;
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
      this.inquiries.uploaded_file &&
      Array.isArray(this.inquiries.uploaded_file) &&
      index >= 0 &&
      index < this.inquiries.uploaded_file.length
    ) {
      const base64String = this.inquiries.uploaded_file[index];
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


}
