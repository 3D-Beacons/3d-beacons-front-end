import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchTerm = new FormControl('');

  constructor(private router: Router){}

  onSearch() {
    if (this.searchTerm.value.trim() === '') {
      return;
    }
    this.router.navigate(['/search/', this.searchTerm.value]);
  }
}
