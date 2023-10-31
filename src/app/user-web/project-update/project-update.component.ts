import { Component } from '@angular/core';
import { InquiryService } from '../inquiry.service'

interface Project {
  name: string;
  imageSrc: string;
  description: string;
  barangay: string;
}

interface Schedule {
  date: string;
  project: string;
  barangay: string;
}

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent {

  communityProjectsData: any[] = []; // Array to store projects data, 'any' means any datatype.
  

  constructor(private sharedService: InquiryService) {}

  isLoading: boolean = true;


  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchAllProjects();
  }

  // Function to fetch all user data from the service
  fetchAllProjects() {
    this.isLoading = true;
    this.sharedService.getAllCommunityProjects().subscribe(
      (response: any) => {
        // Store the fetched user data in the userData array
        this.communityProjectsData = response.communityProjectsData;

        // Sort the communityProjectsData array in descending order based on project_date and project_time
        this.communityProjectsData.sort((a, b) => {
          const dateA = new Date(a.project_date).getTime();
          const dateB = new Date(b.project_date).getTime();
          this.isLoading = false;

          // Compare project_date first
          if (dateA > dateB) {
            return -1; // a comes before b
          } else if (dateA < dateB) {
            return 1; // b comes before a
          } else {
            // If project_date is the same, compare project_time
            const timeA = new Date(`1970-01-01T${a.project_time}`).getTime();
            const timeB = new Date(`1970-01-01T${b.project_time}`).getTime();
            return timeA > timeB ? -1 : timeA < timeB ? 1 : 0;
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }


  convertToImage(base64String: string): string {
    // Check if the base64String is empty or null
    if (!base64String || base64String.trim() === '') {
      return '../../../assets/community_projects_images/clean_up_drive.png'; 
    }
  
    // Convert the base64 image to an image URL
    return `data:image/jpeg;base64,${base64String}`;
  }

  formatTime(time: string): string {
    const timeString = `${time}`;
    const timeArray = timeString.split(':');
    const hour = parseInt(timeArray[0], 10);
    const minute = parseInt(timeArray[1], 10);
  
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // This will format the time in 12-hour format with AM/PM
    };
  
    const dateTime = new Date();
    dateTime.setHours(hour);
    dateTime.setMinutes(minute);
  
    return dateTime.toLocaleString(undefined, options);
  }
  
  
  
  //dummy information for testing!
  projects: Project[] = [
    {
      name: 'Clean-Up Drive',
      imageSrc: '../../../assets/community_projects_images/clean_up_drive.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      barangay: 'Manggahan',
    },
    {
      name: 'Community Teaching',
      imageSrc: '../../../assets/community_projects_images/clean_up_drive.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      barangay: 'Manggahan',
    },
    {
      name: 'Fumigation',
      imageSrc: '../../../assets/community_projects_images/repellents.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      barangay: 'Pinahbuhatan',
    },
  ];

  schedules: Schedule[] = [
    {
      date: '2023-07-15',
      project: 'Clean-Up Drive',
      barangay: 'Manggahan',
    },
    {
      date: '2023-07-20',
      project: 'Community Teaching',
      barangay: 'Manggahan',
    },
    {
      date: '2023-07-25',
      project: 'Mosquito OL Trap at Larvicidal Application',
      barangay: 'Pinahbuhatan',
    },
  ];

  respondToDisease(disease: Project) {
    console.log('Responding to project:', disease);
  }
}
