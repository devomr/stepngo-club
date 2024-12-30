import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPriceWidgetComponent } from './token-price-widget.component';

describe('TokenPriceWidgetComponent', () => {
  let component: TokenPriceWidgetComponent;
  let fixture: ComponentFixture<TokenPriceWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenPriceWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenPriceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
