import { TestBed } from '@angular/core/testing';

import { PsicologosService } from './psicologos.service';

describe('PsicologosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PsicologosService = TestBed.get(PsicologosService);
    expect(service).toBeTruthy();
  });
});
