import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityReportManagementComponent } from './community-report-management.component';

describe('CommunityReportManagementComponent', () => {
  let component: CommunityReportManagementComponent;
  let fixture: ComponentFixture<CommunityReportManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityReportManagementComponent]
    });
    fixture = TestBed.createComponent(CommunityReportManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
