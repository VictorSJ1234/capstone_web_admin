import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AdminRegistrationService } from '../shared/admin-registration.service';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit, AfterViewInit {
  totalUserInformationCount: number = 0;
  totalReportCount: number = 0;

  // Arrays to store barangays and user counts
  barangays: string[] = [];
  months: string[] = [];
  status: string[] = [];
  reports: string[] = [];
  userCounts: number[] = [];
  reportsPerMonth: number[] = [];
  reportsStatus: number[] = [];
  reportCountsByMonth: number[] = [];
  reportCounts: number[] = [];
  reportCountsByStatus: number[] = [];
  isLoading: boolean = false;
  currentYear = new Date().getFullYear();
  emptyChartMessage = "No data available for this chart.";

  MonthList: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  StatusList: string[] = [
    'New Report',
    'Under Review',
    'Action in Progress',
    'Resolved',
    'Cancel',
    'Follow Up',
  ];


  
  // Reference to the canvas elements
  @ViewChild('barChartCanvas') barChartCanvas: any;
  @ViewChild('barChartCanvasForReport') barChartCanvasForReport: any;
  @ViewChild('barChartCanvasForReportPerMonth') barChartCanvasForReportPerMonth: any;
  @ViewChild('pieChartCanvas') pieChartCanvas: any;


  // Track created charts
  private barChart: Chart | null = null;
  private barChartForReport: Chart | null = null;
  private barChartForReportPerMonth: Chart | null = null;
  pieChart: Chart<"pie", number[], string> | null = null;

  constructor(private adminRegistrationService: AdminRegistrationService) {}

  ngOnInit(): void {
    // Fetch user counts for each barangay and update the chart in the 'ngOnInit' method.
    this.fetchUserCountsForBarangays();
    this.fetchReportCountsForBarangays();
    this.fetchUserCountsByMonth();
    this.fetchStatusCount();
    this.adminRegistrationService.getTotalReportCount().subscribe(
      (response: any) => {
        this.totalReportCount = response.totalCount;
      },
      (error) => {
        console.error('Error fetching total user report count:', error);
      }
    );

    this.adminRegistrationService.getTotalUserInformationCount().subscribe(
      (response: any) => {
        this.totalUserInformationCount = response.totalCount;
      },
      (error) => {
        console.error('Error fetching total user report count:', error);
      }
    );

    this.createPieChart();
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  createChart() {
    if (this.barChart) {
      this.barChart.destroy();
    }

    const ctx = this.barChartCanvas.nativeElement;
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.barangays, // Use the fetched barangays
        datasets: [
          {
            label: 'Mobile App Users',
            data: this.userCounts, // Use the fetched user counts
            backgroundColor: '#28376D',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });

    if (this.barangays.length === 0) {
      ctx.fillText(this.emptyChartMessage, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
  }

  createChartForReport() {
    if (this.barChartForReport) {
      this.barChartForReport.destroy();
    }

    const ctx = this.barChartCanvasForReport.nativeElement;
    this.barChartForReport = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.reports, // Use the fetched barangays
        datasets: [
          {
            label: 'User Reports',
            data: this.reportCounts, // Use the fetched user counts
            backgroundColor: '#28376D',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });

    if (this.reports.length === 0) {
      ctx.fillText(this.emptyChartMessage, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
  }

  createChartForReportPerMonth() {
    if (this.barChartForReportPerMonth) {
      this.barChartForReportPerMonth.destroy();
    }
  
    // Sort the data and labels based on the order of MonthList
    const sortedData = Array.from(this.MonthList, month => this.reportsPerMonth[this.months.indexOf(month)]);
    const sortedLabels = Array.from(this.MonthList);
  
    const ctx = this.barChartCanvasForReportPerMonth.nativeElement;
    this.barChartForReportPerMonth = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedLabels,
        datasets: [
          {
            label: 'User Reports per month for the year ' + this.currentYear,
            data: sortedData,
            backgroundColor: '#28376D',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
    this.barChartForReportPerMonth.update();

    if (sortedData.length === 0) {
      ctx.fillText(this.emptyChartMessage, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }

    // For debugging
    console.log('Months:', sortedLabels);
    console.log('Report Counts by Month:', sortedData);
  }
  
  createPieChart() {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  
    const ctx = this.pieChartCanvas.nativeElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.StatusList, 
        datasets: [
          {
            data: this.reportsStatus, 
            backgroundColor: [
              'rgb(49, 84, 147)',
              'rgb(59, 100, 173)',
              'rgb(68, 114, 196)',
              'rgb(143, 162, 212)',
              'rgb(191, 191, 191)',
              'rgb(186, 196, 226)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  
    if (this.reportsStatus.length === 0) {
      ctx.fillText(this.emptyChartMessage, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
  }

  fetchStatusCount() {
    this.isLoading = true;
    const StatusList: string[] = [
      'New Report',
      'Under Review',
      'Action in Progress',
      'Resolved',
      'Cancel',
      'Follow Up',
    ];

    const fetchReportCount = (status: string) => {
      return this.adminRegistrationService.countReportsByStatus(status).toPromise();
    };

    const fetchReportCounts = async () => {
      for (const status of StatusList) {
        try {
          const response: any = await fetchReportCount(status);
          this.status.push(status);
          this.reportsStatus.push(response.count);
          console.log(`Fetched reports count for ${status}:`, response.count);
        } catch (error) {
          console.error(`Error fetching report counts for ${status}:`, error);
        }
      }

      this.sortStatusAndCounts(StatusList);
      this.createPieChart();
      this.isLoading = false;
    };

    fetchReportCounts();
  }

  sortStatusAndCounts(StatusList: string[]) {
    // Sort the status and counts based on the specified order
    this.status.sort((a, b) => StatusList.indexOf(a) - StatusList.indexOf(b));
    this.reportsStatus = this.status.map((status) => this.reportsStatus[this.status.indexOf(status)]);
  }

  fetchUserCountsByMonth() {
    this.isLoading = true; 
    const currentYear = new Date().getFullYear();
    // List of barangays to fetch user counts for
    const MonthList = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    
    // Fetch user counts for each barangay using a loop
    MonthList.forEach((month) => {
      this.adminRegistrationService.getReportByMonth(month, currentYear).subscribe(
        (response: any) => {
          this.months.push(month);
          this.reportsPerMonth.push(response.count);
          console.log(`Fetched reports count for ${month}:`, response.count);
          this.isLoading = false; 

          // Check if all data is fetched and create the charts
          if (this.months.length === MonthList.length) {
            this.createChart();
            this.createChartForReport();
            this.createChartForReportPerMonth();
            this.createPieChart();
          }
        },
        (error) => {
          console.error(`Error fetching report counts for ${month}:`, error);
        }
      );
    });
  }

  fetchUserCountsForBarangays() {
    this.isLoading = true; 
    // List of barangays to fetch user counts for
    const barangayList = [
      'Bagong Ilog',
      'Bagong Katipunan',
      'Bambang',
      'Buting',
      'Caniogan',
      'Dela Paz',
      'Kalawaan',
      'Kapasigan',
      'Kapitolyo',
      'Malinao',
      'Manggahan (incl. Napico)',
      'Maybunga',
      'Oranbo',
      'Palatiw',
      'Pinagbuhatan',
      'Pineda',
      'Rosario',
      'Sagad',
      'San Antonio',
      'San Joaquin',
      'San Jose',
      'San Miguel',
      'San Nicolas',
      'Santa Cruz',
      'Santa Lucia',
      'Santa Rosa',
      'Santolan',
      'Santo Tomas',
      'Sumilang',
      'Ugong',
    ];
  
    // Fetch user counts for each barangay using a loop
    barangayList.forEach((barangay) => {
      this.adminRegistrationService.countUsersByBarangay(barangay).subscribe(
        (response: any) => {
          this.barangays.push(barangay);
          this.userCounts.push(response.count);
          console.log(`Fetched user count for ${barangay}:`, response.count);
          this.isLoading = false; 

          // Check if all data is fetched and create the charts
          if (this.barangays.length === barangayList.length) {
            this.createChart();
            this.createChartForReport();
            this.createChartForReportPerMonth();
            this.createPieChart();
          }
        },
        (error) => {
          console.error(`Error fetching user counts for ${barangay}:`, error);
        }
      );
    });
  }

  fetchReportCountsForBarangays() {
    this.isLoading = true; 
    // List of barangays to fetch user counts for
    const barangayList = [
      'Bagong Ilog',
      'Bagong Katipunan',
      'Bambang',
      'Buting',
      'Caniogan',
      'Dela Paz',
      'Kalawaan',
      'Kapasigan',
      'Kapitolyo',
      'Malinao',
      'Manggahan (incl. Napico)',
      'Maybunga',
      'Oranbo',
      'Palatiw',
      'Pinagbuhatan',
      'Pineda',
      'Rosario',
      'Sagad',
      'San Antonio',
      'San Joaquin',
      'San Jose',
      'San Miguel',
      'San Nicolas',
      'Santa Cruz',
      'Santa Lucia',
      'Santa Rosa',
      'Santolan',
      'Santo Tomas',
      'Sumilang',
      'Ugong',
    ];
  
    // Fetch user counts for each barangay using a loop
    barangayList.forEach((reports) => {
      this.adminRegistrationService.countReportsByBarangay(reports).subscribe(
        (response: any) => {
          this.reports.push(reports);
          this.reportCounts.push(response.count);
          console.log(`Fetched user count for ${reports}:`, response.count);
          this.isLoading = false; 

          // Check if all data is fetched and create the charts
          if (this.reports.length === barangayList.length) {
            this.createChart();
            this.createChartForReport();
            this.createChartForReportPerMonth();
            this.createPieChart();
          }
        },
        (error) => {
          console.error(`Error fetching user counts for ${reports}:`, error);
        }
      );
    });
  }
   
  updateChart() {
    // Update the chart data or options here if needed.
  }
}
