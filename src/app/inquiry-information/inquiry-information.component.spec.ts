import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryInformationComponent } from './inquiry-information.component';

describe('InquiryInformationComponent', () => {
  let component: InquiryInformationComponent;
  let fixture: ComponentFixture<InquiryInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InquiryInformationComponent]
    });
    fixture = TestBed.createComponent(InquiryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
