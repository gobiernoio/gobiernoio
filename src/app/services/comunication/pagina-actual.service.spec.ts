import { TestBed } from '@angular/core/testing';

import { PaginaActualService } from './pagina-actual.service';

describe('PaginaActualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginaActualService = TestBed.get(PaginaActualService);
    expect(service).toBeTruthy();
  });
});
