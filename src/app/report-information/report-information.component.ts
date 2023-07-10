import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-information',
  templateUrl: './report-information.component.html',
  styleUrls: ['./report-information.component.css']
})
export class ReportInformationComponent {
  
  userImage: string;
  fullname: string;
  username: string;
  barangay: string;
  subject: string;
  reportId: string;
  date: string;
  reportNumber: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userImage = '';
    this.fullname = '';
    this.barangay = 'Palitaw';
    this.username ='username'
    this.subject = '';
    this.reportId ='';
    this.date = '';
    this.reportNumber = '';
  }

  openReport() {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/report-information'], 
    //to pass information from this page to another
    {queryParams:{ username: this.username, image: this.userImage, barangay: this.barangay } });
  }
  deleteReport() {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/admin-chat']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fullname = params['fullname'];
      this.userImage = params['image'];
      this.subject = params['subject'];
      this.reportId = params['reportId'];
      this.date = params['date'];
      this.reportNumber = params['reportNumber'];
    });
    window.scrollTo(0, 0);
  }
}
