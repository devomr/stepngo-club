import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerLevelStatsComponent } from './sneaker-level-stats.component';

describe('SneakerLevelStatsComponent', () => {
  let component: SneakerLevelStatsComponent;
  let fixture: ComponentFixture<SneakerLevelStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SneakerLevelStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakerLevelStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
