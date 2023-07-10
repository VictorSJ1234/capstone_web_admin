import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  number_of_users: number;
  number_of_posts: number;
  number_of_complaints: number;

  constructor() {
    this.number_of_users = 10;
    this.number_of_posts = 5;
    this.number_of_complaints = 3;
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}