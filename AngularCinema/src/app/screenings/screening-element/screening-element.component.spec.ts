import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningElementComponent } from './screening-element.component';

describe('ScreeningElementComponent', () => {
  let component: ScreeningElementComponent;
  let fixture: ComponentFixture<ScreeningElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
