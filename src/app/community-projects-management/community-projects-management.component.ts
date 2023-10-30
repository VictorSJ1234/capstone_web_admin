import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'

interface CardInfo {
  name: string;
}

@Component({
  selector: 'app-community-projects-management',
  templateUrl: './community-projects-management.component.html',
  styleUrls: ['./community-projects-management.component.css']
})
export class CommunityProjectsManagementComponent implements OnInit{

  communityProjectsData: any[] = []; // Array to store projects data, 'any' means any datatype.


  selectedProjectId: string = ''; //container of selected id
  selectedProjectTitle: string = ''; // container of selected name
  carouselModalOpen = false;

  currentPage: number = 1; // Current page number of the pagination
  itemsPerPage: number = 10; // Number of items per page in the table
  isLoading: boolean = true;

  // Function to update the current pagination page
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
    window.scrollTo(0, 0);
  }

 // identify the number of  items per page
  getPages(): number[] {
    const totalItems = this.communityProjectsData.length;
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

  constructor(private router: Router, private adminService: AdminRegistrationService) {}


  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchAllProjects();
  }

  // Function to fetch all user data from the service
  fetchAllProjects() {
    this.isLoading = true;
    this.adminService.getAllCommunityProjects().subscribe(
      (response: any) => {
        // Store the fetched user data in the userData array
        this.communityProjectsData = response.communityProjectsData;

        // Sort the reports array in descending order based on postedDate
        this.communityProjectsData.sort((a, b) => {
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
    this.router.navigateByUrl('/edit-community-project', { state: { communityProjectsData: project } });
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
      this.isLoading = true; 
      // Call the admin service to delete the report
      this.adminService.deleteProject(this.selectedProjectId).subscribe(
        () => {
          this.isLoading = false; 
          console.log('Deleted report:', this.selectedProjectId);
          this.adminService.deleteProjectNotification(this.selectedProjectId).subscribe(
            () => {
              console.log('Deleted report:', this.selectedProjectId);
            },
            (error) => {
              console.error(error);
            }
          );
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
