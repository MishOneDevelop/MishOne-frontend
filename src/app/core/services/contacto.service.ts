import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../models/contacto.model';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/contactos`;

  enviarContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.baseUrl, contacto);
  }

}
