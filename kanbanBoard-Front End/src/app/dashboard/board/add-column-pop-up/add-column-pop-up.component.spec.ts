import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColumnPopUpComponent } from './add-column-pop-up.component';

describe('AddColumnPopUpComponent', () => {
  let component: AddColumnPopUpComponent;
  let fixture: ComponentFixture<AddColumnPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColumnPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColumnPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
