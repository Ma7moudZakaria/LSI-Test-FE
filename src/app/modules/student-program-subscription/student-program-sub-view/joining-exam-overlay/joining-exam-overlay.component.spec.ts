import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningExamOverlayComponent } from './joining-exam-overlay.component';

describe('JoiningExamOverlayComponent', () => {
  let component: JoiningExamOverlayComponent;
  let fixture: ComponentFixture<JoiningExamOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoiningExamOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningExamOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
