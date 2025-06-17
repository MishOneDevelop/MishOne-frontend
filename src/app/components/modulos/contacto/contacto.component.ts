import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ServicioService} from '../../../core/services/servicio.service';
import {DetalleServicio} from '../../../core/models/detalle-servicio.model';
import {Servicio} from '../../../core/models/servicio.model';
import {DetalleServicioService} from '../../../core/services/detalle-servicio.service';
import {ContactoService} from '../../../core/services/contacto.service';
import {Contacto} from '../../../core/models/contacto.model';

@Component({
  selector: 'app-contacto',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  estadoMensaje = signal<'exito' | 'error' | null>(null);
  mensaje = signal<string>('');

  private fb = inject(FormBuilder);
  private contactoService = inject(ContactoService);
  private servicioService = inject(ServicioService);
  private detalleServicioService = inject(DetalleServicioService);

  formContacto: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    mensaje: ['', Validators.required],
    idServicio: ['', Validators.required],
    idDetalleServicio: ['', Validators.required]
  });

  servicios = signal<Servicio[]>([]);
  detalleServicios = signal<DetalleServicio[]>([]);

  constructor() {
    this.servicioService.getActivos().subscribe(data => this.servicios.set(data));

    this.formContacto.get('idServicio')?.valueChanges.subscribe(idServicio => {
      if (idServicio) {
        this.detalleServicioService.getPorIdServicio(idServicio).subscribe(detalles => {
          this.detalleServicios.set(detalles);
          this.formContacto.get('idDetalleServicio')?.setValue('');
        });
      } else {
        this.detalleServicios.set([]);
        this.formContacto.get('idDetalleServicio')?.setValue('');
      }
    });
  }

  enviarContacto() {
    if (this.formContacto.valid) {
      const contacto: Contacto = {
        ...this.formContacto.value,
        fechaEnvio: new Date().toISOString(),
        fechaModificacion: new Date().toISOString()
      };

      this.contactoService.enviarContacto(contacto).subscribe({
        next: () => {
          this.estadoMensaje.set('exito');
          this.mensaje.set('✅ Tu mensaje fue enviado con éxito.');
          this.formContacto.reset();
          setTimeout(() => this.estadoMensaje.set(null), 5000); // Ocultar después de 5s
        },
        error: () => {
          this.estadoMensaje.set('error');
          this.mensaje.set('❌ Hubo un error al enviar el mensaje.');
          setTimeout(() => this.estadoMensaje.set(null), 5000);
        }
      });
    }
  }
}
