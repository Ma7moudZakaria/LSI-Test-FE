import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllContentManagementTypeComponent } from './view-all-content-management-type.component';

describe('ViewAllContentManagementTypeComponent', () => {
  let component: ViewAllContentManagementTypeComponent;
  let fixture: ComponentFixture<ViewAllContentManagementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllContentManagementTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllContentManagementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
