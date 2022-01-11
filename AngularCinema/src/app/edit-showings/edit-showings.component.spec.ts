import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShowingsComponent } from './edit-showings.component';

describe('EditShowingsComponent', () => {
  let component: EditShowingsComponent;
  let fixture: ComponentFixture<EditShowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShowingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
