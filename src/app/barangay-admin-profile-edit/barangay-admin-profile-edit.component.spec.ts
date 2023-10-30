import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayAdminProfileEditComponent } from './barangay-admin-profile-edit.component';

describe('BarangayAdminProfileEditComponent', () => {
  let component: BarangayAdminProfileEditComponent;
  let fixture: ComponentFixture<BarangayAdminProfileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangayAdminProfileEditComponent]
    });
    fixture = TestBed.createComponent(BarangayAdminProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
