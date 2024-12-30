import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorWidgetComponent } from './creator-widget.component';

describe('CreatorWidgetComponent', () => {
  let component: CreatorWidgetComponent;
  let fixture: ComponentFixture<CreatorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
