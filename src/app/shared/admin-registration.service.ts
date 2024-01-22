import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminRegistration, UserInformation, AdminResponse, CommunityProjects, userReportStatus, ReportToBarangay, denguePost, BarangayResponse, AdminResponseToBarangay, inquiry, notification, adminNotification } from './admin-registration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminRegistrationService {
  public loggedIn = false;
  private baseURL = environment.apiUrl;

  private apiKey = 'pasigdtf';

  constructor(private http: HttpClient) { }

  // Function to register an admin user
  registerAdmin(admin: AdminRegistration): Observable<any> {
    // Make a POST request to the admin registration endpoint with the API key in the headers
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/adminRegistration`, admin, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Repeat the following pattern for other functions

  // Function to login user
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/adminLogin`, { email, password }, { headers });
  }

  // Get all user data
  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllUserData`, {}, { headers });
  }

  // Get user reports based on userId
  getUserReports(userId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getUserReport`, { userId }, { headers });
  }

  // Get all report data
  getAllReports(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllReportData`, {}, { headers });
  }

  // Get user information using id
  getUserData(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getUserData`, { _id }, { headers });
  } 
   //get all admin data
   getAllAdmin(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllAdminData`, {}, { headers });
  }

  // Function to delete a user using id
  deleteUser(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteUser`, { _id }, { headers });
  }

  // Function to delete a user report using reportId
  deleteUserReport(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteUserReport`, { reportId }, { headers });
  }

  // Function to delete an admin using id
  deleteAdmin(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteAdmin`, { _id }, { headers });
  }

  // Get user information using id
  getAdminData(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAdminData`, { _id }, { headers });
  }

  // Function to edit an admin's account by Id
  editAdmin(_id: string, admin: AdminRegistration): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/editAdmin/${_id}`, admin, { headers });
  }

  // Function to edit a user's account by Id
  editUser(_id: string, user: UserInformation): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/editUser/${_id}`, user, { headers });
  }

  // Function to edit an admin's account by Id
  editUserAccountStatus(_id: string, accountStatus: UserInformation): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/updateAccountStatus/${_id}`, accountStatus, { headers });
  }

  // Function to edit an admin's role by Id
  editAdminRole(_id: string, admin: AdminRegistration): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/editAdminRole/${_id}`, admin, { headers });
  }

  // Function to update report status by reportId
  editReportStatus(_id: string, reportStatus: userReportStatus): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/updateReportStatus/${_id}`, reportStatus, { headers });
  }

  // For admin response

  // Function for admin response
  adminResponse(response: AdminResponse): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createAdminResponse`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch admin response by reportId
  getAdminResponse(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAdminResponse`, { reportId }, { headers });
  }

  // Function for project creation
  createProject(response: CommunityProjects): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createCommunityProject`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Get all community projects data
  getAllCommunityProjects(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllCommunityProjects`, {}, { headers });
  }

  // Function to fetch community projects by reportId
  getAdminResponseById(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getCommunityProject`, { _id }, { headers });
  }

  // Function to edit a community project by Id
  editProject(_id: string, communityProject: AdminRegistration): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/editCommunityProject/${_id}`, communityProject, { headers });
  }

  // Function to delete a community project
  deleteProject(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteCommunityProject`, { _id }, { headers });
  }

  // Function to create a new report to Barangay
  createReportToBarangay(report: ReportToBarangay): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createReportToBarangay`, report, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to get a report to Barangay by _id
  getReportToBarangay(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getReportToBarangay`, { _id }, { headers });
  }

  // Function to get all report to Barangay data
  getAllReportToBarangay(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllReportToBarangay`, {}, { headers });
  }

  // Function for project creation
  createPost(response: denguePost): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createDenguePost`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Get all community projects data
  getAllDenguePost(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllDenguePost`, {}, { headers });
  }

   // Function to delete a community project
   deleteDenguePost(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteDenguePost`, { _id }, { headers });
  }

  // Function to fetch admin response by reportId
  getDenguPostById(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getDenguePost`, { _id }, { headers });
  }

  // Function to edit a community project by Id
  editDenguePost(_id: string, denguePost: AdminRegistration): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/editPost/${_id}`, denguePost, { headers });
  }

  // Function to fetch the total number of user_information records
  getTotalUserInformationCount(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get(`${this.baseURL}/TotalMobileUser`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch the total number of user_information records
  getTotalAdminInformationCount(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get(`${this.baseURL}/TotalAdminCount`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch the total number of reports
  getTotalReportCount(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get(`${this.baseURL}/totalReports`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch community reports by barangay
  getReportsByBarangay(barangay: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getReportByBarangay`, { barangay }, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function for barangay response
  barangayResponse(response: BarangayResponse): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createBarangayResponse`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to update report status by reportId
  editBarangayReportStatus(_id: string, reportToBarangay: ReportToBarangay): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/updateReportToBarangayStatus/${_id}`, reportToBarangay, { headers });
  }

  // Function to fetch admin response by reportId
  getBarangayResponse(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getBarangayResponse`, { reportId }, { headers });
  }

  // Function for barangay response
  AdminResponseToBarangay(response: AdminResponseToBarangay): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createAdminResponseToBarangay`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch admin response by reportId
  getAdminResponseToBarangay(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAdminResponseToBarangay`, { reportId }, { headers });
  }

  // To fetch the total number of reports by barangay
  getTotalReportsByBarangay(barangay: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getTotalReportsByBarangay`, { barangay }, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to fetch the count of users by barangay
  countUsersByBarangay(barangay: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/users/countByBarangay`, { barangay }, { headers });
  }

  // Function to fetch the count of reports by barangay
  countReportsByBarangay(barangay: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/reports/countByBarangay`, { barangay }, { headers });
  }

  getReportByMonth(month: string, year: number): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/reports/countReportByMonth`, { month, year }, { headers });
  }

  getAllInquiries(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllInquiries`, {}, { headers });
  }

  deleteInquiry(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteInquiry`, { _id }, { headers });
  }

  getCommunityProjectById(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getCommunityProject`, { _id }, { headers });
  }

  InquiryResponse(response: inquiry): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/sendToMail`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Function to change a user's password
  changePassword(userId: string, password: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/changePassword/${userId}`, { password, newPassword }, { headers });
  }

  createProjectNotification(response: notification): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createNotificationStatus`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Reset password
  resetPassword(email: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/resetAdminPassword`, { email, newPassword }, { headers });
  }

  // Delete community project notification
  deleteProjectNotification(projectId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteCommunityProjectNotification`, { projectId }, { headers });
  }

  // Delete report notification
  deleteReportNotification(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteReportNotification`, { reportId }, { headers });
  }

  // Get total inquiry count
  getTotalInquiryCount(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get(`${this.baseURL}/TotalInquiry`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Create admin notification
  createAdminNotification(response: adminNotification): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/createAdminNotificationStatus`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // Get notifications by user and status
  getNotificationsByUserAndStatus(adminId: string, recipient: string, notificationStatus: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAdminNotificationStatus`, { adminId, recipient, notificationStatus }, { headers });
  }

  // Update notification status by userId and _id
  updateReportNotificationStatus(_id: string, adminId: string, newStatus: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put(`${this.baseURL}/updateAdminReportNotificationStatus`, { _id, adminId, newStatus }, { headers });
  }

  // Get all report to Barangay data
  getTerms(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getTerms`, {}, { headers });
  }
  
  // Get terms by ID
  getTermsById(id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get(`${this.baseURL}/getByIdTerms/${id}`, { headers });
  }

  // Delete report to Barangay
  deleteReportToBarangay(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteReportToBarangay`, { _id }, { headers });
  }

  // Delete Barangay response
  deleteBarangayResponse(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.delete(`${this.baseURL}/deleteBarangayResponse/${reportId}`, { headers });
  }

  // Delete an admin response by reportId
  deleteAdminResponse(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.delete(`${this.baseURL}/deleteAdminResponseToBarangay/${reportId}`, { headers });
  }

  // Delete a report notification by reportId
  deleteReportNotificationById(reportId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/deleteReportNotificationById`, { reportId }, { headers });
  }

  // Count reports by status
  countReportsByStatus(reportStatus: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/reports/countByStatus`, { reportStatus }, { headers });
  }

  // Count reports by status and Barangay
  countReportsByStatusAndBarangay(barangay: string, reportStatus: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/reports/countByStatusAndBarangay`, { barangay, reportStatus }, { headers });
  }
}
