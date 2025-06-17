import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleServicio } from '../models/detalle-servicio.model';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DetalleServicioService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/detalle-servicios`;

  getPorIdServicio(id: number): Observable<DetalleServicio[]> {
    return this.http.get<DetalleServicio[]>(`${this.baseUrl}/servicio/${id}`);
  }
}
