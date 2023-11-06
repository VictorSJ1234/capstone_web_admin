import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AdminRegistrationService]
})
export class NavbarComponent {
  pageTitle: string = 'Home / Dashboard';

  redirectToNotification() {
    // Get the user's role from AuthService
    const userRole = this.authService.getUserRole();

    // Redirect based on the user's role
    if (userRole === 'Dengue Task Force Staff') {
      this.router.navigate(['/notification-page']);
    } else if (userRole === 'Barangay Health Officer') {
      this.router.navigate(['/barangay-notification-page']);
    } else if (userRole === 'Admin') {
      this.router.navigate(['/admin-notification-page']);
    }
  }

  userId:  any;
  fetchedUserData: any;
  username: string = ''; 
  userEmail: string = ''; 
  office: string = '';
  role: string = '';

  isLoading: boolean = true;
  unreadNotificationCount: number = 0;

  fetchUserInformation(){
    this.userId = this.authService.getUserId();
    this.route.queryParams.subscribe(params => {
      // Load user reports after fetching user data
      this.adminService.getAdminData(this.userId.toString()).subscribe(
        (response: any) => {
          this.fetchedUserData = response.userAdminData; 
          console.log('name: ', this.fetchedUserData[0].fullname);
          this.username = this.fetchedUserData[0].fullname;
          this.userEmail = this.fetchedUserData[0].email;
          this.office = this.fetchedUserData[0].office;
          this.role = this.fetchedUserData[0].official_role;
          this.adminService.getNotificationsByUserAndStatus(this.userId, this.office, 'Unread')
          .subscribe(
            (response: any) => {
              console.log("check", response)
              this.unreadNotificationCount = response.notifications.length;
            },
            (error) => {
              console.error('Error fetching unread notifications', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
  }

  pollNotifications() {
    interval(5000) // Poll every 5 seconds 
      .pipe(
        switchMap(() => this.adminService.getNotificationsByUserAndStatus(this.userId, this.office, 'Unread'))
      )
      .subscribe(
        (response: any) => {
          this.unreadNotificationCount = response.notifications.length;
        },
        (error) => {
          console.error('Error fetching unread notifications', error);
        }
      );
  }

  ngOnInit() {
    this.fetchUserInformation();
    this.pollNotifications(); 
  }

  routeToTitle: { [key: string]: string } = {
    '/': 'Home / Dashboard',
    '/account-registration': 'Account Registration',
    '/admin-dashboard': 'Admin Dashboard',
    '/account-management': 'Account Management',
    '/mobile-users': 'Mobile Users',
    '/admins': 'Admins',
    '/user-report': 'User Reports',
    '/community-report-management': 'Community Report Management',
    '/report-information': 'Report Information',
    '/edit-admin-information': 'Admin Information',
    '/edit-user-profile': 'User Profile',
    '/mosquitopedia': 'Mosquitopedia',
    '/community-projects-management': 'Community Projects Management',
    '/create-community-project': 'Create Community Project',
    '/edit-community-project': 'Edit Community Project',
    '/dengue-post-component': 'Dengue Cases Post Component',
    '/barangay-dashboard': 'Barangay Dashboard',
    '/barangay-concern-management': 'Barangay Concern Management',
    '/notification-page': 'Notification Page',
    '/admin-notification-page': 'Admin Notification Page',
    '/barangay-notification-page': 'Barangay Notification Page',
    '/manage-dengue-cases': 'Manage Dengue Cases Posts',
    '/edit-dengue-cases': 'Edit Dengue Cases',
    '/admin-reports-for-barangay-management': 'Admin Reports for Barangay Management',
    '/create-report-for-barangay': 'Create Report for Barangay',
    '/admin-report-to-barangay-information': 'Admin Report to Barangay Information',
    '/admin-report-barangay-view': 'Admin Report Barangay View',
    '/barangay-response-view': 'Barangay Response View',
    '/barangay-admin-profile-edit': 'Barangay Admin Profile Edit',
    '/super-admin-dashboard': 'Super Admin Dashboard',
    '/super-admin-account-management': 'Super Admin Accounts Management',
    '/edit-taskforce-profile': 'Edit Taskforce Profile',
    '/inquiries-management': 'Inquiries Management',
    '/inquiry-information': 'Inquiry Information',
    '/task-force-account': 'Task Force Account',
    '/super-admin-account-information': 'Super Admin Account Information',
  };

  constructor(private router: Router, private authService: AuthService, private adminService: AdminRegistrationService, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        this.pageTitle = this.routeToTitle[currentRoute] || 'Unknown Page';
      }
    });
  }
}
