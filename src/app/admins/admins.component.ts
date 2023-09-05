import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service';

interface information {
  image: string;
  username: string;
}

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit{
  adminData: any[] = []; // Array to store admin data

  selectedAdminId: string = ''; //container of seleted userId
  selectedAdminName: string = ''; // container of selected name
  carouselModalOpen = false;

  constructor(private router: Router, private adminService: AdminRegistrationService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchAllAdmins();
  }

  fetchAllAdmins() {
    this.adminService.getAllAdmin().subscribe(
      (response: any) => {
        this.adminData = response.allAdminData;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  editReport(Admin: any) {
     // Pass adminData to the next page using state
     this.router.navigateByUrl('/edit-admin-information', { state: { adminData: Admin } });
     console.log('Responding to report:', Admin);
  }
  openCarouselModal(Admin: any) {
     // Store the selected admin's id to the initialized container "sekectedAdminId"
    this.selectedAdminId = Admin._id;
    this.selectedAdminName = Admin.firstname +" "+ Admin.lastname;

    //open the modal
    this.carouselModalOpen = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }


  // Function to confirm and delete the selected admin
  confirmDelete() {
     // Call the admin service to delete the admin
    this.adminService.deleteAdmin(this.selectedAdminId).subscribe(
      () => {
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
}
