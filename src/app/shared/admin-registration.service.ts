import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminRegistration, UserInformation, AdminResponse, CommunityProjects } from './admin-registration.model';

@Injectable({
  providedIn: 'root'
})
export class AdminRegistrationService {
  private baseURL = 'http://localhost:3000'; 

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

  // Function to edit an admin's account by Id
  editAdmin(_id: string, admin: AdminRegistration): Observable<any> {
    return this.http.put(`${this.baseURL}/editAdmin/${_id}`, admin);
  }

  // Function to edit a user's account by Id
  editUser(_id: string, user: UserInformation): Observable<any> {
    return this.http.put(`${this.baseURL}/editUser/${_id}`, user);
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
}
