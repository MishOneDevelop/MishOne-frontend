import { Component, inject, signal } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ScrollRevealDirective} from '../../../core/directives/scroll-reveal.directive';
import {ServicioService} from '../../../core/services/servicio.service';
import {Servicio} from '../../../core/models/servicio.model';

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
  private servicioService = inject(ServicioService);

  protected readonly servicios = signal<Servicio[]>([]);
  protected readonly stack = ['Angular', 'TypeScript', 'Spring Boot', 'Python & IA', 'SQL', 'Git'];

  // Cada idea se liga a una categoria real del backend, no a un id fijo,
  // asi el link a "Ver detalle" sigue funcionando aunque cambien los ids.
  protected readonly ideas = [
    {
      icono: '🤖',
      titulo: 'Bot que responde por ti',
      problema: '¿No alcanzas a responder todos los mensajes?',
      solucion: 'Pierdes tiempo (y hasta clientes) por no contestar a tiempo. Un bot atiende WhatsApp, Instagram o tu web 24/7 por ti.',
      categoria: 'Automatización',
    },
    {
      icono: '📦',
      titulo: 'Inventario para tu mercancía',
      problema: '¿Se te agota el stock sin avisar, o compras de más sin saber qué tienes?',
      solucion: 'Controla entradas y salidas en tiempo real, desde cualquier lugar, sin planillas ni adivinar.',
      categoria: 'Gestión de Negocio',
    },
    {
      icono: '🌐',
      titulo: 'Página web para tu negocio',
      problema: '¿Te buscan en internet y no te encuentran?',
      solucion: 'Sin un sitio propio pierdes confianza y clientes frente a la competencia. Una página profesional te representa 24/7.',
      categoria: 'Presencia Web',
    },
    {
      icono: '📊',
      titulo: 'Reportes y analítica',
      problema: '¿Tomas decisiones a ojo porque no tienes los números claros?',
      solucion: 'Con reportes reales sabes qué se vende, qué no, y qué te está costando plata.',
      categoria: 'Gestión de Negocio',
    },
    {
      icono: '📅',
      titulo: 'Reservas y citas online',
      problema: '¿Pierdes tiempo cuadrando citas por chat o llamadas, o se te cruzan los horarios?',
      solucion: 'Que tus clientes agenden solos, sin ida y vuelta de mensajes ni citas olvidadas.',
      categoria: 'Gestión de Negocio',
    },
    {
      icono: '🧠',
      titulo: 'Automatización con IA',
      problema: '¿Hay tareas repetitivas que te quitan horas cada semana?',
      solucion: 'Automatízalas con IA y usa ese tiempo en hacer crecer tu negocio, no en tareas operativas.',
      categoria: 'Automatización',
    },
  ];

  constructor() {
    this.servicioService.getActivos().subscribe({
      next: data => this.servicios.set(data),
      error: () => this.servicios.set([]),
    });
  }

  // Busca el servicio real que corresponde a la categoria de la idea.
  // Si todavia no cargo (o cambio de nombre en el backend), devuelve null
  // y el template cae al listado general de servicios.
  protected idServicioPorCategoria(categoria: string): number | null {
    return this.servicios().find(s => s.categoria?.valor === categoria)?.idServicio ?? null;
  }
}
