import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRangeComponent } from './star-range.component';

describe('StarRangeComponent', () => {
  let component: StarRangeComponent;
  let fixture: ComponentFixture<StarRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
