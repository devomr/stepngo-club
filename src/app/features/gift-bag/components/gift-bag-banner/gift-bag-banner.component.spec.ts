import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftBagBannerComponent } from './gift-bag-banner.component';

describe('GiftBagBannerComponent', () => {
  let component: GiftBagBannerComponent;
  let fixture: ComponentFixture<GiftBagBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftBagBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftBagBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
