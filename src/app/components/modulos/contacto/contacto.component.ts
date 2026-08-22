import {Component, inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
    // Empieza deshabilitado: no hay detalles que elegir hasta escoger un servicio.
    idDetalleServicio: [{value: '', disabled: true}, Validators.required]
  });

  servicios = signal<Servicio[]>([]);
  detalleServicios = signal<DetalleServicio[]>([]);

  constructor() {
    this.servicioService.getActivos().subscribe({
      next: data => this.servicios.set(data),
      error: () => this.servicios.set([]),
    });

    // takeUntilDestroyed: sin esto la suscripcion sigue viva despues de salir de
    // la ruta, porque el FormGroup no se destruye solo junto con el componente.
    this.formContacto.get('idServicio')?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(idServicio => {
        if (idServicio) {
          this.detalleServicioService.getPorIdServicio(idServicio).subscribe({
            next: detalles => this.setDetalleServicios(detalles),
            error: () => this.setDetalleServicios([]),
          });
        } else {
          this.setDetalleServicios([]);
        }
      });
  }

  // El estado disabled/enabled del control se maneja aqui (no con un binding
  // [disabled] en el template) para no pelear con ReactiveFormsModule, que es
  // quien controla ese atributo cuando el elemento tiene formControlName.
  private setDetalleServicios(detalles: DetalleServicio[]) {
    this.detalleServicios.set(detalles);
    const control = this.formContacto.get('idDetalleServicio');
    control?.setValue('');
    detalles.length > 0 ? control?.enable() : control?.disable();
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
