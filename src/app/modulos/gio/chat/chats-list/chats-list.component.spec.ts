import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsLandingComponent } from './chats-landing.component';

describe('ChatsLandingComponent', () => {
  let component: ChatsLandingComponent;
  let fixture: ComponentFixture<ChatsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
