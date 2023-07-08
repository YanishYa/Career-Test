import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCardComponent } from './prof-card.component';

describe('ProfCardComponent', () => {
  let component: ProfCardComponent;
  let fixture: ComponentFixture<ProfCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
