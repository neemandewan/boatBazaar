import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatInComponent } from './boat-in.component';

describe('BoatInComponent', () => {
  let component: BoatInComponent;
  let fixture: ComponentFixture<BoatInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
