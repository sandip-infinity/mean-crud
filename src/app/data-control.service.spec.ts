import { TestBed, inject } from '@angular/core/testing';

import { DataControlService } from './data-control.service';

describe('DataControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataControlService]
    });
  });

  it('should be created', inject([DataControlService], (service: DataControlService) => {
    expect(service).toBeTruthy();
  }));
});
