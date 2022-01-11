import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningPageComponent } from './screening-page.component';

describe('ScreeningPageComponent', () => {
  let component: ScreeningPageComponent;
  let fixture: ComponentFixture<ScreeningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
