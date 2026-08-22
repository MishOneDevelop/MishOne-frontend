import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';

// Revela el elemento con una transicion CSS cuando entra en el viewport,
// usando IntersectionObserver nativo (sin libreria). Se dispara una sola
// vez por elemento: al hacerse visible se desconecta el observer.
// El movimiento real vive en styles.css (.scroll-reveal / .revealed),
// que tambien respeta prefers-reduced-motion.
@Directive({
  selector: '[appScrollReveal]',
  host: { class: 'scroll-reveal' },
})
export class ScrollRevealDirective implements OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('revealed');
            this.observer?.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
