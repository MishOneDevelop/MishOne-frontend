import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/modulos/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'servicios',
    loadComponent: () => import('./components/modulos/servicios/servicios.component').then(c => c.ServiciosComponent),
  },
  {
    path: 'servicios/detalle/:id',
    loadComponent: () => import('./components/modulos/servicios/servicios-detalle/servicios-detalle.component').then(c => c.ServiciosDetalleComponent),
  },
  {
    path: 'portafolio',
    loadComponent: () => import('./components/modulos/portafolio/portafolio.component').then(c => c.PortafolioComponent),
  },
  {
    path: 'contacto',
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

