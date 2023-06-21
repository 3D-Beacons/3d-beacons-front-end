import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare var gtag;

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent {

  searchTerm = new FormControl('');
  searchBy = new FormControl('Sequence search');

  constructor(private router: Router) {
    const navEndEvent$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );
    navEndEvent$.subscribe((e: NavigationEnd) => {
      gtag(
        'config',
        environment.gaTag,
        {page_path: e.urlAfterRedirects});
    });
    const headerScript = document.createElement('script');
    headerScript.async = true;
    headerScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gaTag;
    document.head.appendChild(headerScript);
  }

  onSearch() {
    console.log("this.searchTerm.value :: ",this.searchTerm.value);
    console.log("this.searchBy.value :: ",this.searchBy.value);

    if (this.searchTerm.value.trim() === '') {
      return;
    }
    var searchTerm = this.searchTerm.value.toUpperCase();
    this.router.navigate(['/search/', searchTerm]);

    // // accession:
    // this.router.navigate(['/search/', searchTerm]);
    // this.doAccessionSearch(this.accession);

    // //seequence
    // this.router.navigate(['/sequence/', searchTerm]);
    // this.doSequenceSearch(this.accession);
    
  }

}
