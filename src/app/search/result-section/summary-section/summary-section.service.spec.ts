import { TestBed } from '@angular/core/testing';

import { SummaryService } from './summary-section.service';

describe('SummaryService', () => {
  let service: SummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a proper category for a provider', () => {
    const expectedCategories = ['expr', 'template', 'template', 'ensembl', 'abinitio', 'expr'];
    const inputProviders = ['PDBe', 'Genome3D', 'SWISS-MODEL', 'PED', 'AlphaFold DB', 'SASBDB'];

    for (let i = 0; i < expectedCategories.length; i++) {
      expect(service.getProviderCategory(inputProviders[i])).toBe(expectedCategories[i]);
    }
  });

  it('should return a deep clone of categories', () => {
    const categories = {
      expr: {
        id: 'cat1',
        displayName: 'cat1 name',
        icon: 'cat1 icon'
      },
      abinitio: {
        id: 'cat2',
        displayName: 'cat2 name',
        icon: 'cat2 icon'
      },
      template: {
        id: 'cat3',
        displayName: 'cat3 name',
        icon: 'cat3 icon'
      },
      ensembl: {
        id: 'cat4',
        displayName: 'cat4 name',
        icon: 'cat4 icon'
      },
      deeplearning: {
        id: 'cat5',
        displayName: 'cat5 name',
        icon: 'cat5 icon'
      }
    }
    service['categories'] = categories;
    expect(JSON.stringify(service.getCategories())).toBe(JSON.stringify(categories));
  });
});
