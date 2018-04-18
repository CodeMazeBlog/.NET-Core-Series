import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDeleteComponent } from './owner-delete.component';

describe('OwnerDeleteComponent', () => {
  let component: OwnerDeleteComponent;
  let fixture: ComponentFixture<OwnerDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
