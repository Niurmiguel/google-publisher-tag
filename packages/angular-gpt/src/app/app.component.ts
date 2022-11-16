import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-gpt';

  onLoad(event: any) {
    console.log({ event });
  }

  refreshed(event: any) {
    console.log({ event });
  }
}
