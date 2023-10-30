import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css'],
  providers: [AdminRegistrationService]
})
export class NotificationPageComponent {

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminRegistrationService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  isLoading: boolean = true;

  userId:  any;
  fetchedUserData: any;
  username: string = ''; 
  userEmail: string = ''; 
  office: string = '';
  notifications: any[] = [];

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
          this.office = this.fetchedUserData[0].office;
          this.isLoading = false;
          this.fetchNotifications();
          
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
  
    window.scrollTo(0, 0);
  }

  // Function to fetch notifications
  fetchNotifications() {
    this.adminService.getNotificationsByUserAndStatus(this.userId, this.office, 'unread')
      .subscribe(
        (response: any) => {
          this.notifications = response.notifications;
        },
        (error) => {
          console.error('Error fetching notifications', error);
        }
      );
  }

  readSelected: boolean = true;
  unreadSelected: boolean = false;

  showReadCards() {
    this.readSelected = true;
    this.unreadSelected = false;
  }

  showUnreadCards() {
    this.readSelected = false;
    this.unreadSelected = true;
  }

  isUnreadNotification(notification: any): boolean {
    return notification.status === 'unread' && notification.recipient === this.office && notification.userId === this.userId;
  }
  
  isReadNotification(notification: any): boolean {
    return notification.status === 'read';
  }

}
