import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForceAccountComponent } from './task-force-account.component';

describe('TaskForceAccountComponent', () => {
  let component: TaskForceAccountComponent;
  let fixture: ComponentFixture<TaskForceAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskForceAccountComponent]
    });
    fixture = TestBed.createComponent(TaskForceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
