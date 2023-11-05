import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminRegistration, UserInformation, AdminResponse, CommunityProjects, userReportStatus, ReportToBarangay, denguePost, BarangayResponse, AdminResponseToBarangay, inquiry, notification, adminNotification  } from './admin-registration.model';

@Injectable({
  providedIn: 'root'
})
export class AdminRegistrationService {
  public  loggedIn = false;
  private baseURL = 'https://mosquinator-fbd24e41f56d.herokuapp.com'; 

  constructor(private http: HttpClient) { }

  // Function to register an admin user
  registerAdmin(admin: AdminRegistration): Observable<any> {
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/adminRegistration`, admin)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  //function to login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/adminLogin`, { email, password });
  }

  //get all user data
  getAllUsers(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllUserData`, {});
  }

   // Get user reports based on userId
   getUserReports(userId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getUserReport`, { userId });
  }

  //get all report data
  getAllReports(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllReportData`, {});
  }

  //get user informaation using id
  getUserData(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getUserData`, { _id });
  }  
   //get all admin data
   getAllAdmin(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllAdminData`, {});
  }

  // Function to delete a user using id
  deleteUser(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteUser`, { _id });
  }

  // Function to delete a user report usng reportId
  deleteUserReport(reportId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteUserReport`, { reportId });
  }

  // Function to delete an admin using id
  deleteAdmin(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteAdmin`, { _id });
  }

  //get user informaation using id
  getAdminData(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getAdminData`, { _id });
  }  

  // Function to edit an admin's account by Id
  editAdmin(_id: string, admin: AdminRegistration): Observable<any> {
    return this.http.put(`${this.baseURL}/editAdmin/${_id}`, admin);
  }

  // Function to edit a user's account by Id
  editUser(_id: string, user: UserInformation): Observable<any> {
    return this.http.put(`${this.baseURL}/editUser/${_id}`, user);
  }

   // Function to edit an admin's account by Id
   editUserAccountStatus(_id: string, accountStatus: UserInformation): Observable<any> {
    return this.http.put(`${this.baseURL}/updateAccountStatus/${_id}`, accountStatus);
  }


   // Function to edit an admin's role by Id
   editAdminRole(_id: string, admin: AdminRegistration): Observable<any> {
    return this.http.put(`${this.baseURL}/editAdminRole/${_id}`, admin);
  }

  // Function to update report status by reportId
  editReportStatus(_id: string, reportStatus: userReportStatus): Observable<any> {
    return this.http.put(`${this.baseURL}/updateReportStatus/${_id}`, reportStatus);
  }


  //for admin response

  //function for admin response
  adminResponse(response: AdminResponse): Observable<any> {
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/createAdminResponse`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch admin response by reportId
  getAdminResponse(reportId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getAdminResponse`, { reportId });
  }

  //function for project creation
  createProject(response: CommunityProjects): Observable<any> {
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/createCommunityProject`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

   //get all community projects data
   getAllCommunityProjects(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllCommunityProjects`, {});
  }

  // Function to fetch community projects by reportId
  getAdminResponseById(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getCommunityProject`, { _id });
  }

  // Function to edit a community projects by Id
  editProject(_id: string, communityProject: AdminRegistration): Observable<any> {
    return this.http.put(`${this.baseURL}/editCommunityProject/${_id}`, communityProject);
  }

  // Function to delete a community project
  deleteProject(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteCommunityProject`, { _id });
  }

   // Function to create a new report to Barangay
   createReportToBarangay(report: ReportToBarangay): Observable<any> {
    return this.http.post(`${this.baseURL}/createReportToBarangay`, report)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to get a report to Barangay by _id
  getReportToBarangay(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getReportToBarangay`, { _id });
  }

  // Function to get all report to Barangay data
  getAllReportToBarangay(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllReportToBarangay`, {});
  }


  //function for project creation
  createPost(response: denguePost): Observable<any> {
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/createDenguePost`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

   //get all community projects data
   getAllDenguePost(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllDenguePost`, {});
  }

   // Function to delete a community project
   deleteDenguePost(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteDenguePost`, { _id });
  }

  // Function to fetch admin response by reportId
  getDenguPostById(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getDenguePost`, { _id });
  }

   // Function to edit a community projects by Id
   editDenguePost(_id: string, denguePost: AdminRegistration): Observable<any> {
    return this.http.put(`${this.baseURL}/editPost/${_id}`, denguePost);
  }

  // Function to fetch the total number of user_information records
  getTotalUserInformationCount(): Observable<any> {
    return this.http.get(`${this.baseURL}/TotalMobileUser`)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch the total number of user_information records
  getTotalAdminInformationCount(): Observable<any> {
    return this.http.get(`${this.baseURL}/TotalAdminCount`)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getTotalReportCount(): Observable<any> {
    return this.http.get(`${this.baseURL}/totalReports`)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
  
  // Function to fetch community reports by barangay
  getReportsByBarangay(barangay: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getReportByBarangay`, { barangay })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  //function for barangay response
  barangayResponse(response: BarangayResponse): Observable<any> {
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/createBarangayResponse`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to update report status by reportId
  editBarangayReportStatus(_id: string, reportToBarangay: ReportToBarangay): Observable<any> {
    return this.http.put(`${this.baseURL}/updateReportToBarangayStatus/${_id}`, reportToBarangay);
  }

  // Function to fetch admin response by reportId
  getBarangayResponse(reportId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getBarangayResponse`, { reportId });
  }

  //function for barangay response
  AdminResponseToBarangay(response: AdminResponseToBarangay): Observable<any> {
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/createAdminResponseToBarangay`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

   // Function to fetch admin response by reportId
   getAdminResponseToBarangay(reportId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getAdminResponseToBarangay`, { reportId });
  }

  //to fetch the total number of reports by barangay
  getTotalReportsByBarangay(barangay: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getTotalReportsByBarangay`, { barangay })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch the count of users by barangay
  countUsersByBarangay(barangay: string): Observable<any> {
    return this.http.post(`${this.baseURL}/users/countByBarangay`, { barangay });
  }

  // Function to fetch the count of users by barangay
  countReportsByBarangay(barangay: string): Observable<any> {
    return this.http.post(`${this.baseURL}/reports/countByBarangay`, { barangay });
  }

  getReportByMonth(month: string, year: number): Observable<any> {
    return this.http.post(`${this.baseURL}/reports/countReportByMonth`, { month, year })

  }

  getAllInquiries(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllInquiries`, {});
  }
  
  deleteInquiry(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteInquiry`, { _id });
  }
  getCommunityProjectById(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getCommunityProject`, { _id });
  }

  InquiryResponse(response: inquiry): Observable<any> {
    return this.http.post(`${this.baseURL}/sendToMail`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to change a user's password
  changePassword(userId: string, password: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseURL}/changePassword/${userId}`, { password, newPassword });
  }


  createProjectNotification(response: notification): Observable<any> {
    return this.http.post(`${this.baseURL}/createNotificationStatus`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  //function to login user
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseURL}/resetAdminPassword`, { email, newPassword });
  }

  // Function to delete a community project
  deleteProjectNotification(projectId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteCommunityProjectNotification`, { projectId });
  }

  deleteReportNotification(reportId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteReportNotification`, { reportId });
  }

  getTotalInquiryCount(): Observable<any> {
    return this.http.get(`${this.baseURL}/TotalInquiry`)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }


  createAdminNotification(response: adminNotification): Observable<any> {
    return this.http.post(`${this.baseURL}/createAdminNotificationStatus`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getNotificationsByUserAndStatus(adminId: string, recipient: string, notificationStatus: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getAdminNotificationStatus`, { adminId, recipient, notificationStatus });
  }

  // Function to update notification status by userId and _id
  updateReportNotificationStatus(_id: string, adminId: string, newStatus: string): Observable<any> {
    return this.http.put(`${this.baseURL}/updateAdminReportNotificationStatus`, { _id, adminId, newStatus });
  }

  // Function to get all report to Barangay data
  getTerms(): Observable<any> {
    return this.http.post(`${this.baseURL}/getTerms`, {});
  }
  getTermsById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/getByIdTerms/${id}`);
  }

  deleteReportToBarangay(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteReportToBarangay`, { _id });
  }

}
