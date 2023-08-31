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
  deleteReport(Admin: information) {
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', Admin);
  }
  convertToImage(base64String: string): string {
    // Convert the base64 image to an image URL
    return `data:image/jpeg;base64,${base64String}`;
  }
}
