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
  deleteReport(user: mobileUsers) {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', user);
  }
  convertToImage(base64String: string): string {
    // Convert the base64 image to an image URL
    return `data:image/jpeg;base64,${base64String}`;
  }
}
