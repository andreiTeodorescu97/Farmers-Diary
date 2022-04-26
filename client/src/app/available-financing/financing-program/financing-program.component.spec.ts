import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingProgramComponent } from './financing-program.component';

describe('FinancingProgramComponent', () => {
  let component: FinancingProgramComponent;
  let fixture: ComponentFixture<FinancingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
