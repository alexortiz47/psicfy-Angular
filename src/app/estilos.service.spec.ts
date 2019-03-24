import { TestBed } from '@angular/core/testing';

import { EstilosService } from './estilos.service';

describe('EstilosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstilosService = TestBed.get(EstilosService);
    expect(service).toBeTruthy();
  });
});
