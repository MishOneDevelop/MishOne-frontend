import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';
import {Footer} from './components/layauts/footer/footer';
import {Navbar} from './components/layauts/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class App {
  private router = inject(Router);

  // El trigger necesita un valor que cambie en cada navegacion para
  // volver a dispararse; sin esto la transicion '* <=> *' solo corria
  // en la carga inicial y nunca mas.
  protected currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(event => this.currentUrl.set(event.urlAfterRedirects));
  }
}
