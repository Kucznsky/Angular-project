import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScreeningComponent } from './edit-screening.component';

describe('EditScreeningComponent', () => {
  let component: EditScreeningComponent;
  let fixture: ComponentFixture<EditScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
