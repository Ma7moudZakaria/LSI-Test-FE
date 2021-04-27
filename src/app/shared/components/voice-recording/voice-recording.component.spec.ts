import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecordingComponent } from './voice-recording.component';

describe('VoiceRecordingComponent', () => {
  let component: VoiceRecordingComponent;
  let fixture: ComponentFixture<VoiceRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceRecordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
