import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { AuthService } from '../authService/auth.service';


@Component({
  selector: 'app-super-admin-account-management',
  templateUrl: './super-admin-account-management.component.html',
  styleUrls: ['./super-admin-account-management.component.css']
})
export class SuperAdminAccountManagementComponent implements OnInit {
  totalUserInformationCount: number = 0; 
  totalAdminCount: number = 0; 
  userId:  any;
  fetchedUserData: any;
  username: string = ''; 
  userEmail: string = ''; 

  adminProfilePicture!: string;
  image: string | ArrayBuffer | null = null;

  isLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private adminRegistrationService: AdminRegistrationService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
   }

  ngOnInit(): void {
    this.isLoading = true;
    //get total number of user
    this.adminRegistrationService.getTotalUserInformationCount().subscribe(
      (response: any) => {
        this.isLoading = false;
        this.totalUserInformationCount = response.totalCount;
      },
      (error) => {
        console.error('Error fetching total user information count:', error);
      }
    );


    //get total number of reports
    this.adminRegistrationService.getTotalAdminInformationCount().subscribe(
      (response: any) => {
        this.totalAdminCount = response.totalCount;
      },
      (error) => {
      }
    );

    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.route.queryParams.subscribe(params => {
      // Load user reports after fetching user data
      this.adminRegistrationService.getAdminData(this.userId.toString()).subscribe(
        (response: any) => {
          this.fetchedUserData = response.userAdminData; 
          console.log('name: ', this.fetchedUserData[0].fullname);
          this.username = this.fetchedUserData[0].fullname;
          this.userEmail = this.fetchedUserData[0].email;
          this.adminProfilePicture = this.fetchedUserData[0].adminProfilePicture;
          if (this.adminProfilePicture) {
            this.image = 'data:image/jpeg;base64,' + this.adminProfilePicture;
            this.isLoading = false;
          }
         
          
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
    this.router.navigateByUrl('/edit-admin-information', { state: { adminData: fetchedUserData[0] } });
    console.log('Responding to report:', fetchedUserData);
 }
}
