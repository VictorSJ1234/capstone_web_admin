import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayNotificationPageComponent } from './barangay-notification-page.component';

describe('BarangayNotificationPageComponent', () => {
  let component: BarangayNotificationPageComponent;
  let fixture: ComponentFixture<BarangayNotificationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangayNotificationPageComponent]
    });
    fixture = TestBed.createComponent(BarangayNotificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
