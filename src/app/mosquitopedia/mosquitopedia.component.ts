import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface CardInfo {
  name: string;
}

@Component({
  selector: 'app-mosquitopedia',
  templateUrl: './mosquitopedia.component.html',
  styleUrls: ['./mosquitopedia.component.css']
})
export class MosquitopediaComponent {

  cardInfo?: CardInfo[];

  ngOnInit() {
    window.scrollTo(0, 0);
    this.setCardInfo();
  }

  setCardInfo() {
    this.cardInfo = [
      {
        name: 'Dengue',
      },
      {
        name: 'Malaria',
      },
      {
        name: 'Filariasis',
      },
      {
        name: 'Chikungunya',
      },
      {
        name: 'Zika Virus',
      },
    ];
  }
}
