import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramCategoriesComponent } from './add-program-categories.component';

describe('AddProgramCategoriesComponent', () => {
  let component: AddProgramCategoriesComponent;
  let fixture: ComponentFixture<AddProgramCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
