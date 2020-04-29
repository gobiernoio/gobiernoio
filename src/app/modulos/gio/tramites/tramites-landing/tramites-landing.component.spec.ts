import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesLandingComponent } from './tramites-landing.component';

describe('TramitesComponent', () => {
  let component: TramitesLandingComponent;
  let fixture: ComponentFixture<TramitesLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramitesLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
