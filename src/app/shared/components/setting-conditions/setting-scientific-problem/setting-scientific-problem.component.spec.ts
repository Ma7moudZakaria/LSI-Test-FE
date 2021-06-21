import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingScientificProblemComponent } from './setting-scientific-problem.component';

describe('SettingScientificProblemComponent', () => {
  let component: SettingScientificProblemComponent;
  let fixture: ComponentFixture<SettingScientificProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingScientificProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingScientificProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
