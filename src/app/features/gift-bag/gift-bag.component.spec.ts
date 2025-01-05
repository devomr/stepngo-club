import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftBagComponent } from './gift-bag.component';

describe('GiftBagComponent', () => {
  let component: GiftBagComponent;
  let fixture: ComponentFixture<GiftBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftBagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
