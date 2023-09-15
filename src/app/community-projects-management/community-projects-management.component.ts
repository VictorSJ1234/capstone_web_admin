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

  constructor(private router: Router, private adminService: AdminRegistrationService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchAllProjects();
  }

  // Function to fetch all user data from the service
  fetchAllProjects() {
    this.adminService.getAllCommunityProjects().subscribe(
      (response: any) => {
        // Store the fetched user data in the userData array
        this.communityProjectsData = response.communityProjectsData;
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

  // Function to confirm and delete the selected report
  confirmDelete() {
    // Call the admin service to delete the report
    this.adminService.deleteProject(this.selectedProjectId).subscribe(
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
