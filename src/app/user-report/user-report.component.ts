import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Report {
  reportNumber: Number;
  reportId: string;
  subject: string;
  date: string;
  barangay: string;
}

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {

  userImage: string;
  fullname: string;
  username: string;
  barangay: string;


  reports: Report[] = [
    {
      reportNumber: 1,
      reportId: '2023-07-07-000001',
      subject:'This is a report',
      date: '2023-07-07',
      barangay: 'Palitaw',
    },
    {
      reportNumber: 2,
      reportId: '2023-07-07-000002',
      subject:'Report 2',
      date: '2023-07-07',
      barangay: 'Palitaw',
    },
    {
      reportNumber: 3,
      reportId: '2023-07-07-000003',
      subject:'This is a report',
      date: '2023-07-07',
      barangay: 'Palitaw',
    },
    {
      reportNumber: 4,
      reportId: '2023-07-07-000004',
      subject:'Report 4',
      date: '2023-07-07',
      barangay: 'Palitaw',
    },
  ];
  

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userImage = '';
    this.fullname = '';
    this.barangay = 'Palitaw';
    this.username ='username'
  }

  openReport(report: Report) {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/report-information'], 

    //to pass information from this page to another
    {queryParams:{ 
      username: this.username, 
      image: this.userImage, barangay: this.barangay, 
      fullname: this.fullname,
      subject: report.subject,
      reportId: report.reportId,
      date: report.date, 
      reportNumber: report.reportNumber,
     } });
    console.log('Responding to report:', report);
  }
  deleteReport(report: Report) {
    // Handle the logic for responding to the selected report
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', report);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fullname = params['username'];
      this.userImage = params['image'];
    });
    window.scrollTo(0, 0);
  }
}
