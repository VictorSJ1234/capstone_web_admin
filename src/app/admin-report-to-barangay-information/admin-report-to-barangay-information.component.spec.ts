import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportToBarangayInformationComponent } from './admin-report-to-barangay-information.component';

describe('AdminReportToBarangayInformationComponent', () => {
  let component: AdminReportToBarangayInformationComponent;
  let fixture: ComponentFixture<AdminReportToBarangayInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportToBarangayInformationComponent]
    });
    fixture = TestBed.createComponent(AdminReportToBarangayInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
