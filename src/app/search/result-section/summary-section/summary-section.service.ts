import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private categories = {
    expr: {
      id: 'expr',
      displayName: 'Experimentally Determined Structures',
      icon: 'icon icon-common icon-analyse-percent_100'
    },
    ensembl: {
      id: 'ensembl',
      displayName: 'Conformational Ensembles',
      icon: 'icon icon-common icon-analyse-percent_40'
    },
    template: {
      id: 'template',
      displayName: 'Template-based models',
      icon: 'icon icon-common icon-systems'
    },
    abinitio: {
      id: 'abinitio',
      displayName: 'Ab-initio Models',
      icon: 'icon icon-common icon-systems'
    },
    deeplearning: {
      id: 'deeplearning',
      displayName: 'Deep learning',
      icon: 'icon icon-common icon-systems'
    }
  };

  constructor() { }

  getProviderCategory(providerId: string): string {
    let providerCategories = {
      'PDBe': 'expr',
      'SWISS-MODEL': 'template',
      'PED': 'ensembl',
      'Genome3D': 'template',
      'AlphaFold DB': 'deeplearning',
      'SASBDB': 'expr',
      'AlphaFill': 'deeplearning',
    }
    return providerCategories[providerId];
  }

  getCategories() {
    // taking a deep clone
    return JSON.parse(JSON.stringify(this.categories));
  }
}
