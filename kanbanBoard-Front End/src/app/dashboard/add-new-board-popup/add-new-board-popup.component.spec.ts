import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBoardPopupComponent } from './add-new-board-popup.component';

describe('AddNewBoardPopupComponent', () => {
  let component: AddNewBoardPopupComponent;
  let fixture: ComponentFixture<AddNewBoardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBoardPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
