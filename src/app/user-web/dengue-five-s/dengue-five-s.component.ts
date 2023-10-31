import { Component } from '@angular/core';

@Component({
  selector: 'app-dengue-five-s',
  templateUrl: './dengue-five-s.component.html',
  styleUrls: ['./dengue-five-s.component.css']
})
export class DengueFiveSComponent {
  searchAndDestroyTitle: string = "Search and Destroy";
  searchAndDestroyInfo: string = "Mosquitoes breed in stagnant, standing water. So it's best to search your house for empty tin cans, discarded tires, unused buckets, and other containers that may have collected stagnant water and empty these out. If you have an untended pool, birdbath, and clogged rain gutters, these may also become breeding areas for mosquitoes so clean these out as well.";

  selfProtectTitle: string = "Self-Protect";
  selfProtectInfo: string = "Better safe than sorry. Protect yourself from mosquito bites by always using mosquito repellents. From bug sprays and bracelets to clip-ons and stickers, there are a myriad of mosquito repellent products that are available in the market. Dark colored clothing attracts mosquitoes, so it is better to dress in white or light colors.";

  seekConsultationTitle: string = "Seek Consultation";
  seekConsultationInfo: string = "Sudden high fever, severe headache, joint and muscle pain, vomiting and skin rashes are some of the symptoms of dengue. If you, a family member or a friend are showing these, go and see a doctor immediately.";

  supportFoggingTitle: string = "Support fogging";
  supportFoggingInfo: string = "Conducted in early mornings or late afternoons, fogging is done to knock down adult mosquitoes that may be carrying the dengue virus. WHO assures that the insecticide used in fogging is not harmful to humans at the low concentrations used.";

  sustainHydrationTitle: string = "Sustain Hydration";
  sustainHydrationInfo: string = "According to Health Secretary Francisco Duque III, hydration is key to help those with dengue recover. Dr. Faustino added that there is no specific medication for the treatment of a dengue infection but early detection and access to proper medical care lowers complications. Rest at home and make sure to get enough fluids to drink, especially if eating is not tolerated.";
}
