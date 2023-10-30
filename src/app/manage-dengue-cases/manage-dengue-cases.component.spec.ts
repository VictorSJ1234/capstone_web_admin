import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDengueCasesComponent } from './manage-dengue-cases.component';

describe('ManageDengueCasesComponent', () => {
  let component: ManageDengueCasesComponent;
  let fixture: ComponentFixture<ManageDengueCasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDengueCasesComponent]
    });
    fixture = TestBed.createComponent(ManageDengueCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
