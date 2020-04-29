import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExtraviadosRevisarComponent } from './admin-extraviados-revisar.component';

describe('AdminExtraviadosRevisarComponent', () => {
  let component: AdminExtraviadosRevisarComponent;
  let fixture: ComponentFixture<AdminExtraviadosRevisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExtraviadosRevisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExtraviadosRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
