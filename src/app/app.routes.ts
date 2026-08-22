import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'MishOne | Software a tu medida',
    loadComponent: () => import('./components/modulos/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'servicios',
    title: 'Servicios | MishOne',
    loadComponent: () => import('./components/modulos/servicios/servicios.component').then(c => c.ServiciosComponent),
  },
  {
    path: 'servicios/detalle/:id',
    title: 'Detalle del servicio | MishOne',
    loadComponent: () => import('./components/modulos/servicios/servicios-detalle/servicios-detalle.component').then(c => c.ServiciosDetalleComponent),
  },
  {
    path: 'portafolio',
    title: 'Portafolio | MishOne',
    loadComponent: () => import('./components/modulos/portafolio/portafolio.component').then(c => c.PortafolioComponent),
  },
  {
    path: 'contacto',
    title: 'Contáctanos | MishOne',
    loadComponent: () => import('./components/modulos/contacto/contacto.component').then(c => c.ContactoComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

