import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramNotifacationsComponent } from './program-notifacations.component';

describe('ProgramNotifacationsComponent', () => {
  let component: ProgramNotifacationsComponent;
  let fixture: ComponentFixture<ProgramNotifacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramNotifacationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramNotifacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
