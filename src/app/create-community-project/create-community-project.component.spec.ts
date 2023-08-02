import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommunityProjectComponent } from './create-community-project.component';

describe('CreateCommunityProjectComponent', () => {
  let component: CreateCommunityProjectComponent;
  let fixture: ComponentFixture<CreateCommunityProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCommunityProjectComponent]
    });
    fixture = TestBed.createComponent(CreateCommunityProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
