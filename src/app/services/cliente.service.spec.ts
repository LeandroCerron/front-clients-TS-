import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';

describe('ClinteService', () => {
  let service: ClinteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
