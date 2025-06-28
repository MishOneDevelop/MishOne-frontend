import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Servicio} from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/ping`;

  getPing(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}`);
  }
}
