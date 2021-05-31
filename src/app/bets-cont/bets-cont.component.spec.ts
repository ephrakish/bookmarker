import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsContComponent } from './bets-cont.component';

describe('BetsContComponent', () => {
  let component: BetsContComponent;
  let fixture: ComponentFixture<BetsContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
