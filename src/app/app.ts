import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {Footer} from './components/layauts/footer/footer';
import {Navbar} from './components/layauts/navbar/navbar';
import {ServicioService} from './core/services/servicio.service';
import {PingService} from './core/services/ping.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class App {

  constructor(private pingService: PingService) {
    this.cargarServicios();
  }

  cargarServicios() {
    this.pingService.getPing().subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error al obtener ping:', err)
    });
  }


}
