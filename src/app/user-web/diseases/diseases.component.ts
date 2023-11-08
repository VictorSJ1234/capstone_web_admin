import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Disease {
  name: string;
  imageSrc: string;
  description: string;
  source: string;
}

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent {
  diseases: Disease[] = [
    {
      name: 'Dengue',
      imageSrc: '../../../assets/diseases/dengue.png',
      description:
        'Dengue is a viral infection caused by the dengue virus (DENV), transmitted to humans through the bite of infected mosquitoes. About half of the world\'s population is now at risk of dengue with an estimated 100–400 million infections occurring each year. ',
        source: '- World Health Organization, 2023',
    },
    {
      name: 'Malaria',
      imageSrc: '../../../assets/diseases/malaria.png',
      description:
        'Malaria is a serious and sometimes fatal disease caused by a parasite that commonly infects a certain type of mosquito which feeds on humans. People who get malaria are typically very sick with high fevers, shaking chills, and flu-like illness.',
      source: '- Centers for Disease Control and Prevention, 2023',
    },
    {
      name: 'Filariasis',
      imageSrc: '../../../assets/diseases/filariasis.png',
      description:
        'Lymphatic filariasis, considered globally as a neglected tropical disease (NTD), ' +
        'is a parasitic disease caused by microscopic, thread-like worms. The adult worms only live in the human lymph system. The lymph system maintains the body’s fluid balance and fights infections.',
      source: '- Centers for Disease Control and Prevention, 2023',
    },
    {
      name: 'Chikungunya',
      imageSrc: '../../../assets/diseases/chikungunya.png',
      description:
        'Chikungunya is a viral disease transmitted to humans through the bites of mosquitoes infected with the chikungunya virus.',
      source: '- PAN American Health Organization, 2023',
    },
    {
      name: 'Zika Virus',
      imageSrc: '../../../assets/diseases/zika virus.png',
      description:
        'Zika is spread mostly by the bite of an infected Aedes species mosquito (Ae. aegypti and Ae. albopictus). These mosquitoes bite during the day and night. Zika can be passed from a pregnant woman to her fetus. Infection during pregnancy can ',
      source: '- Centers for Disease Control and Prevention, 2023',
    },
  ];

  constructor(private router: Router) {}

  respondToDisease(disease: Disease) {
    this.router.navigate(['/diseases-second-page', disease.name], { state: { disease } });
  }
}
