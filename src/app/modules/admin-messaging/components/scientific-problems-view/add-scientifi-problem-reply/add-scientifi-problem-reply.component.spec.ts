import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScientifiProblemReplyComponent } from './add-scientifi-problem-reply.component';

describe('AddScientifiProblemReplyComponent', () => {
  let component: AddScientifiProblemReplyComponent;
  let fixture: ComponentFixture<AddScientifiProblemReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScientifiProblemReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScientifiProblemReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
