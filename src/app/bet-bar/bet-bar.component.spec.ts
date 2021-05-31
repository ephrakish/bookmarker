import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetBarComponent } from './bet-bar.component';

describe('BetBarComponent', () => {
  let component: BetBarComponent;
  let fixture: ComponentFixture<BetBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
