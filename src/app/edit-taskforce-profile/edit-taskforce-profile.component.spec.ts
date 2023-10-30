import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskforceProfileComponent } from './edit-taskforce-profile.component';

describe('EditTaskforceProfileComponent', () => {
  let component: EditTaskforceProfileComponent;
  let fixture: ComponentFixture<EditTaskforceProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskforceProfileComponent]
    });
    fixture = TestBed.createComponent(EditTaskforceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
