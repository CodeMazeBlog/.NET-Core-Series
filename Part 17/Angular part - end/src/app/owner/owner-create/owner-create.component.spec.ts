import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCreateComponent } from './owner-create.component';

describe('OwnerCreateComponent', () => {
  let component: OwnerCreateComponent;
  let fixture: ComponentFixture<OwnerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
