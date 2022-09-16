import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulePopUpComponent } from './rule-pop-up.component';

describe('RulePopUpComponent', () => {
  let component: RulePopUpComponent;
  let fixture: ComponentFixture<RulePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
