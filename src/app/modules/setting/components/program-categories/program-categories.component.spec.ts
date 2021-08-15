import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCategoriesComponent } from './program-categories.component';

describe('ProgramCategoriesComponent', () => {
  let component: ProgramCategoriesComponent;
  let fixture: ComponentFixture<ProgramCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
