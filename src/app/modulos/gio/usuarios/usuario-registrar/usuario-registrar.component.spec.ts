import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRegistrarComponent } from './usuario-registrar.component';

describe('UsuarioRegistrarComponent', () => {
  let component: UsuarioRegistrarComponent;
  let fixture: ComponentFixture<UsuarioRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
