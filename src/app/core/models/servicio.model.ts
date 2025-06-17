import {ValorParametro} from './dto/ValorParametro.model';

export interface Servicio {
  idServicio: number;
  nombre: string;
  descripcionMin: string;
  descripcionMax: string;
  precioMin: number;
  precioMax: number;
  duracionEstimada: number;
  activo: boolean;
  categoria: ValorParametro
}
