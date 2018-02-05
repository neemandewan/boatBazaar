import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatMineInComponent } from './boat-mine-in.component';

describe('BoatMineInComponent', () => {
  let component: BoatMineInComponent;
  let fixture: ComponentFixture<BoatMineInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatMineInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatMineInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
