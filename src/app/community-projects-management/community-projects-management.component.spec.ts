import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityProjectsManagementComponent } from './community-projects-management.component';

describe('CommunityProjectsManagementComponent', () => {
  let component: CommunityProjectsManagementComponent;
  let fixture: ComponentFixture<CommunityProjectsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityProjectsManagementComponent]
    });
    fixture = TestBed.createComponent(CommunityProjectsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
