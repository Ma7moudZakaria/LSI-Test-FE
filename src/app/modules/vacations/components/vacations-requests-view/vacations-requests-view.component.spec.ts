import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationsRequestsViewComponent } from './vacations-requests-view.component';

describe('VacationsRequestsViewComponent', () => {
  let component: VacationsRequestsViewComponent;
  let fixture: ComponentFixture<VacationsRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationsRequestsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationsRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
