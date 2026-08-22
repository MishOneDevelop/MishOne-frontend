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
  protected readonly proyectos = [
    {
      nombre: 'Celuna & Lunar',
      etiqueta: 'E-commerce',
      descripcion: 'Tienda de ropa online en Bogotá: catálogo de productos, carrito de compras, pedidos por WhatsApp y pago contraentrega.',
      url: 'https://tienda-juvy.onrender.com/',
    },
    {
      nombre: 'Metálicas Hernández e Hijos',
      etiqueta: 'Cotizaciones B2B',
      descripcion: 'Sistema de cotizaciones online para una empresa del sector metalúrgico: los clientes piden presupuesto personalizado sin llamadas ni papeleo.',
      url: 'https://metalicas-hernandez.vercel.app/',
    },
  ];
}
