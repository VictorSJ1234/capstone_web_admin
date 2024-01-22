import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CommunityProjects, denguePost, inquiry } from './inquiry.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseURL = environment.apiUrl; 
  private apiKey = 'pasigdtf'; 
  constructor(private http: HttpClient) { }

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

  // Get all community projects data
  getAllDenguePost(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getAllDenguePost`, {}, { headers });
  }

  // Add a new method to get the latest dengue post
  getLatestDenguePost(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(`${this.baseURL}/getLatestDenguePost`, {}, { headers });
  }

  createInquiry(response: inquiry): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    // Make a POST request to the admin registration endpoint
    return this.http.post(`${this.baseURL}/createInquiry`, response, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
