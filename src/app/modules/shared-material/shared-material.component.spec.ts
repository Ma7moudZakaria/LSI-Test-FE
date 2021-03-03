import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMaterialComponent } from './shared-material.component';

describe('SharedMaterialComponent', () => {
  let component: SharedMaterialComponent;
  let fixture: ComponentFixture<SharedMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
