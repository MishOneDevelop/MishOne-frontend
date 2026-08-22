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

  protected readonly ideas = [
    { icono: '🤖', titulo: 'Bot que responde por ti', descripcion: 'Atiende WhatsApp, Instagram o tu web 24/7 sin que muevas un dedo.' },
    { icono: '📦', titulo: 'Inventario para tu mercancía', descripcion: 'Controla stock, entradas y salidas en tiempo real, desde cualquier lugar.' },
    { icono: '🌐', titulo: 'Página web para tu negocio', descripcion: 'Un sitio profesional que muestra lo que vendes y genera confianza.' },
    { icono: '📊', titulo: 'Reportes y analítica', descripcion: 'Toma decisiones con datos reales de tu negocio, no con corazonadas.' },
    { icono: '📅', titulo: 'Reservas y citas online', descripcion: 'Que tus clientes agenden solos, sin llamadas ni mensajes perdidos.' },
    { icono: '🧠', titulo: 'Automatización con IA', descripcion: 'Ahorra horas automatizando las tareas repetitivas de tu día a día.' },
  ];
}
