import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-information',
  templateUrl: './report-information.component.html',
  styleUrls: ['./report-information.component.css', '../../assets/bootstrap/bootstrap.min.css']
})
export class ReportInformationComponent {
  carouselModalOpen = false;

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

  
  userImage: string;
  fullname: string;
  username: string;
  barangay: string;
  subject: string;
  reportId: string;
  date: string;
  reportNumber: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userImage = '';
    this.fullname = '';
    this.barangay = 'Palitaw';
    this.username ='username'
    this.subject = '';
    this.reportId ='';
    this.date = '';
    this.reportNumber = '';
  }

  openReport() {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/report-information'], 
    //to pass information from this page to another
    {queryParams:{ username: this.username, image: this.userImage, barangay: this.barangay } });
  }
  deleteReport() {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/admin-chat']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fullname = params['fullname'];
      this.userImage = params['image'];
      this.subject = params['subject'];
      this.reportId = params['reportId'];
      this.date = params['date'];
      this.reportNumber = params['reportNumber'];
    });
    window.scrollTo(0, 0);
  }

  //for report response
  formData = {
    status: '',
    action: '',
    date: '',
    response: '',
  };

  passwordMismatch = false;

  register() {
    if (this.isFormValid()) {
      //data sent to console
      console.log('data:', this.formData);
    } else {
      // Show error message
      if (this.formData.status === '' || this.formData.action === '' || this.formData.date === '' || this.formData.response === '') {
        console.log('Please fill out all fields.');
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.status.trim() !== '' &&
      this.formData.action.trim() !== '' &&
      this.formData.response.trim() !== '' &&
      this.formData.date.trim() !== '' 
    );
  }
}
