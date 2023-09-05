import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'

interface mobileUsers {
  username: string;
}

@Component({
  selector: 'app-mobile-users',
  templateUrl: './mobile-users.component.html',
  styleUrls: ['./mobile-users.component.css']
})
export class MobileUsersComponent implements OnInit {
  userData: any[] = []; // Array to store user data, 'any' means any datatype.

  selectedUserId: string = ''; //container of seleted userId
  selectedUserName: string = ''; // container of selected name
  carouselModalOpen = false;

  constructor(private router: Router, private adminService: AdminRegistrationService) {}

  ngOnInit() {
    // Call the fetchAllUsers function
    this.fetchAllUsers();
     // Scroll to the top of the page when the page is loaded
    window.scrollTo(0, 0);
  }

  // Function to fetch all user data from the service
  fetchAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (response: any) => {
        // Store the fetched user data in the userData array
        this.userData = response.allUserData;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  viewReports(user: any) {
   // Pass userData to the next page using state
   this.router.navigateByUrl('/user-report', { state: { userData: user } });
   console.log('Responding to report:', user);
  }
  
  editReport(user: any) {
    // Pass userData to the next page using state
    this.router.navigateByUrl('/edit-user-profile', { state: { userData: user } });
    console.log('Responding to report:', user);
  }
  openCarouselModal(user: any) {
    // Store the selected user's id to the initialized container "selectedUserId"
    this.selectedUserId = user._id;
    this.selectedUserName = user.name;

    // Open the modal
    this.carouselModalOpen = true;
  }

  // Function to close the delete modal
  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

  // Function to confirm and delete the selected user
  confirmDelete() {
    // Call the admin service to delete the user
    this.adminService.deleteUser(this.selectedUserId).subscribe(
      () => {
        console.log('Deleted user:', this.selectedUserName);
        this.closeCarouselModal(); // Close the modal
        this.fetchAllUsers(); // Reload user data after deletion
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
}
