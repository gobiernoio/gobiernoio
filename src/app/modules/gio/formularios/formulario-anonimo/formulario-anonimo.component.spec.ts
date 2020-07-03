import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAnonimoComponent } from './formulario-anonimo.component';

describe('FormularioAnonimoComponent', () => {
  let component: FormularioAnonimoComponent;
  let fixture: ComponentFixture<FormularioAnonimoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAnonimoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAnonimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
