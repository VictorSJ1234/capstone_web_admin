import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquitopediaComponent } from './mosquitopedia.component';

describe('MosquitopediaComponent', () => {
  let component: MosquitopediaComponent;
  let fixture: ComponentFixture<MosquitopediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MosquitopediaComponent]
    });
    fixture = TestBed.createComponent(MosquitopediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
