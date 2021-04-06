import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificMaterialViewComponent } from './scientific-material-view.component';

describe('ScientificMaterialViewComponent', () => {
  let component: ScientificMaterialViewComponent;
  let fixture: ComponentFixture<ScientificMaterialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificMaterialViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificMaterialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
