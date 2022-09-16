import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateColumnPopupComponent } from './update-column-popup.component';

describe('UpdateColumnPopupComponent', () => {
  let component: UpdateColumnPopupComponent;
  let fixture: ComponentFixture<UpdateColumnPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateColumnPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateColumnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
