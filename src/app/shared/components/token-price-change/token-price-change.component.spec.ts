import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPriceChangeComponent } from './token-price-change.component';

describe('TokenPriceChangeComponent', () => {
  let component: TokenPriceChangeComponent;
  let fixture: ComponentFixture<TokenPriceChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenPriceChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenPriceChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
