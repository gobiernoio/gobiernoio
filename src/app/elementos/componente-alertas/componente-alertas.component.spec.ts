import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteAlertasComponent } from './componente-alertas.component';

describe('ComponenteAlertasComponent', () => {
  let component: ComponenteAlertasComponent;
  let fixture: ComponentFixture<ComponenteAlertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteAlertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
