import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuandoComponent } from './cuando.component';

describe('CuandoComponent', () => {
  let component: CuandoComponent;
  let fixture: ComponentFixture<CuandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
