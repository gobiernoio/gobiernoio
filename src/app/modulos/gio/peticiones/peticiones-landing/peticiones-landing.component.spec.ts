import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesLandingComponent } from './peticiones-landing.component';

describe('PeticionesLandingComponent', () => {
  let component: PeticionesLandingComponent;
  let fixture: ComponentFixture<PeticionesLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeticionesLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
