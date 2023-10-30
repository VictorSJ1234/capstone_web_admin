import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangaySidenavComponent } from './barangay-sidenav.component';

describe('BarangaySidenavComponent', () => {
  let component: BarangaySidenavComponent;
  let fixture: ComponentFixture<BarangaySidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangaySidenavComponent]
    });
    fixture = TestBed.createComponent(BarangaySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
