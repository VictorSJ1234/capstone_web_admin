import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminRegistration } from './admin-registration.model';

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
}
