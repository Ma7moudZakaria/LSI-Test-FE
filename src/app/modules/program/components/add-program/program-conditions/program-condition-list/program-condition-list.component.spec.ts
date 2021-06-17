import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConditionListComponent } from './program-condition-list.component';

describe('ProgramConditionListComponent', () => {
  let component: ProgramConditionListComponent;
  let fixture: ComponentFixture<ProgramConditionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramConditionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
