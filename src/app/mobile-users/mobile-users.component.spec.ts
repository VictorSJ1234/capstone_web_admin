import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUsersComponent } from './mobile-users.component';

describe('MobileUsersComponent', () => {
  let component: MobileUsersComponent;
  let fixture: ComponentFixture<MobileUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileUsersComponent]
    });
    fixture = TestBed.createComponent(MobileUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
