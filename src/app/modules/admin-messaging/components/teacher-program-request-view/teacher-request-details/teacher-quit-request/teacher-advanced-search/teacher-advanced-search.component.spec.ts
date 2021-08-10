import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAdvancedSearchComponent } from './teacher-advanced-search.component';

describe('TeacherAdvancedSearchComponent', () => {
  let component: TeacherAdvancedSearchComponent;
  let fixture: ComponentFixture<TeacherAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
