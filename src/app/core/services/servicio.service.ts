// src/app/services/servicio.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../models/servicio.model';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/servicios`;

  getActivos(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}/activos`);
  }

}
