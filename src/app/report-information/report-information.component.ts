import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service';


@Component({
  selector: 'app-report-information',
  templateUrl: './report-information.component.html',
  styleUrls: ['./report-information.component.css', '../../assets/bootstrap/bootstrap.min.css'],
  providers: [AdminRegistrationService]
})
export class ReportInformationComponent {
  //initialize data containers
  //! means undefined
  userData: any;
  reports: any;
  userId!: string;
  name!: string;
  

  profilePicture!: string; //! means undefined

  //to store the converted image
  image: string | ArrayBuffer | null = null;

  carouselModalOpen = false;

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private adminRegistrationService: AdminRegistrationService) {}

  deleteReport() {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/admin-chat']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reports = history.state.reports;
      this.userId = this.reports.userId; // Assuming userId is a property in your report data.

      // Fetch user data based on userId.
      this.adminRegistrationService.getUserData(this.userId).subscribe(
        (data: any) => {
          this.userData = data.userInformationData; // Assign fetched user data to userData.
          // Convert the base64 image to a data URL
          if (this.userData[0].profilePicture) {
            this.image = 'data:image/jpeg;base64,' + this.userData[0].profilePicture;
          }

          console.log('User Reports:', this.userData[0].name);
          this.name = this.userData[0].name;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
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
