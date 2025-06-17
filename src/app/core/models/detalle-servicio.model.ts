import {Servicio} from './servicio.model';

export interface DetalleServicio {
  idDetalleServicio: number;
  titulo: string;
  descripcion: string;
  tecnologias: string; // JSON.stringify array
  duracion: string;
  modalidad: string;   // JSON.stringify array
  valor: string;
  activo: boolean;
  servicio: Servicio
}
