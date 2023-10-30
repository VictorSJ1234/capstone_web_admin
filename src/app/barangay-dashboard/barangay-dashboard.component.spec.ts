import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayDashboardComponent } from './barangay-dashboard.component';

describe('BarangayDashboardComponent', () => {
  let component: BarangayDashboardComponent;
  let fixture: ComponentFixture<BarangayDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangayDashboardComponent]
    });
    fixture = TestBed.createComponent(BarangayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
