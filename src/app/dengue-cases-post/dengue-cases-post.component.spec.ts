import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DengueCasesPostComponent } from './dengue-cases-post.component';

describe('DengueCasesPostComponent', () => {
  let component: DengueCasesPostComponent;
  let fixture: ComponentFixture<DengueCasesPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DengueCasesPostComponent]
    });
    fixture = TestBed.createComponent(DengueCasesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
