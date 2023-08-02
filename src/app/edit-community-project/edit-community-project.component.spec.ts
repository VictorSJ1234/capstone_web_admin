import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommunityProjectComponent } from './edit-community-project.component';

describe('EditCommunityProjectComponent', () => {
  let component: EditCommunityProjectComponent;
  let fixture: ComponentFixture<EditCommunityProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCommunityProjectComponent]
    });
    fixture = TestBed.createComponent(EditCommunityProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
