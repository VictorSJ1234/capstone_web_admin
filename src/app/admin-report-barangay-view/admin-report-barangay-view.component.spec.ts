import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportBarangayViewComponent } from './admin-report-barangay-view.component';

describe('AdminReportBarangayViewComponent', () => {
  let component: AdminReportBarangayViewComponent;
  let fixture: ComponentFixture<AdminReportBarangayViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportBarangayViewComponent]
    });
    fixture = TestBed.createComponent(AdminReportBarangayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
