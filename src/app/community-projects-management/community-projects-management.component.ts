import { Component } from '@angular/core';

interface CardInfo {
  name: string;
}

@Component({
  selector: 'app-community-projects-management',
  templateUrl: './community-projects-management.component.html',
  styleUrls: ['./community-projects-management.component.css']
})
export class CommunityProjectsManagementComponent {

  cardInfo?: CardInfo[];

  ngOnInit() {
    window.scrollTo(0, 0);
    this.setCardInfo();
  }

  setCardInfo() {
    this.cardInfo = [
      {
        name: 'Clean-Up Drive',
      },
      {
        name: 'Community Teaching',
      },
      {
        name: 'Fugimation',
      },
    ];
  }

}
