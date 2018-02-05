import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatFeaturedComponent } from './boat-featured.component';

describe('BoatFeaturedComponent', () => {
  let component: BoatFeaturedComponent;
  let fixture: ComponentFixture<BoatFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
