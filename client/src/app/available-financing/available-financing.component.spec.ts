import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFinancingComponent } from './available-financing.component';

describe('AvailableFinancingComponent', () => {
  let component: AvailableFinancingComponent;
  let fixture: ComponentFixture<AvailableFinancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableFinancingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
