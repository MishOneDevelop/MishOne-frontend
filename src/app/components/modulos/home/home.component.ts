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
    {
      icono: '🤖',
      titulo: 'Bot que responde por ti',
      problema: '¿No alcanzas a responder todos los mensajes?',
      solucion: 'Pierdes tiempo (y hasta clientes) por no contestar a tiempo. Un bot atiende WhatsApp, Instagram o tu web 24/7 por ti.',
    },
    {
      icono: '📦',
      titulo: 'Inventario para tu mercancía',
      problema: '¿Se te agota el stock sin avisar, o compras de más sin saber qué tienes?',
      solucion: 'Controla entradas y salidas en tiempo real, desde cualquier lugar, sin planillas ni adivinar.',
    },
    {
      icono: '🌐',
      titulo: 'Página web para tu negocio',
      problema: '¿Te buscan en internet y no te encuentran?',
      solucion: 'Sin un sitio propio pierdes confianza y clientes frente a la competencia. Una página profesional te representa 24/7.',
    },
    {
      icono: '📊',
      titulo: 'Reportes y analítica',
      problema: '¿Tomas decisiones a ojo porque no tienes los números claros?',
      solucion: 'Con reportes reales sabes qué se vende, qué no, y qué te está costando plata.',
    },
    {
      icono: '📅',
      titulo: 'Reservas y citas online',
      problema: '¿Pierdes tiempo cuadrando citas por chat o llamadas, o se te cruzan los horarios?',
      solucion: 'Que tus clientes agenden solos, sin ida y vuelta de mensajes ni citas olvidadas.',
    },
    {
      icono: '🧠',
      titulo: 'Automatización con IA',
      problema: '¿Hay tareas repetitivas que te quitan horas cada semana?',
      solucion: 'Automatízalas con IA y usa ese tiempo en hacer crecer tu negocio, no en tareas operativas.',
    },
  ];
}
