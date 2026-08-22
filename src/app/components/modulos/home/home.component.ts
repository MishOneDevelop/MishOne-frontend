import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ScrollRevealDirective} from '../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ScrollRevealDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly stack = ['Angular', 'TypeScript', 'Spring Boot', 'Python & IA', 'SQL', 'Git'];
}
