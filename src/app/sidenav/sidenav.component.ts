import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers: [AdminRegistrationService]
})
export class SidenavComponent {
  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminRegistrationService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }


  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  userId:  any;
  fetchedUserData: any;
  username: string = ''; 
  userEmail: string = ''; 

  adminProfilePicture!: string;
  image: string | ArrayBuffer | null = null;

  isLoading: boolean = true;

  

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.route.queryParams.subscribe(params => {
      // Load user reports after fetching user data
      this.adminService.getAdminData(this.userId.toString()).subscribe(
        (response: any) => {
          this.fetchedUserData = response.userAdminData; 
          console.log('name: ', this.fetchedUserData[0].fullname);
          this.username = this.fetchedUserData[0].fullname;
          this.userEmail = this.fetchedUserData[0].email;
          this.adminProfilePicture = this.fetchedUserData[0].adminProfilePicture;
          if (this.adminProfilePicture) {
            this.image = 'data:image/jpeg;base64,' + this.adminProfilePicture;
          }
          this.isLoading = false;
          
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
  
    window.scrollTo(0, 0);
  }

  editReport(fetchedUserData: any) {
    // Pass adminData to the next page using state
    this.router.navigateByUrl('/task-force-account', { state: { adminData: fetchedUserData[0] } });
    console.log('Responding to report:', fetchedUserData);
 }

 logout() {
  this.authService.logout();
  this.router.navigate(['/']);
}
}
