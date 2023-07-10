import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminInformationComponent } from './edit-admin-information.component';

describe('EditAdminInformationComponent', () => {
  let component: EditAdminInformationComponent;
  let fixture: ComponentFixture<EditAdminInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdminInformationComponent]
    });
    fixture = TestBed.createComponent(EditAdminInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
