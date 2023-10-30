import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsForBarangayManagementComponent } from './admin-reports-for-barangay-management.component';

describe('AdminReportsForBarangayManagementComponent', () => {
  let component: AdminReportsForBarangayManagementComponent;
  let fixture: ComponentFixture<AdminReportsForBarangayManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportsForBarangayManagementComponent]
    });
    fixture = TestBed.createComponent(AdminReportsForBarangayManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
