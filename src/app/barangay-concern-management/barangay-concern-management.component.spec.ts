import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayConcernManagementComponent } from './barangay-concern-management.component';

describe('BarangayConcernManagementComponent', () => {
  let component: BarangayConcernManagementComponent;
  let fixture: ComponentFixture<BarangayConcernManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangayConcernManagementComponent]
    });
    fixture = TestBed.createComponent(BarangayConcernManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
