import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesManagementComponent } from './inquiries-management.component';

describe('InquiriesManagementComponent', () => {
  let component: InquiriesManagementComponent;
  let fixture: ComponentFixture<InquiriesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InquiriesManagementComponent]
    });
    fixture = TestBed.createComponent(InquiriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
