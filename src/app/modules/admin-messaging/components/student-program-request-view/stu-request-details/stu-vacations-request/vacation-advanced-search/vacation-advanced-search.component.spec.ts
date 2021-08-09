import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationAdvancedSearchComponent } from './vacation-advanced-search.component';

describe('VacationAdvancedSearchComponent', () => {
  let component: VacationAdvancedSearchComponent;
  let fixture: ComponentFixture<VacationAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
