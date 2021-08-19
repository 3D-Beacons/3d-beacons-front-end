import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  openSearch(searchTerm: string) {
    if (searchTerm.trim() === '') {
      return;
    }
    window.location.href = './search/' + searchTerm;
  }
}
