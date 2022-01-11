import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoviesComponent } from './add-movies.component';

describe('AddMoviesComponent', () => {
  let component: AddMoviesComponent;
  let fixture: ComponentFixture<AddMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
