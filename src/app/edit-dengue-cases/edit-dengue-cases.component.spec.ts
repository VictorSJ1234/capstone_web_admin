import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDengueCasesComponent } from './edit-dengue-cases.component';

describe('EditDengueCasesComponent', () => {
  let component: EditDengueCasesComponent;
  let fixture: ComponentFixture<EditDengueCasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDengueCasesComponent]
    });
    fixture = TestBed.createComponent(EditDengueCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
