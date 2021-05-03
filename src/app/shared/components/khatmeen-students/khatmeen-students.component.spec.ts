import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhatmeenStudentsComponent } from './khatmeen-students.component';

describe('KhatmeenStudentsComponent', () => {
  let component: KhatmeenStudentsComponent;
  let fixture: ComponentFixture<KhatmeenStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhatmeenStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhatmeenStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
