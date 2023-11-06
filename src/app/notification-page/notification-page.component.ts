import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../shared/admin-registration.service'
import { AuthService } from '../authService/auth.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css'],
  providers: [AdminRegistrationService, DatePipe],
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

  report: any; // Array to store all report data
  notifications: any[] = [];
  readNotifications: any[] = [];
  unreadNotifications: any[] = [];

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
          this.fetchNotifications();
          this.isLoading = false;
          
          
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
    this.isLoading = true;
    interval(2000) // Poll every 2 seconds 
    .pipe(
      switchMap(() =>this.adminService.getNotificationsByUserAndStatus(this.userId, this.office, 'Unread'))
    )
      .subscribe(
        (response: any) => {
          this.unreadNotifications = response.notifications;
          this.unreadNotifications.sort((a, b) => {
            const dateA = new Date(a.dateCreated).getTime();
            const dateB = new Date(b.dateCreated).getTime();
            return dateB - dateA;
          });
        },
        (error) => {
          console.error('Error fetching unread notifications', error);
        }
      );

    this.adminService.getNotificationsByUserAndStatus(this.userId, this.office, 'Read')
      .subscribe(
        (response: any) => {
          this.readNotifications = response.notifications;
          this.readNotifications.sort((a, b) => {
            const dateA = new Date(a.dateCreated).getTime();
            const dateB = new Date(b.dateCreated).getTime();
            return dateB - dateA;
          });
        },
        (error) => {
          console.error('Error fetching read notifications', error);
        }
      );
  }

  markNotificationAsRead(notification: any) {
    this.isLoading = true;
    this.adminService.updateReportNotificationStatus(notification._id, this.userId, 'Read')
      .subscribe(
        (response: any) => {
          console.log('Update notification status response:', response);
          notification.status = 'Read';
  
          // Get the report data
          this.adminService.getReportToBarangay(notification.reportId)
            .subscribe(
              (reportResponse: any) => {
                if (reportResponse && reportResponse.reportToBarangayData) {
                  this.report = reportResponse.reportToBarangayData[0];
  
                  const reportObject = {
                    _id: this.report._id,
                    reportId: this.report.reportId,
                    report_number: this.report.report_number,
                    barangay: this.report.barangay,
                    status: this.report.status,
                    report_subject: this.report.report_subject,
                    uploaded_file: this.report.uploaded_file,
                    details: this.report.details,
                    date_created: this.report.date_created,
                    formattedDate: this.report.formattedDate,
                  };
  
                  this.router.navigateByUrl('/admin-report-to-barangay-information', { state: { reports: reportObject } });
                } else {
                  console.error('Invalid report data', reportResponse);
                }
              },
              (reportError) => {
                console.error('Error fetching report data', reportError);
              }
            );
        },
        (error) => {
          console.error('Error updating notification status', error);
        }
      );
  }
  

  

  readSelected: boolean = false;
  unreadSelected: boolean = true;

  showReadCards() {
    this.readSelected = true;
    this.unreadSelected = false;
  }

  showUnreadCards() {
    this.readSelected = false;
    this.unreadSelected = true;
  }

  isUnreadNotification(notification: any): boolean {
    return notification.status === 'Unread' && notification.recipient === this.office && notification.userId === this.userId;
  }
  
  isReadNotification(notification: any): boolean {
    return notification.status === 'Read' && notification.recipient === this.office && notification.userId === this.userId;
  }

}
