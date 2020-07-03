import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebesIniciarSesionComponent } from './debes-iniciar-sesion.component';

describe('DebesIniciarSesionComponent', () => {
  let component: DebesIniciarSesionComponent;
  let fixture: ComponentFixture<DebesIniciarSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebesIniciarSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebesIniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
