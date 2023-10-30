import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAccountInformationComponent } from './super-admin-account-information.component';

describe('SuperAdminAccountInformationComponent', () => {
  let component: SuperAdminAccountInformationComponent;
  let fixture: ComponentFixture<SuperAdminAccountInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminAccountInformationComponent]
    });
    fixture = TestBed.createComponent(SuperAdminAccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
