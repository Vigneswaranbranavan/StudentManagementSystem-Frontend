import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassComponent } from './view-class.component';

describe('ViewClassComponent', () => {
  let component: ViewClassComponent;
  let fixture: ComponentFixture<ViewClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
