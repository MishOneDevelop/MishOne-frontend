export interface Contacto {
  idContacto?: number;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  idServicio: number;
  idDetalleServicio: number;
  fechaEnvio: string;
  fechaModificacion: string;
}
