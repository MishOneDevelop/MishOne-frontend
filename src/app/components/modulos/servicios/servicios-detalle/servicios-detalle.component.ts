import { Component, signal } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DetalleServicioService} from '../../../../core/services/detalle-servicio.service';
import {DetalleServicio} from '../../../../core/models/detalle-servicio.model';


@Component({
  selector: 'app-servicios-detalle.component',
  imports: [],
  templateUrl: './servicios-detalle.component.html',
  styleUrl: './servicios-detalle.component.css',
  standalone: true
})
export class ServiciosDetalleComponent {
  detalles = signal<DetalleServicio[]>([]);
  cargando = signal<boolean>(true);

  expandidoPorId: Record<number, boolean> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detalleService: DetalleServicioService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargar(id);
  }

  cargar(id: number) {
    this.detalleService.getPorIdServicio(id).subscribe({
      next: (resp) => this.detalles.set(resp),
      complete: () => this.cargando.set(false),
    });
  }

  parseJson(texto: string): string[] {
    try {
      return JSON.parse(texto);
    } catch {
      return [];
    }
  }

  toggleExpandido(id: number): void {
    this.expandidoPorId[id] = !this.expandidoPorId[id];
  }

  redirigirAContacto(idServicio: number): void {
    this.router.navigate(['/contacto'], {
      queryParams: { servicio: idServicio }
    });
  }
}
