import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAccountManagementComponent } from './super-admin-account-management.component';

describe('SuperAdminAccountManagementComponent', () => {
  let component: SuperAdminAccountManagementComponent;
  let fixture: ComponentFixture<SuperAdminAccountManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminAccountManagementComponent]
    });
    fixture = TestBed.createComponent(SuperAdminAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
