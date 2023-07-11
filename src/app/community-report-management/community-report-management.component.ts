import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

interface Report {
  name: string;
  reportNumber: Number;
  reportId: string;
  subject: string;
  date: string;
  barangay: string;
  image: string;
  username: string;
}


@Component({
  selector: 'app-community-report-management',
  templateUrl: './community-report-management.component.html',
  styleUrls: ['./community-report-management.component.css']
})
export class CommunityReportManagementComponent {

  reports: Report[] = [
    {
      name: 'Rene Victor San Juan',
      reportNumber: 1,
      reportId: '2023-07-07-000001',
      subject:'This is a report',
      date: '2023-07-07',
      barangay: 'Palitaw',
      image: '../../assets/icons/rj_.jpg',
      username: 'Rene Victor San Juan',
    },
    {
      name: 'Robert Jay Cruz',
      reportNumber: 2,
      reportId: '2023-07-07-000002',
      subject:'Report 2',
      date: '2023-07-07',
      barangay: 'Palitaw',
      image: '../../assets/icons/robert.jpg',
      username: 'Rene Victor San Juan',
    },
    {
      name: 'Ralph Christian Cristobal',
      reportNumber: 3,
      reportId: '2023-07-07-000003',
      subject:'This is a report',
      date: '2023-07-07',
      barangay: 'Palitaw',
      image: '../../assets/icons/rc.jpg',
      username: 'Rene Victor San Juan',
    },
    {
      name: 'Lee Ann Lo',
      reportNumber: 4,
      reportId: '2023-07-07-000004',
      subject:'Report 4',
      date: '2023-07-07',
      barangay: 'Palitaw',
      image: '../../assets/icons/leeann.jpg',
      username: 'Rene Victor San Juan',
    }
  ];
  

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  openReport(report: Report) {
    this.router.navigate(['/report-information'], 

    //to pass information from this page to another
    {queryParams:{ 
      username: report.username, 
      image: report.image, barangay: report.barangay, 
      fullname: report.name,
      subject: report.subject,
      reportId: report.reportId,
      date: report.date, 
      reportNumber: report.reportNumber,
     } });
    console.log('Responding to report:', report);
  }
  deleteReport(report: Report) {
    this.router.navigate(['/admin-chat']);
    console.log('Responding to report:', report);
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
