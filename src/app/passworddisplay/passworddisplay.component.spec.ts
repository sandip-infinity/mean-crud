import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassworddisplayComponent } from './passworddisplay.component';

describe('PassworddisplayComponent', () => {
  let component: PassworddisplayComponent;
  let fixture: ComponentFixture<PassworddisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassworddisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassworddisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
