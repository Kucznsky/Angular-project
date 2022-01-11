import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowingsComponent } from './add-showings.component';

describe('AddShowingsComponent', () => {
  let component: AddShowingsComponent;
  let fixture: ComponentFixture<AddShowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShowingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
