import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportForBarangayComponent } from './create-report-for-barangay.component';

describe('CreateReportForBarangayComponent', () => {
  let component: CreateReportForBarangayComponent;
  let fixture: ComponentFixture<CreateReportForBarangayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReportForBarangayComponent]
    });
    fixture = TestBed.createComponent(CreateReportForBarangayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
