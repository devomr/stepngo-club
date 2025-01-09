import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerLevelupComponent } from './sneaker-levelup.component';

describe('SneakerLevelupComponent', () => {
  let component: SneakerLevelupComponent;
  let fixture: ComponentFixture<SneakerLevelupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SneakerLevelupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakerLevelupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
