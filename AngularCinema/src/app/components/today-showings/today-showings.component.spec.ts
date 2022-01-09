import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayShowingsComponent } from './today-showings.component';

describe('TodayShowingsComponent', () => {
  let component: TodayShowingsComponent;
  let fixture: ComponentFixture<TodayShowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayShowingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayShowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
