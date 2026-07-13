import { EnsemblComponent } from '../ensembl.component';


class MockMatPaginator {
  // Add methods as needed for test
}
class MockSearchService {
  // Add methods as needed for test
}
class MockEnsemblDataFormatterService {
  // Add methods as needed for test
}
class MockDestroyRef {
  // Add methods as needed for test
}

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');
  return {
    ...actual,
    inject: jest.mocked(jest.fn()),
    signal: jest.mocked(jest.fn()),
    computed: jest.mocked(jest.fn()),
  };
});
jest.mock('@angular/core/rxjs-interop', () => {
  const actual = jest.requireActual('@angular/core/rxjs-interop');
  return {
    ...actual,
    takeUntilDestroyed: jest.mocked(jest.fn()),
  };
});

describe('EnsemblComponent.updatePerPageVal() updatePerPageVal method', () => {
  let component: EnsemblComponent;

  beforeEach(() => {
    component = new EnsemblComponent();
    (component as any).destroyRef = new MockDestroyRef() as any;
    (component as any).route = {} as any;
    (component as any).searchService = new MockSearchService() as any;
    (component as any).ensemblDataFormatterService = new MockEnsemblDataFormatterService() as any;
    (component as any).paginator = new MockMatPaginator() as any;

    component.paginationData = {
      perPage: 10,
      currentPage: 2,
      totalPages: 5,
      pages: [1, 2, 3, 4, 5],
      totalRecords: 50,
    };
  });

  describe('Happy Paths', () => {
    it('should update perPage and reset currentPage to 1 when called with a valid ppgSelected', () => {
      const ppgSelected = { ppgValue: 20 } as any;
      component.paginationData.currentPage = 3;
      component.paginationData.perPage = 10;

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.perPage).toBe(20);
    });

    it('should update pages using visiblePageNumbers after perPage change', () => {
      const ppgSelected = { ppgValue: 15 } as any;
      const mockPages = [1, -1, 3, 4, 5];
      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue(mockPages as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.pages).toEqual(mockPages);
    });

    it('should create a new paginationData object after update', () => {
      const ppgSelected = { ppgValue: 25 } as any;
      const oldPaginationData = component.paginationData;

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData).not.toBe(oldPaginationData);
      expect(component.paginationData.perPage).toBe(25);
      expect(component.paginationData.currentPage).toBe(1);
    });

    it('should handle perPage update when totalPages is 1', () => {
      component.paginationData.totalPages = 1;
      component.paginationData.pages = [1];
      const ppgSelected = { ppgValue: 5 } as any;

      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue([1] as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.pages).toEqual([1]);
      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.perPage).toBe(5);
    });
  });

  describe('Edge Cases', () => {
    it('should handle ppgSelected with ppgValue as 0 (minimum perPage)', () => {
      const ppgSelected = { ppgValue: 0 } as any;
      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue([1] as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.perPage).toBe(0);
      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.pages).toEqual([1]);
    });

    it('should handle ppgSelected with a very large ppgValue', () => {
      const ppgSelected = { ppgValue: 10000 } as any;
      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue([1] as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.perPage).toBe(10000);
      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.pages).toEqual([1]);
    });

    it('should handle ppgSelected with a negative ppgValue', () => {
      const ppgSelected = { ppgValue: -5 } as any;
      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue([1] as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.perPage).toBe(-5);
      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.pages).toEqual([1]);
    });

    it('should handle ppgSelected with ppgValue as a string (type coercion)', () => {
      const ppgSelected = { ppgValue: '50' } as any;
      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue([1] as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.perPage).toBe('50');
      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.pages).toEqual([1]);
    });

    it('should handle ppgSelected with missing ppgValue property', () => {
      const ppgSelected = {} as any;
      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue([1] as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.perPage).toBeUndefined();
      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.pages).toEqual([1]);
    });

    it('should handle when visiblePageNumbers returns an empty array', () => {
      const ppgSelected = { ppgValue: 10 } as any;
      jest.spyOn(component, 'visiblePageNumbers' as any).mockReturnValue([] as any);

      component.updatePerPageVal(ppgSelected as any);

      expect(component.paginationData.pages).toEqual([]);
      expect(component.paginationData.currentPage).toBe(1);
      expect(component.paginationData.perPage).toBe(10);
    });
  });
});