import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

interface Disease {
  name: string;
  imageSrc: string;
  description: string;
  source: string;
  cardInfo: CardInfo[];
  cardInfoPrevention: cardInfoPrevention[];
}

interface Disease2 {
  name: string;
  imageSrc: string;
  description: string;
  source: string;
}

interface CardInfo {
  symptom: string;
}
interface cardInfoPrevention{
  prevention: string;
}

@Component({
  selector: 'app-diseases-second-page',
  templateUrl: './diseases-second-page.component.html',
  styleUrls: ['./diseases-second-page.component.css']
})
export class DiseasesSecondPageComponent implements OnInit {
  selectedDisease?: Disease;
  info?: string;
  source?: string;
  additionalInfo?: string;
  scientificName?: string;
  symptoms?: string;
  prevention?: string;
  cases?: string;
  cardInfo?: CardInfo[];
  cardInfoPrevention?: cardInfoPrevention[];

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}

  currentIndex = 0;

  nextDisease() {
    this.currentIndex = (this.currentIndex + 1) % this.diseases2.length;
    this.router.navigate(['/diseases-second-page', this.diseases2[this.currentIndex].name], {
      state: { disease: this.diseases2[this.currentIndex] },
    }).then(() => {
    location.reload();
  });
  }
  
  prevDisease() {
    this.currentIndex = (this.currentIndex - 1 + this.diseases2.length) % this.diseases2.length;
    this.router.navigate(['/diseases-second-page', this.diseases2[this.currentIndex].name], {
      state: { disease: this.diseases2[this.currentIndex] },
    }).then(() => {
      location.reload();
    });
  }
  

   handleBackButton() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.diseases2.length - 1;
    } else {
      // Navigate to the previous disease
      this.currentIndex--;
    }
    
    // Update the browser's history state
    const previousDisease = this.diseases2[this.currentIndex];
    this.router.navigate([], {
      relativeTo: this.route,
      state: { disease: previousDisease },
      replaceUrl: true,
    }).then(() => {
      location.reload();
    });
  }

  // function to navigate to a specific disease
  navigateToDisease(index: number) {
    this.router.navigate(['/diseases-second-page', this.diseases2[index].name], {
      state: { disease: this.diseases2[index] },
    }).then(() => {
      location.reload();
    });
  }

  diseases2: Disease2[] = [
    {
      name: 'Dengue',
      imageSrc: '../../../assets/diseases/dengue.jpeg',
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
      imageSrc: '../../../assets/diseases/zikavirus.png',
      description:
        'Zika is spread mostly by the bite of an infected Aedes species mosquito (Ae. aegypti and Ae. albopictus). These mosquitoes bite during the day and night. Zika can be passed from a pregnant woman to her fetus. Infection during pregnancy can ',
      source: '- Centers for Disease Control and Prevention, 2023',
    },
  ];


  ngOnInit() {
    this.selectedDisease = history.state.disease;
    this.currentIndex = this.diseases2.findIndex(disease => disease.name === this.selectedDisease?.name);
    window.scrollTo(0, 0);
    this.setInformation();
    this.setAdditionalInfo();
    this.setScientificName();
    this.setSource();
    this.setSymptoms();
    this.setPrevention();
    this.setCases();
    this.setCardInfo(); 
    this.setCardInfoPrevention();
    this.location.subscribe(() => {
      this.handleBackButton();
    });
  }


  //scientific name

  setScientificName() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.scientificName = 'Aedes species (Ae. aegypti or Ae. albopictus) mosquito';
        break;
      case 'Malaria':
        this.scientificName = 'Anopheles mosquitoes';
        break;
      case 'Filariasis':
        this.scientificName = 'Aedes (Ae. aegypti) mosquito';
        break;
      case 'Chikungunya':
        this.scientificName = 'Aedes (Stegomyia) aegypti, Aedes (Stegomyia) albopictus';
        break;
      case 'Zika Virus':
        this.scientificName = 'Aedes (Ae. aegypti) mosquito';
        break;
      default:
        this.scientificName = 'Additional info';
        break;
    }
  }

  setInformation() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.info = 'Dengue fever (break-bone fever) is a viral ailment conveyed by mosquitos to humans. It occurs more frequently in tropical and subtropical areas. It is also a viral infection caused by the dengue virus (DENV), transmitted to humans through the bite of infected mosquitoes. About half of the world\'s population is now at risk of dengue with an estimated 100–400 million infections occurring each year. mosquitoes multiply more every rainy season and their life lasts from 20-30 days.';
        break;
      case 'Malaria':
        this.info = 'Malaria is a potentially fatal illness carried by mosquitos. It is usually found in tropical countries. It is both avoidable and treatable. The illness is caused by a parasite and does not transfer from person to person.';
        break;
      case 'Filariasis':
        this.info = 'Elephantiasis, also known as lymphatic filariasis, is a neglected tropical illness. Infection occurs when filarial parasites infect humans via mosquitoes. Infection is typically acquired in childhood and causes concealed lymphatic system damage.';
        break;
      case 'Chikungunya':
        this.info = 'Chikungunya is a viral disease transmitted by mosquitos that is caused by the chikungunya virus (CHIKV), an RNA virus of the alphavirus genus of the Togaviridae family. Chikungunya is derived from a phrase in the Kimakonde language that means "to become contorted." ';
        break;
      case 'Zika Virus':
        this.info = 'The Zika virus is a mosquito-borne virus that was discovered in a Rhesus macaque monkey in Uganda in 1947, followed by indications of infection and sickness in people in other African nations in the 1950s.'
        +'Human infections were reported occasionally in Africa and Asia from the 1960s to the 1980s. However, outbreaks of Zika virus illness have been reported in Africa, the Americas, Asia, and the Pacific since 2007.';
        break;
      default:
        this.info = 'Additional info';
        break;
    }
  }

  //source
  setSource() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.source = '- World Health Organization, March 17, 2023';
        break;
      case 'Malaria':
        this.source = '- World Health Organization, Dec 8, 2022';
        break;
      case 'Filariasis':
        this.source = '- World Health Organization, Dec 8, 2022';
        break;
      case 'Chikungunya':
        this.source = '- World Health Organization, Dec 8, 2022';
        break;
      case 'Zika Virus':
        this.source = '- World Health Organization, Dec 8, 2022';
        break;
      default:
        this.source = 'Additional info';
        break;
    }
  }

  //additional Info

  setAdditionalInfo() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.additionalInfo =
        'They live in dark place and fly at a distance of 50-300 meters from the spawning or breeding area. Aedes mosquitoes multiply more every rainy season and their life lasts from 20-30 days"'
        break;
      case 'Malaria':
        this.additionalInfo = 
        'Malaria is mostly transmitted to humans through the bites of infected female Anopheles mosquitos. Malaria can also be transmitted through blood transfusions and infected needles. '
        break;
      case 'Filariasis':
        this.additionalInfo = 
        'The global baseline estimate of lymphatic filariasis patients was 25 million males with hydrocele and more than 15 million persons with lymphoedema. These chronic illness symptoms continue to affect as least 36 million individuals. '
        break;
      case 'Chikungunya':
        this.additionalInfo = 
        'CHIKV was initially detected in the United Republic of Tanzania in 1952, and it has since spread to other African and Asian nations (1). The first urban outbreaks were discovered in Thailand in 1967, then in India in the 1970s (2). '
        break;
      case 'Zika Virus':
        this.additionalInfo =
        ''
        break;
      default:
        this.additionalInfo = 'Additional info';
        break;
    }
  }

  //symptoms

  setSymptoms() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.symptoms =
        'Most persons who have dengue have no symptoms. The most typical symptoms for those who do are high fever, headache, body pains, nausea, and rash. Most people will feel better in 1-2 weeks. Some people acquire severe dengue and require hospitalization.'
        ;
        break;
      case 'Malaria':
        this.symptoms =
        'Symptoms can range from minor to life-threatening. Mild symptoms include fever, chills, and headache. Severe symptoms include exhaustion, disorientation, convulsions, and trouble breathing. The initial symptoms may be mild, comparable to those of many febrile infections, and difficult to identify as malaria.'
        ;
        break;
      case 'Filariasis':
        this.symptoms =
        'Lymphatic filariasis infection can cause asymptomatic, acute, or chronic symptoms. The majority of infections are asymptomatic, with no visible indications of illness despite contributing to parasite transmission. These silent infections continue to harm the lymphatic system and kidneys, as well as disrupt the body\'s immune system.'
        ;
        break;
      case 'Chikungunya':
        this.symptoms = 'The onset of CHIKV sickness in symptomatic individuals is generally 4-8 days (range 2-12 days) following the bite of an infected mosquito. It is distinguished by a sudden onset of fever, which is typically accompanied by significant joint discomfort. Joint swelling, muscular discomfort, headache, nausea, exhaustion, and rash are other typical indications and symptoms.'
        ;
        break;
      case 'Zika Virus':
        this.symptoms = 
        'Most people infected with Zika virus do not develop symptoms. Among those who do, they typically start 3–14 days after infection, are generally mild including rash, fever, conjunctivitis, muscle and joint pain, malaise and headache, and usually last for 2–7 days. These symptoms are common to other arboviral and non-arboviral diseases; thus, the diagnosis of Zika virus infection requires laboratory confirmation.'
        ;
        break;
      default:
        this.symptoms = 'Additional info';
        break;
    }
  }

  //prevention

  setPrevention() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.prevention = 
        'Every year, an estimated 400 million individuals are infected with dengue virus via mosquito bites. Around 100 million people become ill. In Southeast Asia, the Western Pacific, the Eastern Mediterranean, the Americas, the Caribbean, and Africa, outbreaks have occurred. In order to lower the risk of getting dengue, protect yourself from mosquito bites by using clothes that cover as much of your body as possible, mosquito nets if sleeping during the day (ideally nets sprayed with insect repellent), window screens, mosquito repellents (containing DEET, Picaridin, or IR3535), and coils and vaporizers.'
        ;
        break;
      case 'Malaria':
        this.prevention = 
        'Malaria may be avoided by avoiding mosquito bites and taking malaria medications. Resistance to pesticides among Anopheles mosquitos is threatening worldwide malaria control progress. Other threats to ITNs include insufficient access, loss of nets due to the stresses of daily life outpacing replacement, and changing mosquito behavior, which appears to be biting early before people go to bed and resting outdoors, thereby avoiding insecticide exposure.'
        ;
        break;
      case 'Filariasis':
        this.prevention = 
        'Most instances of hydrocele can be treated surgically. Simple measures of cleanliness, skin care, exercise, and elevation of afflicted limbs can lessen and avoid clinical severity and development of the condition, including acute inflammatory episodes. People with lymphoedema must have access to ongoing care for the rest of their lives in order to control the condition and prevent it from progressing to more advanced stages.'
        ;
        break;
      case 'Chikungunya':
        this.prevention = 'The greatest precaution is to avoid mosquito bites. Patients suspected of having CHIKV should avoid mosquito bites during the first week of sickness to avoid continued transmission to mosquitos, which might infect others. Controlling mosquito vectors is the primary technique for reducing CHIKV transmission. This necessitates the engagement of communities, who are crucial in eliminating mosquito breeding grounds through weekly emptying and cleaning water containers, disposing of rubbish, and supporting local mosquito control programs. '
        ;
        break;
      case 'Zika Virus':
        this.prevention = 
        'There is currently no vaccine available to prevent or treat Zika virus infection. The development of a Zika vaccine is still a work in progress. Aedes mosquitos reproduce in tiny pools of water near houses, schools, and workplaces. Community activities are critical to assisting local governments and public health organizations in their efforts to minimize mosquito breeding areas. To limit mosquito populations and illness spread, health officials may also recommend the use of larvicides and pesticides.'
        ;
        break;
      default:
        this.prevention = 'Additional info';
        break;
    }
  }

  //cards info
  setCardInfo() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.cardInfo = [
          {
            symptom: 'High fever (40°C/104°F)',
          },
          {
            symptom: 'Severe headachet',
          },
          {
            symptom: 'Pain behind the eyes',
          },
          {
            symptom: 'muscle and joint pains',
          },
          {
            symptom: 'Nausea',
          },
          {
            symptom: 'Vomiting',
          },
        ];
        break;
      case 'Malaria':
        this.cardInfo = [
          {
            symptom: 'Exhaustion',
          },
          {
            symptom: 'Trouble breathing',
          },
          {
            symptom: 'Fever',
          },
          {
            symptom: 'Chills',
          },
          {
            symptom: 'Dark or bloody urine jaundice',
          },
          {
            symptom: 'Yellowing of the eyes and skin',
          },
        ];
        break;
      case 'Filariasis':
        this.cardInfo = [
          {
            symptom: "Symptoms can be confused with other illnesses like Zika, leading to misdiagnosis."
          },
          {
            symptom: "In some cases, symptoms are mild, and people may not realize they're infected"
          },
          {
            symptom: 'Recurrent episodes of acute inflammation, including fever and pain',
          },
          {
            symptom: 'Skin rashes and itching',
          },
          {
            symptom: 'Asymptomatic infection (no immediate symptoms)',
          },
          {
            symptom: 'Lymphedema (swelling), often in the legs',
          },
        ];
        break;
      case 'Chikungunya':
        this.cardInfo = [
          {
            symptom: 'Joint swelling',
          },
          {
            symptom: 'Muscular discomfort',
          },
          {
            symptom: 'Headache',
          },
          {
            symptom: 'Nauseaa',
          },
          {
            symptom: 'Exhaustion',
          },
          {
            symptom: 'Rash ',
          },
        ];
        break;
      case 'Zika Virus':
        this.cardInfo = [
          {
            symptom: 'Joint swelling',
          },
          {
            symptom: 'Muscular pain',
          },
          {
            symptom: 'Headache',
          },
          {
            symptom: 'Nauseaa',
          },
          {
            symptom: 'Exhaustion',
          },
          {
            symptom: 'Rash ',
          },
        ];
        break;
      default:
        this.cardInfo = [];
        break;
    }
  }

  //prevention
  setCardInfoPrevention() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.cardInfoPrevention = [
          {
            prevention: 'clothing that covers the most of your body',
          },
          {
            prevention: 'If sleeping during the day, use mosquito nets that have been sprayed with insect repellent.',
          },
          {
            prevention: 'Mosquito repellents (DEET, Picaridin, or IR3535) ',
          },
          {
            prevention: 'Coils, as well as vaporizers.',
          },
          
        ];
        break;
      case 'Malaria':
        this.cardInfoPrevention = [
          {
            prevention: 'Vector control is a vital component of malaria control and elimination strategies as it is highly effective in preventing infection and reducing disease transmission.',
          },
          
          {
            prevention: 'Use mosquito nets when sleeping in places where malaria is present Use mosquito repellents (containing DEET, IR3535, or Icaridin) after dusk Use coils and vaporizers.',
          },
          {
            prevention: 'Talk to a doctor about taking medicines such as chemoprophylaxis before traveling to areas where malaria is common. ',
          },
          {
            prevention: 'Lower the risk of getting malaria by avoiding mosquito bites.',
          },
        ];
        break;
      case 'Filariasis':
        this.cardInfoPrevention = [
          {
            prevention: 'Vector control is a vital component of malaria control and elimination strategies as it is highly effective in preventing infection and reducing disease transmission.',
          },
          {
            prevention: 'Lower the risk of getting malaria by avoiding mosquito bites.',
          },
          {
            prevention: 'Use mosquito nets when sleeping in places where malaria is present Use mosquito repellents (containing DEET, IR3535, or Icaridin) after dusk Use coils and vaporizers.',
          },
          {
            prevention: 'Talk to a doctor about taking medicines such as chemoprophylaxis before traveling to areas where malaria is common. ',
          },
        ];
        break;
      case 'Chikungunya':
        this.cardInfoPrevention = [
          {
            prevention: 'Wearing clothing (preferably light-colored) that covers as much of the body as possible.',
          },
          {
            prevention: 'Insecticide-treated mosquito nets should be used against day-biting mosquitoes by persons who sleep during the daytime, for example young children, sick patients or older people.',
          },
          {
            prevention: 'Use physical barriers such as window screens and closed doors and windows',
          },
          {
            prevention: 'Applying insect repellent to skin or clothing that contains DEET, IR3535, or icaridin according to product label instructions are all examples of personal protection measures.',
          },
        ];
        break;
      case 'Zika Virus':
        this.cardInfoPrevention = [
          {
            prevention: 'prevention 1 for Zika Virus',
          },
          {
            prevention: 'prevention 2 for Zika Virus',
          },
          {
            prevention: 'prevention 3 for Zika Virus',
          },
          {
            prevention: 'prevention 4 for Zika Virus',
          },
        ];
        break;
      default:
        this.cardInfoPrevention = [];
        break;
    }
  }

  //cases

  setCases() {
    switch (this.selectedDisease?.name) {
      case 'Dengue':
        this.cases = 
        'Since the beginning of 2023, dengue outbreaks of significant magnitude have been recorded in the WHO Region of the Americas, with close to three million suspected and confirmed cases of dengue reported so far this year, surpassing the 2.8 million cases of dengue registered for the entire year of 2022. Of the total number of dengue cases reported until 1 July 2023 (2 997 097 cases), 45% were laboratory confirmed, and 0.13% were classified as severe dengue. The highest number of dengue cases to date in 2023 are in Brazil, Peru, and Bolivia. Additionally, 1302 deaths were reported in the Region with a Case Fatality Rate (CFR) of 0.04%, in the same period.'
        ;
        break;
      case 'Malaria':
        this.cases =
        'The WHO African Region carries a disproportionately high share of the global malaria burden. In 2021, the Region was home to 95% of malaria cases and 96% of malaria deaths. Children under 5 accounted for about 80% of all malaria deaths in the Region.'
        ;
        break;
      case 'Filariasis':
        this.cases = 
        'In 2021, 882.5 million people in 44 countries were living in areas that require preventive chemotherapy to stop the spread of infection. The global baseline estimate of people affected by lymphatic filariasis was 25 million men with hydrocele and over 15 million people with lymphoedema. At least 36 million people remain with these chronic disease manifestations. Eliminating lymphatic filariasis can prevent unnecessary suffering and contribute to the reduction of poverty.'
        ;
        break;
      case 'Chikungunya':
        this.cases = 'CHIKV was first identified in the United Republic of Tanzania in 1952 and subsequently  in other countries Africa and Asia (1). Urban outbreaks were first recorded in Thailand in 1967 and in India in the 1970s (2). Since 2004, outbreaks of CHIKV have become more frequent and widespread, caused partly due to viral adaptations allowing the virus to be spread more easily by Aedes albopictus mosquitoes. CHIKV has now been identified in over 110 countries in Asia, Africa, Europe and the Americas. Transmission has been interrupted on islands where a high proportion of the population is infected and then immune; however, transmission often persists in countries where large parts of the population have not yet been infected.'
        ;
        break;
      case 'Zika Virus':
        this.cases = 
        'Cases of Zika virus disease globally declined from 2017 onwards; however, Zika virus transmission persists at low levels in several countries in the Americas and in other endemic regions. In addition, the first local mosquito-transmitted Zika virus disease cases were reported in Europe in 2019 and Zika virus outbreak activity was detected in India in 2021. To date, a total of 89 countries and territories have reported evidence of mosquito transmitted Zika virus infection; however, surveillance remains limited globally.'
        ;
        break;
      default:
        this.cases = 'Additional info';
        break;
    }
  }
}
