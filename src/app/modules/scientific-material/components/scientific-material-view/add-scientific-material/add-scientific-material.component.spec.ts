import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScientificMaterialComponent } from './add-scientific-material.component';

describe('AddScientificMaterialComponent', () => {
  let component: AddScientificMaterialComponent;
  let fixture: ComponentFixture<AddScientificMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScientificMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScientificMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
