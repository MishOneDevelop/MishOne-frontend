import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ScrollRevealDirective} from '../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-portafolio',
  imports: [
    RouterLink,
    ScrollRevealDirective
  ],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export class PortafolioComponent {

}
