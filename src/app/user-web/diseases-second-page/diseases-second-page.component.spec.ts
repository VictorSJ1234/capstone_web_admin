import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasesSecondPageComponent } from './diseases-second-page.component';

describe('DiseasesSecondPageComponent', () => {
  let component: DiseasesSecondPageComponent;
  let fixture: ComponentFixture<DiseasesSecondPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiseasesSecondPageComponent]
    });
    fixture = TestBed.createComponent(DiseasesSecondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
