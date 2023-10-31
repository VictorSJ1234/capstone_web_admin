import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebNavbarComponent } from './web-navbar.component';

describe('WebNavbarComponent', () => {
  let component: WebNavbarComponent;
  let fixture: ComponentFixture<WebNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebNavbarComponent]
    });
    fixture = TestBed.createComponent(WebNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
