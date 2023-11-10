import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { CommunityProjects, denguePost, inquiry } from './inquiry.model';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseURL = 'https://mosquinator-backend-20075696f4d1.herokuapp.com'; 
  constructor(private http: HttpClient) { }

  //get all community projects data
  getAllCommunityProjects(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllCommunityProjects`, {});
  }
  // Function to fetch community projects by reportId
  getAdminResponseById(_id: string): Observable<any> {
    return this.http.post(`${this.baseURL}/getCommunityProject`, { _id });
  }

  //get all community projects data
  getAllDenguePost(): Observable<any> {
    return this.http.post(`${this.baseURL}/getAllDenguePost`, {});
  }

  // Add a new method to get the latest dengue post
  getLatestDenguePost(): Observable<any> {
    return this.http.post(`${this.baseURL}/getLatestDenguePost`, {});
  }

  createInquiry(response: inquiry): Observable<any> {
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/createInquiry`, response)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
