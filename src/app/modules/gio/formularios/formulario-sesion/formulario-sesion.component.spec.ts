import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesFormularioComponent } from './peticiones-formulario.component';

describe('PeticionesFormularioComponent', () => {
  let component: PeticionesFormularioComponent;
  let fixture: ComponentFixture<PeticionesFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeticionesFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
