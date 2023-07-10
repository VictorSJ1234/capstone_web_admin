import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface information {
  image: string;
  username: string;
}

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent {
  Admin: information[] = [
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
  editReport(Admin: information) {
    this.router.navigate(['/edit-admin-information'],
    //to pass information from this page to another
    {queryParams:{ username: Admin.username, image: Admin.image} });
    console.log('Responding to report:', Admin);
  }
  deleteReport(Admin: information) {
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', Admin);
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
