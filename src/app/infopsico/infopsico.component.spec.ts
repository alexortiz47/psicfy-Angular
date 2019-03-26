import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopsicoComponent } from './infopsico.component';

describe('InfopsicoComponent', () => {
  let component: InfopsicoComponent;
  let fixture: ComponentFixture<InfopsicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfopsicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopsicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
