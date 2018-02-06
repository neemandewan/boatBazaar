import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatMineComponent } from './boat-mine.component';

describe('BoatMineComponent', () => {
  let component: BoatMineComponent;
  let fixture: ComponentFixture<BoatMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
