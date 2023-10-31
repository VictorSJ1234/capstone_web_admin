import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DengueFiveSComponent } from './dengue-five-s.component';

describe('DengueFiveSComponent', () => {
  let component: DengueFiveSComponent;
  let fixture: ComponentFixture<DengueFiveSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DengueFiveSComponent]
    });
    fixture = TestBed.createComponent(DengueFiveSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
