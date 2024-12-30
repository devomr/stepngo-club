import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseHistoryComponent } from './release-history.component';

describe('ReleaseHistoryComponent', () => {
  let component: ReleaseHistoryComponent;
  let fixture: ComponentFixture<ReleaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
