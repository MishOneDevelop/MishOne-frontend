import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosDetalleComponent } from './servicios-detalle.component';

describe('ServiciosDetalleComponent', () => {
  let component: ServiciosDetalleComponent;
  let fixture: ComponentFixture<ServiciosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
