import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePopularityComponent } from './movie-popularity.component';

describe('MoviePopularityComponent', () => {
  let component: MoviePopularityComponent;
  let fixture: ComponentFixture<MoviePopularityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePopularityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePopularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
