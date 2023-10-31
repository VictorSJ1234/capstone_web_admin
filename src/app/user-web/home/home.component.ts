import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  carouselModalOpen = false;

  openCarouselModal() {
    this.carouselModalOpen = true;
  }

  closeCarouselModal() {
    this.carouselModalOpen = false;
  }

}
