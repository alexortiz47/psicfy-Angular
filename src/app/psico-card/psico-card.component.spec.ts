import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoCardComponent } from './psico-card.component';

describe('PsicoCardComponent', () => {
  let component: PsicoCardComponent;
  let fixture: ComponentFixture<PsicoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
