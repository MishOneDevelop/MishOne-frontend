import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Servicio} from '../../../core/models/servicio.model';
import {ServicioService} from '../../../core/services/servicio.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-servicios',
  imports: [
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  servicios = signal<Servicio[]>([]);
  cargando = signal<boolean>(true);

  constructor(private servicioService: ServicioService) {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.getActivos().subscribe({
      next: (data) => this.servicios.set(data),
      complete: () => this.cargando.set(false),
      error: () => this.cargando.set(false),
    });
  }
}
