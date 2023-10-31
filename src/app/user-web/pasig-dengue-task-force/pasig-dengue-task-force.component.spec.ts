import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasigDengueTaskForceComponent } from './pasig-dengue-task-force.component';

describe('PasigDengueTaskForceComponent', () => {
  let component: PasigDengueTaskForceComponent;
  let fixture: ComponentFixture<PasigDengueTaskForceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasigDengueTaskForceComponent]
    });
    fixture = TestBed.createComponent(PasigDengueTaskForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
