import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayResponseViewComponent } from './barangay-response-view.component';

describe('BarangayResponseViewComponent', () => {
  let component: BarangayResponseViewComponent;
  let fixture: ComponentFixture<BarangayResponseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangayResponseViewComponent]
    });
    fixture = TestBed.createComponent(BarangayResponseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
