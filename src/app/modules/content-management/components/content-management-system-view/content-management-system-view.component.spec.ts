import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagementSystemViewComponent } from './content-management-system-view.component';

describe('ContentManagementSystemViewComponent', () => {
  let component: ContentManagementSystemViewComponent;
  let fixture: ComponentFixture<ContentManagementSystemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentManagementSystemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentManagementSystemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
