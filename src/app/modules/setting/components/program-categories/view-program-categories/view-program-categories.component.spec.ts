import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramCategoriesComponent } from './view-program-categories.component';

describe('ViewProgramCategoriesComponent', () => {
  let component: ViewProgramCategoriesComponent;
  let fixture: ComponentFixture<ViewProgramCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProgramCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgramCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
