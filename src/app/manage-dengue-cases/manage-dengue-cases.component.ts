import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
@Component({
  selector: 'app-manage-dengue-cases',
  templateUrl: './manage-dengue-cases.component.html',
  styleUrls: ['./manage-dengue-cases.component.css']
})
export class ManageDengueCasesComponent implements OnInit{

  denguePostData: any[] = []; // Array to store projects data, 'any' means any datatype.


  selectedProjectId: string = ''; //container of selected id
  selectedProjectTitle: string = ''; // container of selected name
  carouselModalOpen = false;

  isLoading: boolean = true;

  constructor(private router: Router, private adminService: AdminRegistrationService) {}


  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchAllProjects();
  }

  // Function to fetch all user data from the service
  fetchAllProjects() {
    this.isLoading = true;
    this.adminService.getAllDenguePost().subscribe(
      (response: any) => {
        // Store the fetched user data in the userData array
        this.denguePostData = response.denguePostData;

        // Sort the reports array in descending order based on postedDate
        this.denguePostData.sort((a, b) => {
          const dateA = new Date(a.date_created).getTime();
          const dateB = new Date(b.date_created).getTime();
          return dateB - dateA;
        });

        this.isLoading = false; 

      },
      (error) => {
        console.error(error);
      }
    );
  }

  editPost(project: any) {
    // Pass userData to the next page using state
    this.router.navigateByUrl('/edit-dengue-cases', { state: { denguePostData: project } });
    console.log('Responding to report:', project);
  }

  openCarouselModal(project: any) {
    // Store the selected reports's id to the initialized container "selectedReportId"
   this.selectedProjectId = project._id;
   this.selectedProjectTitle = project.project_title;

   // Open the modal
   this.carouselModalOpen = true;
 }


 formatTime(time: string): string {
  const timeString = `${time}`;
  const timeArray = timeString.split(':');
  const hour = parseInt(timeArray[0], 10);
  const minute = parseInt(timeArray[1], 10);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // This will format the time in 12-hour format with AM/PM
  };

  const dateTime = new Date();
  dateTime.setHours(hour);
  dateTime.setMinutes(minute);

  return dateTime.toLocaleString(undefined, options);
  }



    // Function to confirm and delete the selected report
    confirmDelete() {
      // Call the admin service to delete the report
      this.adminService.deleteDenguePost(this.selectedProjectId).subscribe(
        () => {
          console.log('Deleted report:', this.selectedProjectId);
          this.closeCarouselModal();
          this.fetchAllProjects();
        },
        (error) => {
          console.error(error);
        }
      );
    }

  // Function to close the delete modal
  closeCarouselModal() {
    this.carouselModalOpen = false;
  }
}
