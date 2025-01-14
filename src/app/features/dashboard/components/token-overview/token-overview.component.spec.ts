import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenOverviewComponent } from './token-overview.component';

describe('TokenOverviewComponent', () => {
  let component: TokenOverviewComponent;
  let fixture: ComponentFixture<TokenOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
