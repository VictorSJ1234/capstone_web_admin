import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegistrationComponent } from './account-registration.component';

describe('AccountRegistrationComponent', () => {
  let component: AccountRegistrationComponent;
  let fixture: ComponentFixture<AccountRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRegistrationComponent]
    });
    fixture = TestBed.createComponent(AccountRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
