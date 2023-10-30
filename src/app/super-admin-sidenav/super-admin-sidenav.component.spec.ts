import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSidenavComponent } from './super-admin-sidenav.component';

describe('SuperAdminSidenavComponent', () => {
  let component: SuperAdminSidenavComponent;
  let fixture: ComponentFixture<SuperAdminSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminSidenavComponent]
    });
    fixture = TestBed.createComponent(SuperAdminSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
