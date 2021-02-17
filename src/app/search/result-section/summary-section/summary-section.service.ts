import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private categories = {
    expr: {
      id: 'expr',
      displayName: 'Experimentally Determined Structures',
      icon: 'bi-basket'
    },
    template: {
      id: 'template',
      displayName: 'Template-based models',
      icon: 'bi-basket2'
    },
    abinitio: {
      id: 'abinitio',
      displayName: 'Ab-initio Models',
      icon: 'bi-basket'
    },
    ensembl: {
      id: 'ensembl',
      displayName: 'Conformational Ensembles',
      icon: 'bi-basket2'
    }
  };

  constructor() { }

  getProviderCategory(providerId: string): string {
    let providerCategories = {
      PDBE: 'expr',
      SWISSMODEL: 'template',
      PED: 'ensembl',
      GENOME3D: 'template'
    }
    return providerCategories[providerId];
  }

  getCategories() {
    // taking a deep clone
    return JSON.parse(JSON.stringify(this.categories));
  }
}
