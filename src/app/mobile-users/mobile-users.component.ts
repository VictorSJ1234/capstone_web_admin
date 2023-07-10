import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface mobileUsers {
  image: string;
  username: string;
}

@Component({
  selector: 'app-mobile-users',
  templateUrl: './mobile-users.component.html',
  styleUrls: ['./mobile-users.component.css']
})
export class MobileUsersComponent {
  users: mobileUsers[] = [
    {
      image: '../../assets/icons/robert.jpg',
      username: 'Robert Jay Cruz',
    },
    {
      
      image: '../../assets/icons/leeann.jpg',
      username: 'Lee Ann Lo',
    },
    {
      image: '../../assets/icons/rc.jpg',
      username: 'Ralph Christian Cristobal',
    },
    {
      image: '../../assets/icons/rj_.jpg',
      username: 'Rene Victor San Juan',
      
    }
  ];

  constructor(private router: Router) {}

  viewReports(user: mobileUsers) {
    this.router.navigate(['/user-report'], 
    //to pass infromation from this page to another
    { queryParams: { username: user.username, image: user.image } });
    console.log('Responding to report:', user);
  }
  
  editReport(user: mobileUsers) {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/edit-user-profile'],
    { queryParams: { username: user.username, image: user.image } });
    console.log('Responding to report:', user);
  }
  deleteReport(user: mobileUsers) {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', user);
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
